#!/usr/bin/env node
const fs = require('fs');
const { pipeline } = require('stream');
const { program } = require('commander');
const { createCaesarsCipherTransformer } = require('./transform')
program.version('0.0.1');

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

const write = fs.createWriteStream(output, 'utf8');
const read = fs.createReadStream(input, 'utf8');

pipeline(
  read,
  createCaesarsCipherTransformer(action, +shift),
  write,
  (error) => {
    error ? console.error('Pipeline failed', error) : console.log('Encode/Decode succeeded')
  }
)
