"""Render a transparent 360-degree Earth yaw sequence from the production GLB.

Run with Blender in background mode, for example (when `blender` is on PATH):

    blender --background --python components/dot-globe-lite/tools/render_earth_frames.py -- \
      --input public/models/Earth_1_12756.glb \
      --output public/images/dot-globe-lite/earth-png \
      --frames 72 \
      --size 1024

The script intentionally renders PNG first. Convert those PNGs to WebP with the
companion `convert_earth_frames.py` script so WebP encoding stays independent of
Blender-version-specific output support.
"""

from __future__ import annotations

import argparse
import math
import os
import sys

import bpy
from mathutils import Vector


def parse_args() -> argparse.Namespace:
    argv = sys.argv
    argv = argv[argv.index("--") + 1 :] if "--" in argv else []

    parser = argparse.ArgumentParser()
    parser.add_argument("--input", required=True, help="Input GLB path")
    parser.add_argument("--output", required=True, help="PNG output directory")
    parser.add_argument("--frames", type=int, default=72)
    parser.add_argument("--size", type=int, default=1024)
    parser.add_argument("--camera-distance", type=float, default=4.6)
    parser.add_argument("--camera-lens", type=float, default=52.0)
    return parser.parse_args(argv)


def clear_scene() -> None:
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete(use_global=False)

    for collection in (
        bpy.data.meshes,
        bpy.data.materials,
        bpy.data.cameras,
        bpy.data.lights,
    ):
        for datablock in list(collection):
            if datablock.users == 0:
                collection.remove(datablock)


def look_at(obj: bpy.types.Object, target: Vector) -> None:
    direction = target - obj.location
    obj.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()


def imported_mesh_bounds(objects: list[bpy.types.Object]) -> tuple[Vector, Vector]:
    minimum = Vector((float("inf"), float("inf"), float("inf")))
    maximum = Vector((float("-inf"), float("-inf"), float("-inf")))

    found_mesh = False

    for obj in objects:
        if obj.type != "MESH":
            continue

        found_mesh = True
        for corner in obj.bound_box:
            world_corner = obj.matrix_world @ Vector(corner)
            minimum.x = min(minimum.x, world_corner.x)
            minimum.y = min(minimum.y, world_corner.y)
            minimum.z = min(minimum.z, world_corner.z)
            maximum.x = max(maximum.x, world_corner.x)
            maximum.y = max(maximum.y, world_corner.y)
            maximum.z = max(maximum.z, world_corner.z)

    if not found_mesh:
        raise RuntimeError("Imported GLB contains no mesh objects.")

    return minimum, maximum


def make_turntable(imported_objects: list[bpy.types.Object]) -> bpy.types.Object:
    minimum, maximum = imported_mesh_bounds(imported_objects)
    center = (minimum + maximum) * 0.5
    size = maximum - minimum
    max_dimension = max(size.x, size.y, size.z)

    if max_dimension <= 0.00001:
        raise RuntimeError("Imported GLB bounds are degenerate.")

    top_level_objects = [
        obj
        for obj in imported_objects
        if obj.parent is None
    ]

    root = bpy.data.objects.new("EarthTurntable", None)
    bpy.context.scene.collection.objects.link(root)

    for obj in top_level_objects:
        world_matrix = obj.matrix_world.copy()
        obj.parent = root
        obj.matrix_world = world_matrix

    scale = 2.0 / max_dimension
    root.scale = (scale, scale, scale)
    root.location = (-center.x * scale, -center.y * scale, -center.z * scale)

    return root


def add_area_light(
    name: str,
    location: tuple[float, float, float],
    energy: float,
    size: float,
) -> bpy.types.Object:
    light_data = bpy.data.lights.new(name=name, type="AREA")
    light_data.energy = energy
    light_data.shape = "DISK"
    light_data.size = size

    light = bpy.data.objects.new(name, light_data)
    bpy.context.scene.collection.objects.link(light)
    light.location = location
    look_at(light, Vector((0, 0, 0)))
    return light


def configure_scene(args: argparse.Namespace) -> bpy.types.Object:
    scene = bpy.context.scene

    try:
        scene.render.engine = "BLENDER_EEVEE_NEXT"
    except TypeError:
        scene.render.engine = "BLENDER_EEVEE"

    scene.render.resolution_x = args.size
    scene.render.resolution_y = args.size
    scene.render.resolution_percentage = 100
    scene.render.film_transparent = True
    scene.render.image_settings.file_format = "PNG"
    scene.render.image_settings.color_mode = "RGBA"
    scene.render.image_settings.color_depth = "8"

    world = scene.world
    if world is None:
        world = bpy.data.worlds.new("World")
        scene.world = world
    world.color = (0.035, 0.035, 0.035)

    camera_data = bpy.data.cameras.new("EarthCamera")
    camera_data.lens = args.camera_lens
    camera = bpy.data.objects.new("EarthCamera", camera_data)
    bpy.context.scene.collection.objects.link(camera)

    # Blender is Z-up. Looking from negative Y maps naturally to the web
    # renderer's Y-up / +Z-camera convention used for label projection.
    camera.location = (0.0, -args.camera_distance, 0.0)
    look_at(camera, Vector((0, 0, 0)))
    scene.camera = camera

    add_area_light("Key", (3.4, -3.2, 4.6), 850.0, 4.0)
    add_area_light("Fill", (-4.0, -1.6, 1.2), 320.0, 5.0)
    add_area_light("Rim", (1.5, 2.8, 3.0), 450.0, 3.0)

    return camera


def main() -> None:
    args = parse_args()

    input_path = os.path.abspath(args.input)
    output_dir = os.path.abspath(args.output)

    if not os.path.isfile(input_path):
        raise FileNotFoundError(f"GLB not found: {input_path}")

    if args.frames < 2:
        raise ValueError("--frames must be at least 2")

    os.makedirs(output_dir, exist_ok=True)

    clear_scene()
    bpy.ops.import_scene.gltf(filepath=input_path)

    imported_objects = [
        obj
        for obj in bpy.context.scene.objects
        if obj.type not in {"CAMERA", "LIGHT"}
    ]

    root = make_turntable(imported_objects)
    configure_scene(args)

    scene = bpy.context.scene

    for index in range(args.frames):
        yaw = (index / args.frames) * math.tau
        root.rotation_euler = (0.0, 0.0, yaw)

        scene.render.filepath = os.path.join(
            output_dir,
            f"earth-{index:03d}.png",
        )
        bpy.ops.render.render(write_still=True)
        print(f"Rendered {index + 1}/{args.frames}: {scene.render.filepath}")


if __name__ == "__main__":
    main()
