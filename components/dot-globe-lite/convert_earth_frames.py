"""Convert transparent Earth PNG frames to production WebP frames.

Prerequisite:
    py -m pip install Pillow

Example:
    py components/dot-globe-lite/tools/convert_earth_frames.py \
      --input public/images/dot-globe-lite/earth-png \
      --output public/images/dot-globe-lite/earth \
      --quality 82

All frames use one shared alpha-based crop so the Earth stays the same size and
position while rotating. A small transparent padding is retained around it.
"""

from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", required=True)
    parser.add_argument("--output", required=True)
    parser.add_argument("--quality", type=int, default=82)
    parser.add_argument(
        "--max-size",
        type=int,
        default=1024,
        help="Maximum final square size. 0 keeps cropped source size.",
    )
    parser.add_argument(
        "--padding",
        type=float,
        default=0.025,
        help="Transparent padding around shared alpha bounds (fraction).",
    )
    return parser.parse_args()


def union_alpha_bounds(frames: list[Path]) -> tuple[int, int, int, int]:
    left = 10**9
    top = 10**9
    right = -1
    bottom = -1

    for source_path in frames:
        with Image.open(source_path) as image:
            rgba = image.convert("RGBA")
            alpha = rgba.getchannel("A")
            bbox = alpha.getbbox()

            if bbox is None:
                continue

            left = min(left, bbox[0])
            top = min(top, bbox[1])
            right = max(right, bbox[2])
            bottom = max(bottom, bbox[3])

    if right <= left or bottom <= top:
        raise RuntimeError("No non-transparent pixels found in rendered frames.")

    return left, top, right, bottom


def square_crop_box(
    bounds: tuple[int, int, int, int],
    image_size: tuple[int, int],
    padding_fraction: float,
) -> tuple[int, int, int, int]:
    left, top, right, bottom = bounds
    width = right - left
    height = bottom - top
    side = max(width, height)
    side = int(round(side * (1 + max(padding_fraction, 0) * 2)))

    center_x = (left + right) * 0.5
    center_y = (top + bottom) * 0.5

    crop_left = int(round(center_x - side * 0.5))
    crop_top = int(round(center_y - side * 0.5))
    crop_right = crop_left + side
    crop_bottom = crop_top + side

    image_width, image_height = image_size

    # Keep one identical crop box inside source bounds. If source render is too
    # tight, reduce the square rather than shifting individual frames.
    if side > image_width or side > image_height:
        side = min(image_width, image_height)
        crop_left = int(round(center_x - side * 0.5))
        crop_top = int(round(center_y - side * 0.5))
        crop_right = crop_left + side
        crop_bottom = crop_top + side

    if crop_left < 0:
        crop_right -= crop_left
        crop_left = 0
    if crop_top < 0:
        crop_bottom -= crop_top
        crop_top = 0
    if crop_right > image_width:
        shift = crop_right - image_width
        crop_left -= shift
        crop_right = image_width
    if crop_bottom > image_height:
        shift = crop_bottom - image_height
        crop_top -= shift
        crop_bottom = image_height

    return crop_left, crop_top, crop_right, crop_bottom


def main() -> None:
    args = parse_args()
    input_dir = Path(args.input).resolve()
    output_dir = Path(args.output).resolve()

    if not input_dir.is_dir():
        raise FileNotFoundError(f"Input directory not found: {input_dir}")

    frames = sorted(input_dir.glob("earth-*.png"))
    if not frames:
        raise FileNotFoundError(
            f"No earth-*.png frames found in {input_dir}",
        )

    with Image.open(frames[0]) as sample:
        source_size = sample.size

    shared_bounds = union_alpha_bounds(frames)
    crop_box = square_crop_box(
        shared_bounds,
        source_size,
        args.padding,
    )

    output_dir.mkdir(parents=True, exist_ok=True)

    for index, source_path in enumerate(frames):
        destination = output_dir / f"earth-{index:03d}.webp"

        with Image.open(source_path) as image:
            image = image.convert("RGBA").crop(crop_box)

            if args.max_size > 0 and max(image.size) > args.max_size:
                image.thumbnail(
                    (args.max_size, args.max_size),
                    Image.Resampling.LANCZOS,
                )

            image.save(
                destination,
                format="WEBP",
                quality=max(1, min(args.quality, 100)),
                method=6,
            )

        print(f"Converted {index + 1}/{len(frames)}: {destination}")


if __name__ == "__main__":
    main()
