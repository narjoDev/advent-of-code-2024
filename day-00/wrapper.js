"use strict";
/* jshint 
esversion: 6,
devel: true,
node: true,
-W097 
*/

const { DAY, partOne, partTwo } = require(`./solution`);
const { readFile, writeFile } = require("../libs/file-operations");

const dayPadded = DAY.toString().padStart(2, "0");
const DIR = `./day-${dayPadded}`;

const INPUTS = {
  actual: readFile(`${DIR}/input-actual.txt`),
  example: readFile(`${DIR}/input-example.txt`),
};

let answers = readFile(`${DIR}/answer.txt`).split("\n");
const ANSWERS = {
  1: answers[0],
  2: answers[1],
};

const output = partOne(INPUTS.actual) + "\n" + partTwo(INPUTS.actual);
writeFile(`${DIR}/output.txt`, output);

module.exports = { INPUTS, ANSWERS, partOne, partTwo };
