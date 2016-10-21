const setupApp = require('./app')
const setupSound = require('./sound')
const setupSky = require('./sky')
const setupParametric = require('./parametric')

;(function() {
  const app = setupApp()
  // app.sound = setupSound(app)
  app.sky = setupSky(app)
  app.parametric = setupParametric(app)

  ;(function loop() {
    // app.sound.update()
    app.sky.update()
    app.parametric.update()

    app.renderer.render(app.scene, app.camera)
    requestAnimationFrame(loop)
  })()
})()
