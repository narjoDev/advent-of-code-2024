"use strict";
/* jshint 
esversion: 6,
devel: true,
node: true,
-W097 
*/

const fs = require("node:fs");

function readFile(filename) {
  try {
    const data = fs.readFileSync(filename, "utf8");
    return data;
  } catch (error) {
    console.error(error);
  }
}

function writeFile(filename, content) {
  try {
    fs.writeFileSync(filename, content);
    // file written successfully
  } catch (err) {
    console.error(err);
  }
}

module.exports = { readFile, writeFile };
