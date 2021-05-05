const { Transform } = require("stream");

const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
const isLetter = (letter) => !!(alphabet.indexOf(letter.toString().toLowerCase()) + 1);
const newPosition = (currentPosition, shift) => {
  if (currentPosition + shift > alphabet.length) {
    return (currentPosition + shift) - alphabet.length - 1;
  } else return currentPosition + shift - 1;
}

let outString = '';

exports.createCaesarsCipherTransformer = (action, shift) =>
  new Transform({
    transform(chunk, encoding, callback) {
      if (action === 'encode') {
        [...chunk.toString()].forEach(e => {
          if ( isLetter(e) ) {
            let letterPosition = alphabet.indexOf(e.toLowerCase()) + 1;
            outString += alphabet[newPosition(letterPosition, shift)];
          } else {
            outString += e;
          }
        })

      } else if (action === 'decode') {

      }
      callback(null, outString);
    }
  })
