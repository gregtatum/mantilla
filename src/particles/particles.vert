uniform float elapsed;
uniform float uRange;
attribute float size;
attribute float aOffset;
varying float vAlpha;
float PI = 3.14159;
float TAU = 6.2831;
#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)

void main() {

	// vec3 movement = vec3(0.0, elapsed * 0.001, 0.0);
	// vec3 movement = vec3(
	// 	sin( elapsed * aOffset) * uRange * 0.003,
	// 	elapsed * (-uRange / 100000.0 - uRange / 100000.0 * aOffset),
	// 	cos( elapsed * aOffset ) * uRange * 0.003
	// );
	//
	// vec3 range = vec3(uRange, uRange * 0.3, uRange);
	//
	// vec3 cameraOffset = cameraPosition - range;
	//
	// vec3 moduloPosition = mod( position + movement, uRange );
	// vec3 moduloPosition = mod( position + movement - cameraOffset, range * 2.0 ) + cameraOffset;
	// vec4 mvPosition = modelViewMatrix * vec4( moduloPosition, 1.0 );
	//
	// gl_PointSize = size * ( uRange / (length( mvPosition.xyz ) + 1.0) );
	//
	//
	// vAlpha = 0.5 * min(1.0, max(0.0,
	// 	1.0 - (length( mvPosition.xyz ) / uRange)
	// )) * flicker;
	//
	// gl_Position = projectionMatrix * mvPosition;

	vec3 moduloPosition = mod(
		position + vec3(
			sin(elapsed * 0.1 + aOffset * TAU),
			0.1 * -elapsed * aOffset,
			0.0
		),
		uRange
	) - vec3(uRange) / 2.0;

	vAlpha = 1.0;
	// gl_Position = vec4(position * 0.0, 1.0);
	gl_Position = projectionMatrix * modelViewMatrix * vec4(moduloPosition, 1.0);

	float flicker = mix(0.6, 1.0, snoise3( moduloPosition + elapsed * 2.0 ));

	float distanceAway = length(gl_Position.xyz);
	vAlpha = 0.1 * flicker * (3.0 - max(abs(gl_Position.x * 0.5), abs(gl_Position.y * 0.5)));
	gl_PointSize = size * distanceAway;
}
