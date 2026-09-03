export const DOT_VERTEX_SHADER = /* glsl */ `
  uniform float uTime;
  uniform float uProgress;
  uniform float uPixelRatio;
  uniform vec2 uMouse;
  uniform vec2 uViewport;
  uniform float uPointerActive;

  attribute vec3 aSphere;
  attribute float aSize;
  attribute float aSeed;

  varying float vAlpha;
  varying float vInfluence;
  varying float vMorph;
  varying float vFinalReveal;
  varying float vSeed;
  varying float vDepth;
  varying float vWave;

  void main() {
    float morph = smoothstep(0.22, 0.68, uProgress);
    float finalReveal = smoothstep(0.72, 0.95, uProgress);

    vec3 plane = position;

    /*
     * Scroll-linked downward flow.
     * Increasing ScrollTrigger progress moves the flat dot field
     * from top to bottom. Wrapping keeps the screen populated
     * instead of letting all particles disappear below the viewport.
     *
     * createPointAttributes() generates the plane at ~1.22x
     * viewport height, so the same factor is used here.
     */
    float fieldHeight = max(uViewport.y * 1.22, 0.0001);
    float halfFieldHeight = fieldHeight * 0.5;

    float flowSpeed = mix(
      0.94,
      1.06,
      aSeed
    );

    float scrollTravel =
      uProgress *
      fieldHeight *
      1.45 *
      flowSpeed;

    plane.y = mod(
      plane.y -
      scrollTravel +
      halfFieldHeight,
      fieldHeight
    ) - halfFieldHeight;

    float scrollWave1 = sin(
      plane.x * 0.72 +
      plane.y * 0.22 +
      uProgress * 9.0 +
      uTime * 0.18
    );

    float scrollWave2 = sin(
      plane.x * 0.23 -
      plane.y * 0.82 -
      uProgress * 6.5 +
      aSeed * 3.14159
    );

    float globalWave = scrollWave1 * 0.65 + scrollWave2 * 0.35;

    float globalWaveStrength =
      (1.0 - morph) *
      mix(
        0.055,
        0.22,
        smoothstep(0.0, 0.40, uProgress)
      );

    plane.z += globalWave * globalWaveStrength;

    vec2 pointNdc = vec2(
      plane.x / max(uViewport.x * 0.5, 0.0001),
      plane.y / max(uViewport.y * 0.5, 0.0001)
    );

    vec2 mouseDelta = pointNdc - uMouse;
    mouseDelta.x *= uViewport.x / max(uViewport.y, 0.0001);

    float mouseDistance = length(mouseDelta);

    float influence =
      (
        1.0 -
        smoothstep(0.0, 0.34, mouseDistance)
      ) *
      uPointerActive *
      (1.0 - morph);

    float cursorRipple =
      sin(mouseDistance * 18.0 - uTime * 1.35) * influence;

    plane.z += influence * 0.28;
    plane.z += cursorRipple * 0.055;

    vec2 direction = mouseDelta;
    float directionLength = length(direction);

    if (directionLength > 0.0001) {
      direction /= directionLength;
    }

    plane.xy += direction * influence * 0.025;

    vec3 sphere = aSphere;
    vec3 sphereNormal = normalize(aSphere);

    float sphereNoise =
      sin(uTime * 0.30 + aSeed * 18.0) *
      0.018 *
      morph *
      (1.0 - finalReveal);

    sphere += sphereNormal * sphereNoise;

    vec3 transformed = mix(plane, sphere, morph);

    vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    float perspective = 10.0 / max(-mvPosition.z, 1.0);

    /*
     * Kept at user's final value.
     */
    float cursorSize = 1.0 + influence * 1.9;

    float depthSize =
      1.0 +
      clamp(
        transformed.z * 0.13,
        -0.22,
        0.50
      );

    float sphereSize = mix(1.0, 1.15, morph);

    gl_PointSize = max(
      1.0,
      aSize *
      cursorSize *
      depthSize *
      sphereSize *
      uPixelRatio *
      perspective
    );

    vAlpha = mix(
      0.42 + influence * 0.20,
      mix(0.68, 0.28, finalReveal),
      morph
    );

    vInfluence = influence;
    vMorph = morph;
    vFinalReveal = finalReveal;
    vSeed = aSeed;
    vDepth = transformed.z;
    vWave = globalWave;
  }
`;

export const DOT_FRAGMENT_SHADER = /* glsl */ `
  uniform float uLayerOpacity;

  varying float vAlpha;
  varying float vInfluence;
  varying float vMorph;
  varying float vFinalReveal;
  varying float vSeed;
  varying float vDepth;
  varying float vWave;

  void main() {
    vec2 centeredUv = gl_PointCoord - vec2(0.5);
    float distanceFromCenter = length(centeredUv);

    float circle =
      1.0 -
      smoothstep(
        0.36,
        0.50,
        distanceFromCenter
      );

    if (circle <= 0.001) {
      discard;
    }

    vec3 pale = vec3(0.68, 0.72, 0.72);
    vec3 medium = vec3(0.32, 0.50, 0.49);
    vec3 dark = vec3(0.025, 0.255, 0.245);

    float randomWeight = smoothstep(0.25, 0.95, vSeed);
    float depthWeight = smoothstep(-0.3, 0.55, vDepth);
    float waveWeight = smoothstep(-0.15, 0.85, vWave);

    float darkWeight =
      randomWeight * 0.30 +
      depthWeight * 0.32 +
      waveWeight * 0.22 +
      vInfluence * 0.42;

    darkWeight = clamp(darkWeight, 0.0, 1.0);

    vec3 fieldColor = mix(pale, medium, darkWeight);

    fieldColor = mix(
      fieldColor,
      dark,
      clamp(
        vInfluence * 0.35 +
        depthWeight * 0.18,
        0.0,
        1.0
      )
    );

    vec3 sphereColor = mix(dark, medium, vFinalReveal * 0.35);
    vec3 finalColor = mix(fieldColor, sphereColor, vMorph);

    gl_FragColor = vec4(
      finalColor,
      circle * vAlpha * uLayerOpacity
    );
  }
`;
