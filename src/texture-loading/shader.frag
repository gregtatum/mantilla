#pragma glslify: hsl2rgb = require(glsl-hsl2rgb)
varying vec3 vPosition;
varying vec3 vNormal;

vec3 DIFFUSE_HSL = vec3(0.2, 0.75, 0.5);
vec3 AMBIENT_HSL = vec3(0.0, 0.5, 0.5);

void main() {
    // Define a light source, this is a normalized direction.
  vec3 light = normalize(vec3(-0.5, 0.2, 0.2));

  float lightDotProduct = dot( normalize( vNormal ), light );
  float surfaceBrightness = max( 0.0, lightDotProduct );
  vec3 ambient = AMBIENT_HSL;
  vec3 diffuse = DIFFUSE_HSL;

  gl_FragColor = vec4(hsl2rgb(ambient) + hsl2rgb(diffuse) * surfaceBrightness, 1.0);
}
