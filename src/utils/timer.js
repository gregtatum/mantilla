module.exports = function createTimer () {
  const startTime = Date.now()
  let prevTime = 0
  let now = Date.now()

  const timer = {
    tick: () => {
      timer.time = (Date.now() - startTime) / 1000
      timer.dt = Math.min(50, Math.max(16.66666, timer.time - prevTime))
    },
    time: 0,
    dt: 0
  }

  timer.tick()

  return timer
}
