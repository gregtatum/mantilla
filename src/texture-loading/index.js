const glslify = require('glslify')
const vertexShader = glslify(__dirname + '/shader.vert')
const fragmentShader = glslify(__dirname + '/shader.frag')
const createBox = require('geo-3d-box')

const {
  DataTexture,
  Vector3,
  BufferGeometry,
  BufferAttribute,
  Mesh,
  ShaderMaterial,
  RGBAFormat,
  Math: {nearestPowerOfTwo}
} = require('three')

module.exports = function(app) {
  const {scene} = app
  const config = {
    segments: [30, 15],
    size: 1
  }

  const mesh = createMesh(config)

  scene.add(mesh)
  mesh.position.y = -1;
  mesh.scale.multiplyScalar(0.1);

  return {
    update: updater(config, mesh)
  }
}

function updater(config, mesh) {
  const time = mesh.material.uniforms.time
  const start = Date.now()
  return () => {
    time.value = (Date.now() - start) / 1000;
  }
}

function createMesh (config) {
  return new Mesh(
    createGeometry(config),
    new ShaderMaterial({
      vertexShader,
      fragmentShader,
      // transparent: true,
      // wireframe: true,
      uniforms: {
        time: { value: 0 }
      }
    })
  )
}

function createGeometry (config) {
  const geometry = new BufferGeometry()
  const {position, normal, index, modelNumber} = createBuffers(config)

  geometry.setIndex(new BufferAttribute(index, 1))
  geometry.addAttribute('position', new BufferAttribute(position, 3))
  geometry.addAttribute('normal', new BufferAttribute(normal, 3))
  geometry.addAttribute('modelNumber', new BufferAttribute(modelNumber, 1))
  return geometry
}


function createBuffers (config) {
  let positions = []
  let normals = []
  let indices = []
  let modelNumbers = []
  const merge = (a, b) => a.concat(b)
  const {segments: [segmentsI, segmentsJ], size } = config
  const box = createBox({size: [0.95, 1, 0.95]})

  for (let i = 0; i < segmentsI; i++) {
    for (let j = 0; j < segmentsJ; j++) {
      positions.push(box.positions.slice())
      normals.push(box.normals.slice())
      indices.push(box.cells.map(([a, b, c], index) => {
        let offset = (i * segmentsJ + j) * box.positions.length
        return [a + offset, b + offset, c + offset]
      }))
      modelNumbers.push(box.positions.map(() => i * segmentsJ + j))
    }
  }

  return {
    position: new Float32Array(positions.reduce(merge).reduce(merge)),
    normal: new Float32Array(normals.reduce(merge).reduce(merge)),
    index: new Uint32Array(indices.reduce(merge).reduce(merge)),
    modelNumber: new Float32Array(modelNumbers.reduce(merge)),
  }
}
