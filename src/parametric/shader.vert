#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)
#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)

float PI = 3.141593;
float TAU = 6.283185;

uniform float time;


void main() {
	vec3 cartesian = vec3(1.0);

	float scale = 0.5;
	float u = position.x * 0.5 + sin(time * 0.83) * 0.5;
	float v = position.y * 0.5 + sin(time * 0.83) * 0.5;
	float uT = u * TAU;
	float vT = v * TAU;

	float noiseScale = mix(8.0, 10.0, snoise2(vec2(0.0, time * 0.5)));
	float noiseAmplitude = mix(0.5, 2.0, snoise3(vec3(u, v, time)));
	float noise = 0.05 * snoise3(vec3(
		u * noiseScale,
		v * noiseScale,
		time
	)) * noiseAmplitude;

	cartesian.x = cos(u * PI + time) * sin(vT) * scale;
	cartesian.y = noise + mix(
		sin(u * 2.0 + time) * scale,
		u,
		sin(time)
	);
	cartesian.z = sin(u * PI + time) * cos(vT) * scale;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(cartesian, 1.0);
}
