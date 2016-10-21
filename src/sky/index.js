const glslify = require('glslify')
const vert = glslify(__dirname + '/shader.vert')
const frag = glslify(__dirname + '/shader.frag')
const {
  Color,
  DoubleSide,
  Mesh,
  PlaneGeometry,
  RawShaderMaterial,
  Vector2,
} = require("THREE")

module.exports = function createSky (app) {
  const {scene} = app
  const mesh = createMesh()
  scene.add(mesh)

  handleWindowResize(mesh)
  return {
    mesh,
    update: updater(mesh)
  }
}

function updater (mesh) {
  const time = mesh.material.uniforms.time
  const start = Date.now()
  return () => {
    time.value = (Date.now() - start) / 1000
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
