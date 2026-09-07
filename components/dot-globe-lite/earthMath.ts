import type {
    GlobeRoute,
    PointAttributes,
    Polyline3D,
} from "./types";

export const CAMERA_Z = 10;
export const CAMERA_FOV_DEG = 45;
export const TAU = Math.PI * 2;

const DEG_TO_RAD = Math.PI / 180;

export function clamp(value: number, min: number, max: number) {
    return Math.min(max, Math.max(min, value));
}

export function lerp(start: number, end: number, progress: number) {
    return start + (end - start) * progress;
}

export function smoothstep(edge0: number, edge1: number, value: number) {
    const normalized = clamp(
        (value - edge0) / Math.max(edge1 - edge0, 0.00001),
        0,
        1,
    );

    return normalized * normalized * (3 - 2 * normalized);
}

export function damp(
    current: number,
    target: number,
    lambda: number,
    deltaSeconds: number,
) {
    return lerp(
        current,
        target,
        1 - Math.exp(-lambda * Math.max(deltaSeconds, 0)),
    );
}

export function positiveModulo(value: number, divisor: number) {
    return ((value % divisor) + divisor) % divisor;
}

export function wrapAngle(angle: number) {
    return positiveModulo(angle + Math.PI, TAU) - Math.PI;
}

export function seededRandom(index: number, offset = 0) {
    const value =
        Math.sin(index * 12.9898 + offset * 78.233) *
        43758.5453123;

    return value - Math.floor(value);
}

export function getViewportWorldSize(width: number, height: number) {
    const safeHeight = Math.max(height, 1);
    const aspect = Math.max(width, 1) / safeHeight;
    const fovRadians = CAMERA_FOV_DEG * DEG_TO_RAD;
    const worldHeight =
        2 * CAMERA_Z * Math.tan(fovRadians * 0.5);

    return {
        width: worldHeight * aspect,
        height: worldHeight,
    };
}

export function getFocalLengthPixels(height: number) {
    const fovRadians = CAMERA_FOV_DEG * DEG_TO_RAD;

    return (
        Math.max(height, 1) /
        (2 * Math.tan(fovRadians * 0.5))
    );
}

export function getGlobeRadiusWorld(
    viewportHeight: number,
    isMobile: boolean,
) {
    return Math.min(
        viewportHeight * (isMobile ? 0.32 : 0.37),
        isMobile ? 2.45 : 3.2,
    );
}

export function getProjectedWorldRadiusPixels(
    radiusWorld: number,
    height: number,
) {
    return (
        radiusWorld * getFocalLengthPixels(height) / CAMERA_Z
    );
}

export function latLngToXYZ(
    lat: number,
    lng: number,
    radius: number,
) {
    const phi = (90 - lat) * DEG_TO_RAD;
    const theta = (lng + 180) * DEG_TO_RAD;

    return {
        x: -radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.cos(phi),
        z: radius * Math.sin(phi) * Math.sin(theta),
    };
}

export function rotateXY(
    x: number,
    y: number,
    z: number,
    rotationX: number,
    rotationY: number,
) {
    const cosY = Math.cos(rotationY);
    const sinY = Math.sin(rotationY);

    const yawX = x * cosY + z * sinY;
    const yawZ = -x * sinY + z * cosY;

    const cosX = Math.cos(rotationX);
    const sinX = Math.sin(rotationX);

    return {
        x: yawX,
        y: y * cosX - yawZ * sinX,
        z: y * sinX + yawZ * cosX,
    };
}

export function projectXYZ(
    x: number,
    y: number,
    z: number,
    width: number,
    height: number,
) {
    const focal = getFocalLengthPixels(height);
    const depth = Math.max(CAMERA_Z - z, 0.5);
    const perspective = focal / depth;

    return {
        x: width * 0.5 + x * perspective,
        y: height * 0.5 - y * perspective,
        scale: CAMERA_Z / depth,
        depth,
    };
}

export function createPointAttributes(
    count: number,
    width: number,
    height: number,
    sphereRadius: number,
): PointAttributes {
    const plane = new Float32Array(count * 3);
    const sphere = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const seeds = new Float32Array(count);
    const flowSpeeds = new Float32Array(count);
    const seedPhases = new Float32Array(count);

    const aspect = width / Math.max(height, 0.00001);
    const columns = Math.ceil(Math.sqrt(count * aspect));
    const rows = Math.ceil(count / columns);

    const stepX = width / Math.max(columns - 1, 1);
    const stepY = height / Math.max(rows - 1, 1);

    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    const permutation = 3571;

    for (let index = 0; index < count; index += 1) {
        const row = Math.floor(index / columns);
        const column = index % columns;

        const randomX = seededRandom(index, 1) - 0.5;
        const randomY = seededRandom(index, 2) - 0.5;
        const randomZ = seededRandom(index, 3) - 0.5;

        const x =
            -width * 0.5 +
            column * stepX +
            randomX * stepX * 0.34;

        const y =
            height * 0.5 -
            row * stepY +
            randomY * stepY * 0.34;

        plane[index * 3] = x;
        plane[index * 3 + 1] = y;
        plane[index * 3 + 2] = randomZ * 0.08;

        const sphereIndex =
            (index * permutation) % count;
        const normalized =
            count <= 1 ? 0 : sphereIndex / (count - 1);
        const sphereY = 1 - normalized * 2;
        const horizontalRadius = Math.sqrt(
            Math.max(0, 1 - sphereY * sphereY),
        );
        const angle = goldenAngle * sphereIndex;

        const radiusVariation = lerp(
            0.97,
            1.015,
            seededRandom(index, 4),
        );

        const radius = sphereRadius * radiusVariation;

        sphere[index * 3] =
            Math.cos(angle) * horizontalRadius * radius;
        sphere[index * 3 + 1] = sphereY * radius;
        sphere[index * 3 + 2] =
            Math.sin(angle) * horizontalRadius * radius;

        sizes[index] = lerp(
            1.45,
            7.15,
            seededRandom(index, 5),
        );

        const seed = seededRandom(index, 6);
        seeds[index] = seed;
        flowSpeeds[index] = lerp(0.94, 1.06, seed);
        seedPhases[index] = seed * Math.PI;
    }

    return {
        plane,
        sphere,
        sizes,
        seeds,
        flowSpeeds,
        seedPhases,
    };
}

function normalizeXYZ(x: number, y: number, z: number) {
    const length = Math.hypot(x, y, z) || 1;

    return {
        x: x / length,
        y: y / length,
        z: z / length,
    };
}

function slerpUnitVectors(
    startX: number,
    startY: number,
    startZ: number,
    endX: number,
    endY: number,
    endZ: number,
    progress: number,
) {
    const dot = clamp(
        startX * endX + startY * endY + startZ * endZ,
        -1,
        1,
    );

    if (dot > 0.9995) {
        return normalizeXYZ(
            lerp(startX, endX, progress),
            lerp(startY, endY, progress),
            lerp(startZ, endZ, progress),
        );
    }

    const theta = Math.acos(dot);
    const sinTheta = Math.sin(theta);

    if (Math.abs(sinTheta) < 0.00001) {
        return normalizeXYZ(
            lerp(startX, endX, progress),
            lerp(startY, endY, progress),
            lerp(startZ, endZ, progress),
        );
    }

    const startWeight =
        Math.sin((1 - progress) * theta) / sinTheta;
    const endWeight =
        Math.sin(progress * theta) / sinTheta;

    return normalizeXYZ(
        startX * startWeight + endX * endWeight,
        startY * startWeight + endY * endWeight,
        startZ * startWeight + endZ * endWeight,
    );
}

export function createGlobeGridPolylines(
    radius: number,
): Polyline3D[] {
    const polylines: Polyline3D[] = [];
    const segments = 96;
    const latitudes = [-60, -30, 0, 30, 60];

    for (const latitude of latitudes) {
        const points = new Float32Array((segments + 1) * 3);

        for (let index = 0; index <= segments; index += 1) {
            const lng = -180 + (index / segments) * 360;
            const point = latLngToXYZ(latitude, lng, radius);
            const offset = index * 3;

            points[offset] = point.x;
            points[offset + 1] = point.y;
            points[offset + 2] = point.z;
        }

        polylines.push({ points });
    }

    const longitudes = [
        -150,
        -120,
        -90,
        -60,
        -30,
        0,
        30,
        60,
        90,
        120,
        150,
        180,
    ];

    for (const longitude of longitudes) {
        const points = new Float32Array((segments + 1) * 3);

        for (let index = 0; index <= segments; index += 1) {
            const lat = -90 + (index / segments) * 180;
            const point = latLngToXYZ(lat, longitude, radius);
            const offset = index * 3;

            points[offset] = point.x;
            points[offset + 1] = point.y;
            points[offset + 2] = point.z;
        }

        polylines.push({ points });
    }

    return polylines;
}

export function createRoutePolylines(
    routes: GlobeRoute[],
    radius: number,
): Polyline3D[] {
    const segmentsPerRoute = 64;

    return routes.map((route) => {
        const startRaw = latLngToXYZ(
            route.startLat,
            route.startLng,
            1,
        );
        const endRaw = latLngToXYZ(
            route.endLat,
            route.endLng,
            1,
        );
        const start = normalizeXYZ(
            startRaw.x,
            startRaw.y,
            startRaw.z,
        );
        const end = normalizeXYZ(
            endRaw.x,
            endRaw.y,
            endRaw.z,
        );

        const points = new Float32Array(
            (segmentsPerRoute + 1) * 3,
        );

        for (
            let index = 0;
            index <= segmentsPerRoute;
            index += 1
        ) {
            const progress = index / segmentsPerRoute;
            const direction = slerpUnitVectors(
                start.x,
                start.y,
                start.z,
                end.x,
                end.y,
                end.z,
                progress,
            );
            const lift =
                Math.sin(Math.PI * progress) * radius * 0.12;
            const distance = radius + lift;
            const offset = index * 3;

            points[offset] = direction.x * distance;
            points[offset + 1] = direction.y * distance;
            points[offset + 2] = direction.z * distance;
        }

        return { points };
    });
}
