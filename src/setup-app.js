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

    // Fiddle with the FOV a bit for different sizes
    const targetFOV = 50
    const ratioBreakPoint = 1.5
    camera.fov = targetFOV
    if (width / height > ratioBreakPoint) {
      camera.fov = targetFOV * ratioBreakPoint * height / width
    }
    if (height / width > ratioBreakPoint) {
      camera.fov = targetFOV * ratioBreakPoint * width / height * 2
    }

    camera.updateProjectionMatrix()
  }
  size()
  window.addEventListener('resize', size, false)
}
