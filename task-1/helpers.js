const fs = require("fs");
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

exports.alphabet = alphabet;
exports.isLetter = (letter) => !!(alphabet.indexOf(letter.toString().toLowerCase()) + 1);
exports.isUpperCase = (string) => /^[A-Z]*$/.test(string);

exports.isInput = (path) => {
  if (!fs.existsSync(path)) {
    process.stderr.write('Input file doesn\'t exist');
    process.exit(1);
  }
}
exports.isOutput = (path) => {
  if (!fs.existsSync(path)) {
    process.stderr.write('Output file doesn\'t exist');
    process.exit(1);
  }
}

exports.getData = (output) => fs.readFileSync(output, "utf8");
