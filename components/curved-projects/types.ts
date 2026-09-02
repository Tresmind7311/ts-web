import type { MutableRefObject } from 'react';

export interface Project {
  title: string;
  image: string;
  href: string;
}

export interface ScrollState {
  target: number;
  current: number;
  velocity: number;
}

export interface RectSnapshot {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface RippleState {
  x: number;
  y: number;
  strength: number;
}

export interface CurvedProjectsSceneProps {
  projects: Project[];

  cardRefs: MutableRefObject<
    (HTMLAnchorElement | null)[]
  >;

  uiRefs: MutableRefObject<
    (HTMLDivElement | null)[]
  >;

  trackRef: MutableRefObject<HTMLDivElement | null>;

  rectsRef: MutableRefObject<RectSnapshot[]>;

  scrollRef: MutableRefObject<ScrollState>;

  hoverRef: MutableRefObject<number[]>;

  rippleRef: MutableRefObject<RippleState[]>;
}