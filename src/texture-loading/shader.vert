float PI = 3.141593;
float TAU = 6.283185;

uniform float time;
attribute float modelNumber;

varying vec3 vPosition;
varying vec3 vNormal;

void rotate2d(inout vec2 position, in float rotation) {
	float cosRotation = cos(rotation);
	float sinRotation = sin(rotation);
	float x = position.x;
	float y = position.y;
	position.x = x * cosRotation - y * sinRotation;
	position.y = x * sinRotation + y * cosRotation;
}

void main() {
	vPosition = position;
	vNormal = normalMatrix * normal;
	vec3 positionPrime = position;
	positionPrime.x += pow(modelNumber, 0.5);
	rotate2d(positionPrime.xz, modelNumber * 0.2);
	positionPrime.y += sin(modelNumber + time);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(positionPrime, 1.0);
}
