const glslify = require('glslify')
const vertexShader = glslify(__dirname + '/shader.vert')
const fragmentShader = glslify(__dirname + '/shader.frag')

const {Vector3, BufferGeometry, BufferAttribute, Mesh, ShaderMaterial} = require('three')
const createBox = require('geo-3d-box')

module.exports = function(app) {
  const {scene} = app
  const config = {
    segments: [20, 10],
    size: 1
  }

  const mesh = createMesh(config)
  scene.add(mesh)
  mesh.position.y = 2;
  mesh.position.x = 2;
  mesh.position.z = -2;
  mesh.rotation.z = 2.5
  mesh.rotation.x = -0.2

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
      transparent: true,
      // wireframe: true,
      uniforms: {
        time: { value: 0 }
      }
    })
  )
}

function createGeometry (config) {
  const geometry = new BufferGeometry()
  const {position, normal, index, gridPosition} = createBuffers(config)

  geometry.setIndex(new BufferAttribute(index, 1))
  geometry.addAttribute('position', new BufferAttribute(position, 3))
  geometry.addAttribute('normal', new BufferAttribute(normal, 3))
  geometry.addAttribute('gridPosition', new BufferAttribute(gridPosition, 2))
  return geometry
}

function createBuffers (config) {
  let positions = []
  let normals = []
  let indices = []
  let gridPositions = []
  const merge = (a, b) => a.concat(b)
  const {segments: [segmentsI, segmentsJ], size } = config
  const box = createBox()
  const offsetX = (size * segmentsI) * 0.5 - size * 0.5
  const offsetY = size * 0.5
  const offsetZ = (size * segmentsJ) * 0.5 - size * 0.5

  for (let i = 0; i < segmentsI; i++) {
    for (let j = 0; j < segmentsJ; j++) {
      positions.push(box.positions.map(([x, y, z]) => [
        (x + i * size) - offsetX,
        y + offsetY,
        (z + j * size) - offsetZ
      ]))
      normals.push(box.normals.slice())
      indices.push(box.cells.map(([a, b, c], index) => {
        let offset = (i * segmentsJ + j) * box.positions.length
        return [a + offset, b + offset, c + offset]
      }))
      gridPositions.push(box.positions.map(() => [i, j]))
    }
  }

  return {
    position: new Float32Array(positions.reduce(merge).reduce(merge)),
    normal: new Float32Array(normals.reduce(merge).reduce(merge)),
    index: new Uint32Array(indices.reduce(merge).reduce(merge)),
    gridPosition: new Float32Array(gridPositions.reduce(merge).reduce(merge)),
  }
}
