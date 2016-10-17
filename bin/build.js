const rollup = require('rollup')
const co = require('co')

let bundle

co(function* () {
  bundle = yield rollup.rollup({
    entry: 'src/index.js',
    cache: bundle,
    external: id => {
      return id === 'three'
    },
  })

  // Generate bundle + sourcemap
  const result = bundle.generate({
    // output format - 'amd', 'cjs', 'es', 'iife', 'umd'
    format: 'cjs'
  })

  yield bundle.write({
    format: 'cjs',
    dest: 'bundle.js'
  })
})
