#!/usr/bin/env node
const fs = require('fs');
const { pipeline } = require('stream');
const { program } = require('commander');
const { caesarsTransformer } = require('./transform')
const { isInput, isOutput } = require('./helpers')

program
  .requiredOption('-s, --shift <integer>', 'a shift')
  .option('-i, --input <string>', 'an input file')
  .option('-o, --output <string>', 'an output file')
  .requiredOption('-a, --action <string>', 'an action encode/decode');

program.parse(process.argv);
const options = program.opts();

const input = options.input;
const output = options.output;
const action = options.action;
const shift = options.shift;

isInput(input);
isOutput(output);

const write = output ? fs.createWriteStream(output, 'utf8') : '';
const read = input ? fs.createReadStream(input, 'utf8') : '';

pipeline (
  input ? read : process.stdin,
  caesarsTransformer(action, +shift, output),
  output ? write : process.stdout,
  (error) => {
    error ? console.error('Pipeline failed', error) : console.log('Encode/Decode succeeded')
  }
)
