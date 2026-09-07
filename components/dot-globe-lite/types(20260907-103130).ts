export interface DotPointer {
    x: number;
    y: number;
    active: number;
}

export interface EarthOrbitState {
    targetYaw: number;
    targetPitch: number;
    dragging: boolean;
}

export interface GlobeRoute {
    startLat: number;
    startLng: number;
    endLat: number;
    endLng: number;
}

export interface EarthLocation {
    id: string;
    title: string;
    lines: string[];
    lat: number;
    lng: number;
    side: "left" | "right";
}

export interface PointAttributes {
    plane: Float32Array;
    sphere: Float32Array;
    sizes: Float32Array;
    seeds: Float32Array;
    flowSpeeds: Float32Array;
    seedPhases: Float32Array;
}

export interface Polyline3D {
    points: Float32Array;
}

export interface LabelBinding {
    location: EarthLocation;
    element: HTMLDivElement;
}
