function createTexture (modelCount, values) {
  const FLOATS_PER_RGBA = 4;
  const width = nearestPowerOfTwo(modelCount * floatsPerModel / FLOATS_PER_RGBA)
  const texture = new DataTexture(new Float32Array(), width, width)

  texture.format = RGBAFormat
  texture.type = FloatType
  texture.wrapS = ClampToEdgeWrapping
  texture.wrapT = ClampToEdgeWrapping
  texture.magFilter = NearestNeighbor
  texture.minFilter = NearestNeighbor
  texture.generateMipmaps = false

  const valuesInterface = {}
  const stride = values.reduce((a, b) => a + b)
  let i = 0

  for (let name in values) {
    let valueIndex = 0
    if (values.hasOwnProperty(name)) {
      const valueLength = values[name]

      let type = 'unknownType'
      switch (valueLength) {
        case 1: type = 'float'; break
        case 2: type = 'vec2'; break
        case 3: type = 'vec3'; break
        case 4: type = 'vec4'; break
        case 16: type = 'mat4'; break
      }


      valuesInterface[name] = valueLength === 1
        ? {
          get: oneValueInBufferGetter(buffer, stride, valueIndex),
          set: oneValueInBufferSetter(buffer, stride, valueIndex),
          glsl: `TODO`
        }
        : {
          get: arrayValueInBufferGetter(buffer, stride, valueIndex, size),
          set: arrayValueInBufferSetter(buffer, stride, valueIndex, size),
          glsl: (() => {
            for (let i = 0; i < array.length; i++) {

            }
          })()
        }
      valueIndex += valueLength
      i++
    }
  }

  return valuesInterface
}

function oneValueInBufferGetter (buffer, stride, valueIndex) {
  return (modelNumber) => buffer[stride * modelNumber + valueIndex]
}

function oneValueInBufferSetter (buffer, stride, valueIndex) {
  return (modelNumber, value) => buffer[stride * modelNumber + valueIndex] = value
}

function arrayValueInBufferGetter (buffer, stride, valueIndex, size) {
  return (modelNumber, target = []) => {
    const offset = stride * modelNumber + valueIndex
    for (let i = 0; i < size; i++) {
      target[i] = buffer[offset + i]
    }
  }
}

function arrayValueInBufferSetter (buffer, stride, valueIndex, size) {
  return (modelNumber, value) => {
    const offset = stride * modelNumber + valueIndex
    for (let i = 0; i < size; i++) {
      buffer[offset + i] = value[i]
    }
  }
}
