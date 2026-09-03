import * as THREE from "three";
import type { GlobeRoute } from "./types";

function seededRandom(index: number, offset = 0) {
  const value = Math.sin(index * 12.9898 + offset * 78.233) * 43758.5453123;
  return value - Math.floor(value);
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function smoothstep(edge0: number, edge1: number, value: number) {
  const normalized = clamp(
    (value - edge0) / Math.max(edge1 - edge0, 0.00001),
    0,
    1,
  );

  return normalized * normalized * (3 - 2 * normalized);
}

export interface PointAttributes {
  plane: Float32Array;
  sphere: Float32Array;
  sizes: Float32Array;
  seeds: Float32Array;
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

    const sphereIndex = (index * permutation) % count;
    const normalized = count <= 1 ? 0 : sphereIndex / (count - 1);
    const sphereY = 1 - normalized * 2;
    const horizontalRadius = Math.sqrt(Math.max(0, 1 - sphereY * sphereY));
    const angle = goldenAngle * sphereIndex;

    const radiusVariation = THREE.MathUtils.lerp(
      0.97,
      1.015,
      seededRandom(index, 4),
    );

    const radius = sphereRadius * radiusVariation;

    sphere[index * 3] = Math.cos(angle) * horizontalRadius * radius;
    sphere[index * 3 + 1] = sphereY * radius;
    sphere[index * 3 + 2] = Math.sin(angle) * horizontalRadius * radius;

    sizes[index] = THREE.MathUtils.lerp(
      1.45,
      7.15,
      seededRandom(index, 5),
    );

    seeds[index] = seededRandom(index, 6);
  }

  return { plane, sphere, sizes, seeds };
}

export function latLngToVector3(lat: number, lng: number, radius: number) {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lng + 180);

  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);

  return new THREE.Vector3(x, y, z);
}

function slerpUnitVectors(
  start: THREE.Vector3,
  end: THREE.Vector3,
  progress: number,
) {
  const dot = clamp(start.dot(end), -1, 1);

  if (dot > 0.9995) {
    return start.clone().lerp(end, progress).normalize();
  }

  const theta = Math.acos(dot);
  const sinTheta = Math.sin(theta);

  if (Math.abs(sinTheta) < 0.00001) {
    return start.clone().lerp(end, progress).normalize();
  }

  const startWeight = Math.sin((1 - progress) * theta) / sinTheta;
  const endWeight = Math.sin(progress * theta) / sinTheta;

  return start
    .clone()
    .multiplyScalar(startWeight)
    .add(end.clone().multiplyScalar(endWeight))
    .normalize();
}

export function createGlobeGridSegments(radius: number) {
  const positions: number[] = [];
  const segments = 96;
  const latitudes = [-60, -30, 0, 30, 60];

  for (const latitude of latitudes) {
    for (let index = 0; index < segments; index += 1) {
      const lngA = -180 + (index / segments) * 360;
      const lngB = -180 + ((index + 1) / segments) * 360;

      const pointA = latLngToVector3(latitude, lngA, radius);
      const pointB = latLngToVector3(latitude, lngB, radius);

      positions.push(
        pointA.x,
        pointA.y,
        pointA.z,
        pointB.x,
        pointB.y,
        pointB.z,
      );
    }
  }

  const longitudes = [-150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150, 180];

  for (const longitude of longitudes) {
    for (let index = 0; index < segments; index += 1) {
      const latA = -90 + (index / segments) * 180;
      const latB = -90 + ((index + 1) / segments) * 180;

      const pointA = latLngToVector3(latA, longitude, radius);
      const pointB = latLngToVector3(latB, longitude, radius);

      positions.push(
        pointA.x,
        pointA.y,
        pointA.z,
        pointB.x,
        pointB.y,
        pointB.z,
      );
    }
  }

  return new Float32Array(positions);
}

export function createRouteSegments(routes: GlobeRoute[], radius: number) {
  const positions: number[] = [];
  const segmentsPerRoute = 64;

  for (const route of routes) {
    const start = latLngToVector3(
      route.startLat,
      route.startLng,
      1,
    ).normalize();

    const end = latLngToVector3(
      route.endLat,
      route.endLng,
      1,
    ).normalize();

    for (let index = 0; index < segmentsPerRoute; index += 1) {
      const progressA = index / segmentsPerRoute;
      const progressB = (index + 1) / segmentsPerRoute;

      const directionA = slerpUnitVectors(start, end, progressA);
      const directionB = slerpUnitVectors(start, end, progressB);

      const liftA = Math.sin(Math.PI * progressA) * radius * 0.12;
      const liftB = Math.sin(Math.PI * progressB) * radius * 0.12;

      const pointA = directionA.multiplyScalar(radius + liftA);
      const pointB = directionB.multiplyScalar(radius + liftB);

      positions.push(
        pointA.x,
        pointA.y,
        pointA.z,
        pointB.x,
        pointB.y,
        pointB.z,
      );
    }
  }

  return new Float32Array(positions);
}
