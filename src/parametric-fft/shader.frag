#pragma glslify: hsl2rgb = require(glsl-hsl2rgb)

varying float vWaveform;
varying vec2 vUv;

void main() {

  gl_FragColor = vec4(
    hsl2rgb(fract(vUv.x * 0.1), 1.0, min(0.6, vWaveform * 10.0))
  , 1.0);
}
