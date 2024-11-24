"use strict";
/* jshint 
esversion: 6,
devel: true,
node: true,
-W097 
*/

//imports
const { DAY, partOne, partTwo } = require(`./solution`);
const { readFile, writeFile } = require("../libs/file-operations");

//construct directory string
const dayPadded = DAY.toString().padStart(2, "0");
const DIR = `./day-${dayPadded}`;

//read input and answer files
const INPUTS = {
  actual: readFile(`${DIR}/input-actual.txt`),
  example: readFile(`${DIR}/input-example.txt`),
};

let answers = readFile(`${DIR}/answers.txt`).split("\n");
const ANSWERS = {
  1: answers[0],
  2: answers[1],
};

//run solutions on input
// FIXME: this duplicates the invocation in the test... move this to the test?
// FIXME: should this entire wrapper be in the test?
const partOneCalculatedAnswer = partOne(INPUTS.actual);
const partTwoCalculatedAnswer = partTwo(INPUTS.actual);

//write to file
const output = partOneCalculatedAnswer + "\n" + partTwoCalculatedAnswer;
writeFile(`${DIR}/output.txt`, output);

//export so tests can run
module.exports = { INPUTS, ANSWERS, partOne, partTwo };
