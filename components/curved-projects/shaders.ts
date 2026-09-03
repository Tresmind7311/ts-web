export const CARD_VERTEX_SHADER = /* glsl */ `
  uniform float uViewportWidth;
  uniform float uTime;
  uniform float uWaveOffset;
  uniform float uWaveStrength;
  uniform float uPlaneAspect;
  uniform vec2  uRipplePosition;
  uniform float uRippleStrength;

  varying vec2  vUv;
  varying float vGalleryDistance;
  varying float vWave;
  varying float vSideAmount;
  varying float vRipple;

  void main() {
    vUv = uv;

    vec4 worldPosition =
      modelMatrix * vec4(position, 1.0);

    float halfViewport =
      max(uViewportWidth * 0.5, 0.001);

    float cardCenterX = modelMatrix[3][0];
    float cardCenterY = modelMatrix[3][1];

    float localX = worldPosition.x - cardCenterX;
    float localY = worldPosition.y - cardCenterY;

    float normalizedCenter = cardCenterX / halfViewport;
    float distanceFromCenter = abs(normalizedCenter);
    float sideSign = normalizedCenter < 0.0 ? -1.0 : 1.0;

    /*
     * Gallery placement stays separate from local deformation.
     * This is what keeps centre card readable and side cards small.
     */
    float mappedDistance =
      min(
        distanceFromCenter *
        (1.0 + 0.32 * distanceFromCenter),
        1.90
      );

    float mappedCenterX =
      sideSign *
      mappedDistance *
      halfViewport;

    float galleryDepth =
      min(distanceFromCenter * 7.0, 11.5);

    float angleProgress =
      smoothstep(0.0, 1.28, distanceFromCenter);

    /*
     * Important: do not approach 90deg. Previous version did that on far
     * cards and, combined with per-row rotation, caused folded/torn shapes.
     */
    float galleryAngle =
      sideSign *
      1.34 *
      angleProgress *
      angleProgress;

    const float PI = 3.14159265359;

    float sideAmount =
      smoothstep(0.28, 1.15, distanceFromCenter);

    float vertical =
      (uv.y - 0.5) * 2.0;

    /*
     * =============================================
     * CONTROLLED SIDE WRING
     * =============================================
     *
     * Do NOT rotate each horizontal row around Y.
     * That can make geometry self-intersect at steep perspective.
     *
     * Instead:
     * - compress centre waist slightly
     * - shear top/bottom in opposite X directions
     * - add only a small Z torsion
     *
     * Result: reference-like hourglass/wring without broken triangles.
     */
    float waistProfile =
      1.0 - pow(abs(vertical), 1.45);

    float waistScale =
      1.0 -
      sideAmount *
      waistProfile *
      0.24;

    float wringShear =
      sideSign *
      vertical *
      sideAmount *
      0.11;

    float wrungX =
      localX * waistScale +
      wringShear;

    float wrungZ =
      -localX *
      vertical *
      sideSign *
      sideAmount *
      0.075;

    /*
     * =============================================
     * FLAG WAVE
     * =============================================
     * Wave is enabled only for the currently active / centred card.
     * uWaveStrength is set per card from the JS scene driver. Side cards
     * remain fully wrung/perspective-deformed but do not flap.
     */
    float freeEdge =
      pow(uv.x, 1.25);

    float waveAmplitude =
      0.105 * uWaveStrength;

    float wave1 =
      sin(
        uv.x * 2.75 * PI -
        uTime * 1.55 +
        uWaveOffset
      ) *
      freeEdge *
      waveAmplitude;

    float wave2 =
      sin(
        uv.x * 5.35 * PI -
        uTime * 2.18 +
        uWaveOffset * 1.37
      ) *
      freeEdge *
      waveAmplitude *
      0.30;

    float verticalWave =
      sin(
        uv.y * 2.10 * PI +
        uv.x * 1.65 -
        uTime * 1.22 +
        uWaveOffset * 0.72
      ) *
      freeEdge *
      0.032 * uWaveStrength;

    float totalWave = wave1 + wave2;

    wrungZ += totalWave;
    localY += verticalWave;

    /*
     * Gentle convex centre bow. Keeps centre card from looking dead-flat,
     * but remains much smaller than failed full-cylinder version.
     */
    float centreFacing = 1.0 - sideAmount;

    wrungZ +=
      sin(uv.x * PI) *
      sin(uv.y * PI) *
      0.040 *
      centreFacing;

    /*
     * =============================================
     * POINTER RIPPLE
     * =============================================
     */
    vec2 rippleDelta =
      uv - uRipplePosition;

    rippleDelta.x *=
      uPlaneAspect;

    float rippleDistance =
      length(rippleDelta);

    float rippleEnvelope =
      exp(-rippleDistance * 6.5);

    float rippleWave =
      sin(
        rippleDistance * 42.0 -
        uTime * 8.0
      );

    float ripple =
      rippleWave *
      rippleEnvelope *
      uRippleStrength;

    wrungZ += ripple * 0.080;
    localY += ripple * 0.010;

    /*
     * Card-level gallery Y rotation happens last.
     */
    float cosA = cos(galleryAngle);
    float sinA = sin(galleryAngle);

    float rotatedX =
      wrungX * cosA +
      wrungZ * sinA;

    float rotatedZ =
      -wrungX * sinA +
      wrungZ * cosA;

    worldPosition.x = mappedCenterX + rotatedX;
    worldPosition.y = cardCenterY + localY;
    worldPosition.z = -galleryDepth + rotatedZ;

    vGalleryDistance = distanceFromCenter;
    vWave = totalWave;
    vSideAmount = sideAmount;
    vRipple = ripple;

    gl_Position =
      projectionMatrix *
      viewMatrix *
      worldPosition;
  }
`;

export const CARD_FRAGMENT_SHADER = /* glsl */ `
  /* AFTER */
uniform sampler2D uTexture;
uniform float uTextureAspect;
uniform float uPlaneAspect;
uniform vec2 uTexelSize;
uniform float uTime;
  uniform vec2  uRipplePosition;
  uniform float uRippleStrength;

  varying vec2  vUv;
  varying float vGalleryDistance;
  varying float vWave;
  varying float vSideAmount;
  varying float vRipple;

  vec2 coverUv(
    vec2 uv,
    float planeAspect,
    float textureAspect
  ) {
    vec2 scale = vec2(1.0);

    if (textureAspect > planeAspect) {
      scale.x = planeAspect / textureAspect;
    } else {
      scale.y = textureAspect / planeAspect;
    }

    return (uv - 0.5) * scale + 0.5;
  }

  float roundedMask(
    vec2 uv,
    float aspect,
    float radius
  ) {
    vec2 p = uv - 0.5;
    p.x *= aspect;

    vec2 halfSize = vec2(aspect * 0.5, 0.5);
    vec2 q = abs(p) - halfSize + radius;

    float sdf =
      length(max(q, 0.0)) +
      min(max(q.x, q.y), 0.0) -
      radius;

    return 1.0 - smoothstep(-0.003, 0.003, sdf);
  }

  void main() {
    /* Match vertex ripple for subtle UV distortion. */
    vec2 rippleDelta =
      vUv - uRipplePosition;

    rippleDelta.x *=
      uPlaneAspect;

    float rippleDistance =
      length(rippleDelta);

    float rippleEnvelope =
      exp(-rippleDistance * 6.5);

    float rippleWave =
      sin(
        rippleDistance * 42.0 -
        uTime * 8.0
      );

    float ripple =
      rippleWave *
      rippleEnvelope *
      uRippleStrength;

    vec2 direction =
      rippleDelta /
      max(rippleDistance, 0.0001);

    direction.x /=
      max(uPlaneAspect, 0.0001);

    vec2 distortedUv =
      vUv +
      direction *
      ripple *
      0.010;

    vec2 imageUv =
      coverUv(
        distortedUv,
        uPlaneAspect,
        uTextureAspect
      );

    vec2 chromaticOffset =
      direction *
      ripple *
      0.0014;

    vec2 redUv =
      coverUv(
        distortedUv + chromaticOffset,
        uPlaneAspect,
        uTextureAspect
      );

    vec2 blueUv =
      coverUv(
        distortedUv - chromaticOffset,
        uPlaneAspect,
        uTextureAspect
      );

    float red = texture2D(uTexture, redUv).r;
    float green = texture2D(uTexture, imageUv).g;
    float blue = texture2D(uTexture, blueUv).b;

    vec3 color = vec3(red, green, blue);

    /* Clearly visible rounded corners on WebGL card itself. */
    float mask =
      roundedMask(
        vUv,
        uPlaneAspect,
        0.034
      );

    if (mask < 0.5) {
      discard;
    }

    /* Cloth-light response from flag wave. */
    color *=
      1.0 +
      vWave *
      mix(0.18, 0.12, vSideAmount);

    color +=
      max(vRipple, 0.0) *
      0.020;

    /* AFTER */
/*
 * Side-card blur.
 * Center stays sharp.
 * Blur increases with distance from center.
 */
float blurStrength =
  smoothstep(
    0.35,
    1.65,
    vGalleryDistance
  );

float blurRadius =
  blurStrength * 7.0;

vec2 blurStep =
  uTexelSize *
  blurRadius;

vec3 blurredColor =
  texture2D(
    uTexture,
    imageUv
  ).rgb * 0.227027;

blurredColor +=
  texture2D(
    uTexture,
    imageUv + vec2(blurStep.x, 0.0)
  ).rgb * 0.1945946;

blurredColor +=
  texture2D(
    uTexture,
    imageUv - vec2(blurStep.x, 0.0)
  ).rgb * 0.1945946;

blurredColor +=
  texture2D(
    uTexture,
    imageUv + vec2(0.0, blurStep.y)
  ).rgb * 0.1216216;

blurredColor +=
  texture2D(
    uTexture,
    imageUv - vec2(0.0, blurStep.y)
  ).rgb * 0.1216216;

blurredColor +=
  texture2D(
    uTexture,
    imageUv + blurStep
  ).rgb * 0.035135;

blurredColor +=
  texture2D(
    uTexture,
    imageUv - blurStep
  ).rgb * 0.035135;

blurredColor +=
  texture2D(
    uTexture,
    imageUv + vec2(blurStep.x, -blurStep.y)
  ).rgb * 0.035135;

blurredColor +=
  texture2D(
    uTexture,
    imageUv + vec2(-blurStep.x, blurStep.y)
  ).rgb * 0.035135;

color =
  mix(
    color,
    blurredColor,
    blurStrength
  );

    gl_FragColor = vec4(color, 1.0);

    #include <colorspace_fragment>
  }
`;

export const GRID_VERTEX_SHADER = /* glsl */ `
  uniform float uCurveStrength;

  varying float vDepth;
  varying float vEdge;

  void main() {
    vec4 worldPosition =
      modelMatrix * vec4(position, 1.0);

    float normalizedX =
      clamp(
        worldPosition.x / 30.0,
        -1.0,
        1.0
      );

    float curve =
      normalizedX * normalizedX;

    worldPosition.y -=
      curve * uCurveStrength;

    worldPosition.z -=
      curve * 1.75;

    vDepth = -worldPosition.z;
    vEdge = abs(normalizedX);

    gl_Position =
      projectionMatrix *
      viewMatrix *
      worldPosition;
  }
`;

export const GRID_FRAGMENT_SHADER = /* glsl */ `
  varying float vDepth;
  varying float vEdge;

  void main() {
    float depthFade =
      1.0 -
      smoothstep(
        8.0,
        42.0,
        vDepth
      );

    float edgeFade =
      1.0 -
      smoothstep(
        0.72,
        1.0,
        vEdge
      );

    float alpha =
      0.20 *
      depthFade *
      edgeFade;

    gl_FragColor =
      vec4(
        vec3(0.52),
        alpha
      );

    #include <colorspace_fragment>
  }
`;
