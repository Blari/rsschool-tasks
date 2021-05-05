const { Transform } = require("stream");

exports.createCaesarsCipherTransformer = (action, shift) =>
  new Transform({
    transform(chunk, encoding, callback) {
      const inputString = chunk.toString().toUpperCase();

      callback(null, inputString);
    }
  })
