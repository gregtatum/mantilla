import setupApp from './app'
import setupSound from './sound'

;(function() {
  const app = setupApp()
  app.sound = setupSound()

  function loop() {
    app.renderer.render(app.scene, app.camera);
    requestAnimationFrame(loop)
  }
  loop()
})()
