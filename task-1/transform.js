const { Transform } = require("stream");
const { isLetter, isUpperCase } = require('helpers');

const alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const newPosition = (currentPosition, shift) => {

  let position = (shift > alphabet.length) ? shift % alphabet.length : shift;

  if (shift >= 0) {

    if (currentPosition + position > alphabet.length) {
      return currentPosition + position - alphabet.length - 1;
    } else return currentPosition + position - 1;

  } else {

    if (currentPosition + position - 1 < 0) {
      return alphabet.length - currentPosition + position + 1;
    } else {
      return currentPosition + position - 1;
    }
  }
};

let outString = "";

exports.caesarsTransformer = (action, shift) =>
  new Transform({
    transform(chunk, encoding, callback) {
      let act = (action === 'encode') ? shift : -shift;

      [...chunk.toString()].forEach((e) => {
        if (isLetter(e)) {

          let letterPosition = alphabet.indexOf(e.toLowerCase()) + 1;

          outString += isUpperCase(e) ? alphabet[newPosition(letterPosition, act)].toUpperCase() : alphabet[newPosition(letterPosition, act)];

        } else {
          outString += e;
        }
      });
      callback(null, outString);
    },
  }
);
