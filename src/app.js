const {WebGLRenderer, Scene, PerspectiveCamera} = require('three')

module.exports = function setupApp() {
  const scene = new Scene();
  const camera = new PerspectiveCamera(75, 1, 1, 1000);
  const canvas = setupCanvas()
  const renderer = new WebGLRenderer({ canvas });

  setupResizeHandler(canvas, renderer, camera)
  return { scene, camera, canvas, renderer }
}

function setupCanvas () {
  const canvas = document.createElement('canvas')
  document.body.appendChild(canvas)
  Object.assign(canvas.style, {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: "0",
    left: "0"
  })
  return canvas
}

function setupResizeHandler(canvas, renderer, camera) {
  function size() {
    const ratio = window.devicePixelRatio
    const width = window.innerWidth
    const height = window.innerHeight
    renderer.setSize(width, height);
    renderer.setPixelRatio(ratio)
    camera.aspect = width / height
    camera.position.z = 5
  }
  size()
  window.addEventListener('resize', size, false)
}
