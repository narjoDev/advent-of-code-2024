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
const FILES = {
  example: readFile(`${DIR}/input-example.txt`),
  actual: readFile(`${DIR}/input-actual.txt`),
};

const output = partOne(FILES.actual) + "\n" + partTwo(FILES.actual);
writeFile(`${DIR}/output.txt`, output);

module.exports = { FILES, partOne, partTwo };
