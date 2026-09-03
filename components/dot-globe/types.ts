import type { MutableRefObject } from "react";

export interface DotPointer {
  x: number;
  y: number;
  active: number;
}

export interface EarthOrbitState {
  targetX: number;
  targetY: number;
  dragging: boolean;
}

export interface DotGlobeSceneProps {
  progressRef: MutableRefObject<number>;
  pointerRef: MutableRefObject<DotPointer>;
  orbitRef: MutableRefObject<EarthOrbitState>;
  earthEnabled: boolean;
}

export interface EarthModelProps {
  progressRef: MutableRefObject<number>;
  orbitRef: MutableRefObject<EarthOrbitState>;
  revealRef: MutableRefObject<number>;
  globeRadius: number;
  finalOffsetX: number;
  onReady: () => void;
}

export interface GlobeRoute {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
}
