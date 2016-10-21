const glslify = require('glslify')
const vertexShader = glslify(__dirname + '/shader.vert')
const fragmentShader = glslify(__dirname + '/shader.frag')

const {
  Mesh,
  PlaneBufferGeometry,
  ShaderMaterial,
} = require("THREE")

module.exports = function makeParametric(app) {
  const config = {
    meshSize: 3,
    size: 1,
    segments: [16, 16]
  }

  const {scene} = app
  const mesh = createMesh(config)
  mesh.scale.multiplyScalar(config.meshSize)
  scene.add(mesh)

  return { mesh, update: updater(app, mesh) }
}

const updater = (app, mesh) => {
  const start = Date.now()
  return () => {
    const time = (Date.now() - start) / 1000
    const rotation = time / 10
    mesh.rotation.x = rotation * 0.2
    mesh.rotation.y = rotation * 0.3
    mesh.rotation.z = rotation * 0.35

    if (app.sound.waveform) {
      const target = mesh.material.uniforms.waveform.value
      const waveform = app.sound.waveform
      for (let i = 0; i < target.length; i++) {
        target[i] = waveform[i] / 255
      }
    }
    mesh.material.uniforms.time.value = time
  }
}

function createMesh (config) {
  const [w, h] = config.segments;
  return new Mesh(
    new PlaneBufferGeometry(config.size, config.size, w, h),
    new ShaderMaterial({
    	uniforms: {
    		time: { value: 0 },
        waveform: { type: "fv1", value: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] }
    	},
      wireframe: true,
    	vertexShader,
    	fragmentShader
    })
  )
}
