const glslify = require('glslify')
const vert = glslify(__dirname + '/shader.vert')
const frag = glslify(__dirname + '/shader.frag')
const averageFrequencies = require("analyser-frequency-average")
const {
  Color,
  DoubleSide,
  Mesh,
  PlaneGeometry,
  RawShaderMaterial,
  Vector2,
} = require("THREE")

module.exports = function createSky (app) {
  const {scene, sound} = app
  const mesh = createMesh()
  mesh.frustumCulled = false;
  scene.add(mesh)

  handleWindowResize(mesh)
  return {
    mesh,
    update: updater(mesh, sound)
  }
}

function updater (mesh, sound) {
  const time = mesh.material.uniforms.time
  const kickDrum = mesh.material.uniforms.kickDrum
  const start = Date.now()
  return () => {
    time.value = (Date.now() - start) / 1000
    if (sound && sound.analyserUtil) {
      const minHz = 0;
      const maxHz = 60;
      kickDrum.value = averageFrequencies(
        sound.analyserUtil.analyser,
        sound.analyserUtil.frequencies(),
        minHz,
        maxHz
      )
    }
  }
}

function createMesh () {
  return new Mesh(
    new PlaneGeometry(2, 2, 1),
    new RawShaderMaterial({
      vertexShader: vert,
      fragmentShader: frag,
      side: DoubleSide,
      uniforms: {
        aspect: { type: 'f', value: 1 },
        time: { type: 'f', value: 0.5 },
        smooth: { type: 'v2', value: new Vector2(0.0, 1.0) },
        kickDrum: { value: 0.5 },
      },
      depthTest: false
    })
  )
}

function originalUpdate (mesh, config = {}) {
  const {geometry, material} = mesh
  material.uniforms.aspect.value = window.innerWidth / window.innerHeight
}

function handleWindowResize (mesh) {
  const {material} = mesh
  const resize = () => {
    material.uniforms.aspect.value = window.innerWidth / window.innerHeight
  }
  window.addEventListener('resize', resize, false)
  resize()
}
