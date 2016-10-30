#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)
#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)

float PI = 3.141593;
float TAU = 6.283185;
float CUBE_HEIGHT = 1.5;

uniform float time;
attribute vec2 gridPosition;

varying vec3 vPosition;
varying vec3 vNormal;
varying float vNoiseHeight;
varying vec2 vGridPosition;

void rotate2d(inout vec2 position, in float rotation) {
	float cosRotation = cos(rotation);
	float sinRotation = sin(rotation);
	float x = position.x;
	float y = position.y;
	position.x = x * cosRotation - y * sinRotation;
	position.y = x * sinRotation + y * cosRotation;
}

void main() {
	vGridPosition = gridPosition;
	vPosition = position;
	vNoiseHeight = snoise3(vec3(0.15 * gridPosition, time * 0.5));
	vNoiseHeight *= vNoiseHeight * vNoiseHeight;
	vNoiseHeight += snoise3(vec3(0.04 * gridPosition, time * 0.12)) * 2.0;

	vPosition.y *= 1.001 + vNoiseHeight * CUBE_HEIGHT;
	vec3 rotatedPosition = vPosition;
	rotate2d(rotatedPosition.xy, vPosition.x * 0.03);
	vNormal = normalMatrix * normal;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(rotatedPosition, 1.0);
}
