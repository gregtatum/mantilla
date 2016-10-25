#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)
#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)

float PI = 3.141593;
float TAU = 6.283185;
float CUBE_HEIGHT = 0.5;

uniform float time;
attribute vec2 gridPosition;

varying vec3 vPosition;
varying vec3 vNormal;
varying float vNoiseHeight;
varying vec2 vGridPosition;

void main() {
	vGridPosition = gridPosition;
	vPosition = position;
	vNoiseHeight = snoise3(vec3(0.1 * gridPosition, time));
	vPosition.y *= 1.001 + vNoiseHeight * CUBE_HEIGHT;
	vNormal = normalMatrix * normal;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(vPosition, 1.0);
}
