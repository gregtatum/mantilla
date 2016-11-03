const SoundcloudBadge = require('soundcloud-badge')
const analyse = require('web-audio-analyser')

module.exports = function setupSoundcloud(loadPromises) {
  const sound = {
    update: () => {},
    waveform: undefined
  }

  loadPromises.push(new Promise(function(resolve) {
    SoundcloudBadge({
      client_id: '6057c9af862bf245d4c402179e317f52',
      // song: 'https://soundcloud.com/synaptyx/melancholia',
      song: 'https://soundcloud.com/synaptyx/thought-crime',
      dark: false,
      getFonts: true,
    }, function(err, src, data, div) {
      if (err) {
        console.error(err)
        return
      }

      var audio = new Audio
      audio.crossOrigin = 'Anonymous'
      audio.src = src
      audio.loop = true
      audio.addEventListener('canplay', () => {

        sound.analyserUtil = analyse(audio, { audible: true, stereo: false })
        audio.play()
        resolve()
        // sound.update = () => {
        //   sound.frequencies = sound.analyserUtil.frequencies()
        // }
      })
    })

  }))

  return sound
}
