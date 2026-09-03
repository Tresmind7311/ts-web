"use client";

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
    useEffect,
    useMemo,
    useRef,
} from "react";
import * as THREE from "three";

import EarthLabels from "./EarthLabels";

import type { EarthModelProps } from "./types";

const EARTH_MODEL_URL = "/models/Earth_1_12756.glb";

interface PreparedEarth {
    object: THREE.Group;
    materials: THREE.Material[];
}

function prepareEarth(source: THREE.Group): PreparedEarth {
    const clone = source.clone(true);
    const materials: THREE.Material[] = [];

    clone.traverse((child) => {
        if (!(child instanceof THREE.Mesh)) {
            return;
        }

        const sourceMaterial = child.material;

        if (Array.isArray(sourceMaterial)) {
            const clonedMaterials = sourceMaterial.map(
                (material) => material.clone(),
            );

            clonedMaterials.forEach((material) => {
                material.transparent = true;
                material.opacity = 0;
                materials.push(material);
            });

            child.material = clonedMaterials;
            return;
        }

        const clonedMaterial = sourceMaterial.clone();

        clonedMaterial.transparent = true;
        clonedMaterial.opacity = 0;

        child.material = clonedMaterial;
        materials.push(clonedMaterial);
    });

    clone.updateMatrixWorld(true);

    const bounds = new THREE.Box3().setFromObject(clone);
    const size = bounds.getSize(new THREE.Vector3());
    const center = bounds.getCenter(new THREE.Vector3());
    const maxDimension = Math.max(size.x, size.y, size.z);

    const normalized = new THREE.Group();
    normalized.add(clone);

    clone.position.sub(center);

    if (maxDimension > 0.00001) {
        normalized.scale.setScalar(2 / maxDimension);
    }

    return {
        object: normalized,
        materials,
    };
}

export default function EarthModel({
    progressRef,
    orbitRef,
    revealRef,
    globeRadius,
    finalOffsetX,
    onReady,
}: EarthModelProps) {
    const groupRef = useRef<THREE.Group>(null);
    const currentProgressRef = useRef(progressRef.current);

    const currentOrbitRef = useRef({
        x: 0,
        y: 0,
    });

    const gltf = useGLTF(EARTH_MODEL_URL);

    const prepared = useMemo(
        () => prepareEarth(gltf.scene),
        [gltf.scene],
    );

    useEffect(() => {
        onReady();
    }, [onReady]);

    useFrame((_, delta) => {
        const group = groupRef.current;

        if (!group) {
            return;
        }

        currentProgressRef.current = THREE.MathUtils.damp(
            currentProgressRef.current,
            progressRef.current,
            6.5,
            delta,
        );

        const targetOrbit = orbitRef.current;
        const currentOrbit = currentOrbitRef.current;

        currentOrbit.x = THREE.MathUtils.damp(
            currentOrbit.x,
            targetOrbit.targetX,
            9,
            delta,
        );

        currentOrbit.y = THREE.MathUtils.damp(
            currentOrbit.y,
            targetOrbit.targetY,
            9,
            delta,
        );

        const progress = currentProgressRef.current;
        const reveal = revealRef.current;

        const baseRotationY = THREE.MathUtils.lerp(
            -0.68,
            0.22,
            progress,
        );

        group.visible = reveal > 0.001;
        group.position.x = finalOffsetX;

        group.rotation.x = currentOrbit.x;

        group.rotation.y =
            baseRotationY +
            currentOrbit.y;

        const revealScale = THREE.MathUtils.lerp(
            0.94,
            1,
            reveal,
        );

        group.scale.setScalar(
            globeRadius * revealScale,
        );

        for (const material of prepared.materials) {
            material.opacity = reveal;
        }
    });

    return (
        <group
            ref={groupRef}
            visible={false}
        >
            <primitive
                object={prepared.object}
                dispose={null}
            />

            <EarthLabels
                revealRef={revealRef}
            />
        </group>
    );
}
