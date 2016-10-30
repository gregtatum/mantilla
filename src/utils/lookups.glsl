// Float lookup.

float getPosition(in valueBuffer, uint modelPosition) {
  uint stride = 5;
  uint offset = 1;
  uint size = 32;
  uint floatSize = 4;

  uint lookupIndex4 = modelPosition * stride + offset;
  uint lookupIndex = uint(floor(float(lookupIndex4) / float(floatSize)));
  uint lookupOffset = lookupIndex4 % floatSize;
  uint lookupIndexW = lookupIndex / size;
  uint lookupIndexH = lookupIndex % size;

  vec4 value = texture2D(valueBuffer, vec2(lookupIndexW, lookupIndexH));

  return value[lookupOffset];
}

float get${capitalize(name)}(in valueBuffer, uint modelPosition) {
  uint stride = ${stride};
  uint offset = ${offset};
  uint size = ${size};
  uint floatSize = ${floatSize};

  uint lookupIndex4 = modelPosition * stride + offset;
  uint lookupIndex = uint(floor(float(lookupIndex4) / float(floatSize)));
  uint lookupOffset = lookupIndex4 % floatSize;
  uint lookupIndexW = lookupIndex / size;
  uint lookupIndexH = lookupIndex % size;

  vec4 value = texture2D(valueBuffer, vec2(lookupIndexW, lookupIndexH));

  return value[lookupOffset];
}
