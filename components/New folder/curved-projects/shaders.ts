export const CARD_VERTEX_SHADER = /* glsl */ `
  uniform float uViewportWidth;
  uniform float uCurveDepth;
  uniform float uCurveDrop;
  uniform float uVelocity;
  uniform float uHover;

  uniform float uTime;
  uniform vec2 uRipplePosition;
  uniform float uRippleStrength;
  uniform float uPlaneAspect;

  varying vec2 vUv;
  varying float vShade;
  varying float vRipple;

  void main() {
    vUv = uv;

    /*
     * DOM determines base position and size.
     * WebGL then deforms same geometry.
     */
    vec4 worldPosition =
      modelMatrix *
      vec4(position, 1.0);

    /*
     * =====================================
     * GLOBAL CURVED GALLERY SURFACE
     * =====================================
     */

    float halfViewport =
      max(
        uViewportWidth * 0.5,
        0.001
      );

    float normalizedX =
      worldPosition.x /
      halfViewport;

    float edge =
      min(
        abs(normalizedX),
        1.4
      );

    float curve =
      edge * edge;

    /*
     * Cards recede into background
     * toward viewport edges.
     */
    worldPosition.z -=
      curve *
      uCurveDepth;

    /*
     * Slight downward arc.
     */
    worldPosition.y -=
      curve *
      uCurveDrop;

    /*
     * =====================================
     * LOCAL CARD CURVATURE
     * =====================================
     */

    float localX =
      uv.x * 2.0 - 1.0;

    worldPosition.z -=
      localX *
      localX *
      0.035;

    /*
     * =====================================
     * SCROLL ELASTICITY
     * =====================================
     */

    worldPosition.x +=
      (uv.y - 0.5) *
      uVelocity *
      0.05;

    /*
     * =====================================
     * RIPPLE
     * =====================================
     */

    vec2 rippleDelta =
      uv -
      uRipplePosition;

    /*
     * Correct for card aspect ratio so
     * ripple remains circular.
     */
    rippleDelta.x *=
      uPlaneAspect;

    float rippleDistance =
      length(rippleDelta);

    float rippleEnvelope =
      exp(
        -rippleDistance *
        6.5
      );

    float rippleWave =
      sin(
        rippleDistance *
        42.0 -
        uTime *
        8.0
      );

    float ripple =
      rippleWave *
      rippleEnvelope *
      uRippleStrength;

    /*
     * Physical mesh displacement.
     */
    worldPosition.z +=
      ripple *
      0.07;

    /*
     * Very subtle hover pressure.
     */
    worldPosition.z +=
      sin(
        uv.x *
        3.14159265
      ) *
      sin(
        uv.y *
        3.14159265
      ) *
      uHover *
      0.016;

    vRipple = ripple;

    /*
     * Used to darken side cards.
     */
    vShade =
      1.0 -
      min(
        curve * 0.24,
        0.36
      );

    gl_Position =
      projectionMatrix *
      viewMatrix *
      worldPosition;
  }
`;

export const CARD_FRAGMENT_SHADER = /* glsl */ `
  uniform sampler2D uTexture;

  uniform float uTextureAspect;
  uniform float uPlaneAspect;

  uniform float uHover;

  uniform float uTime;
  uniform vec2 uRipplePosition;
  uniform float uRippleStrength;

  varying vec2 vUv;
  varying float vShade;
  varying float vRipple;

  vec2 coverUv(
    vec2 uv,
    float planeAspect,
    float textureAspect
  ) {
    vec2 scale =
      vec2(1.0);

    if (
      textureAspect >
      planeAspect
    ) {
      scale.x =
        planeAspect /
        textureAspect;
    } else {
      scale.y =
        textureAspect /
        planeAspect;
    }

    return
      (uv - 0.5) *
      scale +
      0.5;
  }

  float roundedMask(
    vec2 uv,
    float aspect,
    float radius
  ) {
    vec2 p =
      uv -
      0.5;

    p.x *= aspect;

    vec2 halfSize =
      vec2(
        aspect * 0.5,
        0.5
      );

    vec2 q =
      abs(p) -
      halfSize +
      radius;

    float sdf =
      length(
        max(q, 0.0)
      ) +
      min(
        max(q.x, q.y),
        0.0
      ) -
      radius;

    return
      1.0 -
      smoothstep(
        -0.003,
        0.003,
        sdf
      );
  }

  void main() {
    /*
     * =====================================
     * RIPPLE UV DISTORTION
     * =====================================
     */

    vec2 rippleDelta =
      vUv -
      uRipplePosition;

    rippleDelta.x *=
      uPlaneAspect;

    float rippleDistance =
      length(rippleDelta);

    float rippleEnvelope =
      exp(
        -rippleDistance *
        6.5
      );

    float rippleWave =
      sin(
        rippleDistance *
        42.0 -
        uTime *
        8.0
      );

    float ripple =
      rippleWave *
      rippleEnvelope *
      uRippleStrength;

    vec2 direction =
      rippleDelta /
      max(
        rippleDistance,
        0.0001
      );

    direction.x /=
      max(
        uPlaneAspect,
        0.0001
      );

    vec2 distortedUv =
      vUv +
      direction *
      ripple *
      0.011;

    /*
     * =====================================
     * COVER IMAGE
     * =====================================
     */

    vec2 imageUv =
      coverUv(
        distortedUv,
        uPlaneAspect,
        uTextureAspect
      );

    /*
     * =====================================
     * SUBTLE CHROMATIC RIPPLE
     * =====================================
     */

    vec2 chromaticOffset =
      direction *
      ripple *
      0.0018;

    vec2 redUv =
      coverUv(
        distortedUv +
        chromaticOffset,
        uPlaneAspect,
        uTextureAspect
      );

    vec2 blueUv =
      coverUv(
        distortedUv -
        chromaticOffset,
        uPlaneAspect,
        uTextureAspect
      );

    float red =
      texture2D(
        uTexture,
        redUv
      ).r;

    float green =
      texture2D(
        uTexture,
        imageUv
      ).g;

    float blue =
      texture2D(
        uTexture,
        blueUv
      ).b;

    vec3 color =
      vec3(
        red,
        green,
        blue
      );

    /*
     * =====================================
     * ROUNDED CORNERS
     * =====================================
     */

    float mask =
      roundedMask(
        vUv,
        uPlaneAspect,
        0.04
      );

    if (mask < 0.5) {
      discard;
    }

    /*
     * Side cards become slightly darker.
     */
    color *=
      mix(
        0.68,
        1.0,
        vShade
      );

    /*
     * Hover brightness.
     */
    color *=
      1.0 +
      uHover *
      0.04;

    /*
     * Small light response on ripple peaks.
     */
    color +=
      max(
        vRipple,
        0.0
      ) *
      0.022;

    gl_FragColor =
      vec4(
        color,
        1.0
      );

    #include <colorspace_fragment>
  }
`;

export const GRID_VERTEX_SHADER = /* glsl */ `
  uniform float uCurveStrength;

  varying float vDepth;
  varying float vEdge;

  void main() {
    vec4 worldPosition =
      modelMatrix *
      vec4(position, 1.0);

    /*
     * Slight horizontal wrapping
     * so floor also feels curved.
     */
    float normalizedX =
      clamp(
        worldPosition.x / 30.0,
        -1.0,
        1.0
      );

    float curve =
      normalizedX *
      normalizedX;

    worldPosition.y -=
      curve *
      uCurveStrength;

    worldPosition.z -=
      curve *
      2.0;

    vDepth =
      -worldPosition.z;

    vEdge =
      abs(normalizedX);

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
        44.0,
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
      0.32 *
      depthFade *
      edgeFade;

    gl_FragColor =
      vec4(
        vec3(0.34),
        alpha
      );

    #include <colorspace_fragment>
  }
`;