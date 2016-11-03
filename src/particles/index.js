const Glslify = require('glslify')
const vertexShader = Glslify('./particles.vert')
const fragmentShader = Glslify('./particles.frag')
const createRandom = require('@tatumcreative/random')

const {
  AdditiveBlending,
  BufferGeometry,
  BufferAttribute,
  Color,
  ImageUtils,
  Points,
  ShaderMaterial,
  PointsMaterial,
  DodecahedronGeometry
} = require('three')

function createMaterial ({color, range}) {
  return new ShaderMaterial({
    vertexShader,
    fragmentShader,
    blending: AdditiveBlending,
    depthTest: false,
    transparent: true,
    uniforms: {
      elapsed : { type: 'f' },
      texture : { type: 't' },
      color   : { type: "c", value: color },
      uRange  : { type: "f", value: range },
    }
  })
}

function createGeometry (material, {count, range, sizeRange, random}) {
  const geometry = new BufferGeometry()
  const positions = new Float32Array(count * 3)
  const sizes = new Float32Array(count)
  const offsets = new Float32Array(count)
  const ratio = window.devicePixelRatio;

  for(let i = 0; i < count; i++) {
    positions[i * 3 + 0] = random(-range, range)
    positions[i * 3 + 1] = random(-range, range) * 0.3
    positions[i * 3 + 2] = random(-range, range)

    sizes[ i ] = random(ratio * sizeRange[0], ratio * sizeRange[1])
    offsets[ i ] = random(0, 1)
  }

  geometry.addAttribute('position', new BufferAttribute(positions, 3))
  geometry.addAttribute('size', new BufferAttribute(sizes, 1))
  geometry.addAttribute('aOffset', new BufferAttribute(offsets, 1))

  return geometry
}

function createMesh (app, config, loadPromises) {
  const material = createMaterial(config)
  const geometry = createGeometry(material, config)
  const mesh = new Points(geometry, material)
  mesh.frustumCulled = false

  loadPromises.push(new Promise((resolve, reject) => {
    ImageUtils.loadTexture(
      "assets/bokeh.png",
      undefined,
      texture => {
        material.uniforms.texture.value = texture
        app.scene.add(mesh)
        resolve()
      },
      error => {
        reject("Unable to load the particle image.")
      })
  }))

  return mesh
}

function updater (mesh) {
  const elapsed = mesh.material.uniforms.elapsed
  return (time) => {
    elapsed.value = 100 + time
  }
}

module.exports = function particles(app, loadPromises) {
  const config = {
    count: 3000,
    color: new Color(0xffff11),
    range: 7,
    sizeRange: [0.5,1],
    random: createRandom("particles"),
  }

  const mesh = createMesh(app, config, loadPromises)
  app.scene.add(mesh)
  return {
    update: updater(mesh)
  }
}
