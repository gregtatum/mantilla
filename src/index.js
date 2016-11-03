const setupApp = require('./setup-app')
const setupSound = require('./sound')
const setupSky = require('./sky')
const setupParametric = require('./parametric')
const setupCubes = require('./cubes')
const setupParticles = require('./particles')
const setupTextureLoading = require('./texture-loading')
const createTimer = require('./utils/timer')

function startAsyncLoader (fn) {
  const loadPromises = []
  // Wrap fn() in a promise, so that we can show an error message if there was a
  // problem with loading.
  loadPromises.push(new Promise(resolve => {
    fn(loadPromises)
    resolve()
  }))

  Promise.all(loadPromises).then(
    window.globalHideLoader,
    window.globalLoaderError
  )
}

startAsyncLoader(loadPromises => {
  const app = setupApp()

  // app.sound = setupSound(loadPromises)
  app.parametric = setupParametric(app)
  app.sky = setupSky(app)
  app.cubes = setupCubes(app)
  app.particles = setupParticles(app, loadPromises)
  // app.textureLoading = setupTextureLoading(app)

  Promise.all(loadPromises).then(() => {
    const timer = createTimer()

    ;(function loop() {
      timer.tick()
      const {time, dt} = timer

      if (app.sound) app.sound.update(time, dt)
      if (app.sky) app.sky.update(time, dt)
      if (app.cubes) app.cubes.update(time, dt)
      if (app.parametric) app.parametric.update(time, dt)
      if (app.particles) app.particles.update(time, dt)
      if (app.textureLoading) app.textureLoading.update(time, dt)

      app.renderer.render(app.scene, app.camera)
      requestAnimationFrame(loop)
    })()
  })
})
