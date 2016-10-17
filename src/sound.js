import SoundcloudBadge from 'soundcloud-badge'

export default function setupSoundcloud() {
  return new Promise(function(resolve, reject) {
    SoundcloudBadge({
      client_id: '6057c9af862bf245d4c402179e317f52',
      song: 'https://soundcloud.com/odesza/say_my_name',
      dark: false,
      getFonts: true,
    }, function(err, src, data, div) {
      if (err) {
        return reject(err)
      }

      var audio = new Audio
      audio.src = src
      audio.play()

      resolve({src, data, div})
    })
  })
}
