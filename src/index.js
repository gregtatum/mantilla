const setupApp = require('./app')
const setupSound = require('./sound')
const setupSky = require('./sky')
const setupParametric = require('./parametric')
const setupCubes = require('./cubes')
const setupTextureLoading = require('./texture-loading')

;(function() {
  const app = setupApp()
  // app.sound = setupSound(app)
  app.sky = setupSky(app)
  app.cubes = setupCubes(app)
  // app.parametric = setupParametric(app)

  // app.textureLoading = setupTextureLoading(app)

  const startTime = Date.now()
  let prevTime = 0
  ;(function loop() {

    const time = Date.now() - startTime
    dt = Math.min(50, Math.max(16.66666, time - prevTime))

    // app.sound.update()
    // app.sky.update()
    app.cubes.update()
    // app.parametric.update()

    // app.textureLoading.update(time, dt)

    app.renderer.render(app.scene, app.camera)
    requestAnimationFrame(loop)
  })()
})()
