float PI = 3.141593;
float TAU = 6.283185;

uniform float time;
uniform float waveform[16];

varying vec2 vUv;
varying float vWaveform;

void main() {
	vec3 cartesian = vec3(1.0);

	float scale = 0.5;
	float u = position.x;
	float v = position.y;
	float uT = u * TAU;
	float vT = v * TAU;

	float base = (waveform[0] + waveform[1] + waveform[1] + waveform[4]) / 4.0;
	base *= base;

	float r = waveform[int(floor(u * 16.0))];
	vWaveform = abs((r - 0.5) * 2.0);
	r *= r;
	cartesian.x = sin(vT) * scale * r;
	cartesian.y = u * (1.0 + base);
	cartesian.z = cos(vT) * scale * r;

	vUv.x = u;
	vUv.y = v;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(cartesian, 1.0);
}
