precision mediump float;
#pragma glslify: hsl2rgb = require(glsl-hsl2rgb)
#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)

uniform float aspect;
uniform float time;

varying vec2 vUv;

float GRADIENT_DISTANCE = 1.0;
float NOISE_DISTANCE = 0.1;
float NOISE_SCALE = 4.0;
float NOISE_SPEED = 0.05;
float CENTER_X = 0.6;
float CENTER_Y = 0.4;
float ASPECT_RATIO = 0.85;
float HUE_BASE = 0.02;
float HUE_SPEED = 0.5;
float HUE_RANGE = 0.03;

vec3 mix3(in vec3 a, in vec3 b, in vec3 c, in float center, in float t) {
  vec3 white = vec3(1.0);
  vec3 black = vec3(0.0);

  return
    a * mix(white, black, smoothstep(0.0, center, t)) +
    b * mix(black, white, smoothstep(0.0, center, t))
      * mix(white, black, smoothstep(center, 1.0, t)) +
    c * mix(black, white, smoothstep(center, 1.0, t));
}

void main() {

  float noise = NOISE_DISTANCE * snoise3(
    vec3(vUv.x, vUv.y, time * NOISE_SPEED) * NOISE_SCALE
  );

  vec2 position = vec2(
    vUv - vec2(CENTER_X + noise, CENTER_Y)
  ) * GRADIENT_DISTANCE;

  position.x *= aspect * ASPECT_RATIO;

  float distance = smoothstep(0.0, 1.0, length(position));;

  float baseHue = HUE_BASE + sin(time * HUE_SPEED) * HUE_RANGE;
  vec3 color1 = hsl2rgb(fract(baseHue + 0.08), 1.0, 0.66); // orange #EBA865
  vec3 color2 = hsl2rgb(fract(baseHue + 0.98), 0.56, 0.54); // red #CB4855
  vec3 color3 = hsl2rgb(fract(baseHue + 0.63), 0.08, 0.28); // dark #41434C
  vec3 color = mix3(color1, color2, color3, 0.3, distance);

  gl_FragColor = vec4(color, 1.0);
}
