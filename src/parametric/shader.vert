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

	cartesian.x = cos(u * PI + time) * sin(vT) * scale;
	cartesian.y = mix(
		sin(u * 2.0 + time) * scale,
		u,
		sin(time)
	);
	cartesian.z = sin(u * PI + time) * cos(vT) * scale;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(cartesian, 1.0);
}
