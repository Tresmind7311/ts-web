"use client";

import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
    useMemo,
    useRef,
} from "react";
import * as THREE from "three";

import styles from "./DotGlobe.module.css";
import { latLngToVector3 } from "./utils";

import type { MutableRefObject } from "react";

interface EarthLabelsProps {
    revealRef: MutableRefObject<number>;
}

interface EarthLocation {
    id: string;
    title: string;
    lines: string[];
    lat: number;
    lng: number;
    side: "left" | "right";
}

const LOCATIONS: EarthLocation[] = [
    {
        id: "uk",
        title: "United Kingdom",
        lines: [
            "London",
            "Borton str. 88",
            "+44 20 7946 0958",
        ],
        lat: 51.5074,
        lng: -0.1278,
        side: "left",
    },
    {
        id: "usa",
        title: "USA",
        lines: [
            "Los Angeles",
            "Beverly Hills 05a",
            "+1 213-555-0173",
        ],
        lat: 34.0522,
        lng: -118.2437,
        side: "right",
    },
];

interface EarthLocationLabelProps {
    location: EarthLocation;
    revealRef: MutableRefObject<number>;
}

function EarthLocationLabel({
    location,
    revealRef,
}: EarthLocationLabelProps) {
    const anchorRef = useRef<THREE.Group>(null);
    const htmlRef = useRef<HTMLDivElement>(null);

    const anchorPosition = useMemo(
        () =>
            latLngToVector3(
                location.lat,
                location.lng,
                1.075,
            ),
        [
            location.lat,
            location.lng,
        ],
    );

    const worldAnchor = useMemo(
        () => new THREE.Vector3(),
        [],
    );

    const worldCenter = useMemo(
        () => new THREE.Vector3(),
        [],
    );

    const surfaceDirection = useMemo(
        () => new THREE.Vector3(),
        [],
    );

    const cameraDirection = useMemo(
        () => new THREE.Vector3(),
        [],
    );

    useFrame(({ camera }) => {
        const anchor = anchorRef.current;
        const html = htmlRef.current;

        if (!anchor || !html || !anchor.parent) {
            return;
        }

        anchor.getWorldPosition(worldAnchor);
        anchor.parent.getWorldPosition(worldCenter);

        surfaceDirection
            .copy(worldAnchor)
            .sub(worldCenter)
            .normalize();

        cameraDirection
            .copy(camera.position)
            .sub(worldCenter)
            .normalize();

        /*
         * Hide labels when their country rotates around
         * to the far side of the globe.
         */
        const frontFacing =
            surfaceDirection.dot(cameraDirection);

        const earthReveal = revealRef.current;

        const revealOpacity = THREE.MathUtils.smoothstep(
            earthReveal,
            0.22,
            0.82,
        );

        const horizonOpacity = THREE.MathUtils.smoothstep(
            frontFacing,
            -0.04,
            0.20,
        );

        const opacity =
            revealOpacity *
            horizonOpacity;

        html.style.opacity = String(opacity);

        html.style.visibility =
            opacity > 0.015
                ? "visible"
                : "hidden";
    });

    return (
        <group
            ref={anchorRef}
            position={anchorPosition}
        >
            <Html
                center
                zIndexRange={[20, 10]}
                className={styles.earthLabelHtml}
            >
                <div
                    ref={htmlRef}
                    className={[
                        styles.earthLabel,
                        location.side === "left"
                            ? styles.earthLabelLeft
                            : styles.earthLabelRight,
                    ].join(" ")}
                >
                    <span
                        className={styles.earthLabelMarker}
                        aria-hidden="true"
                    />

                    <div
                        className={styles.earthLabelContent}
                    >
                        <strong>
                            {location.title}
                        </strong>

                        {location.lines.map((line) => (
                            <span key={line}>
                                {line}
                            </span>
                        ))}
                    </div>
                </div>
            </Html>
        </group>
    );
}

export default function EarthLabels({
    revealRef,
}: EarthLabelsProps) {
    return (
        <>
            {LOCATIONS.map((location) => (
                <EarthLocationLabel
                    key={location.id}
                    location={location}
                    revealRef={revealRef}
                />
            ))}
        </>
    );
}
