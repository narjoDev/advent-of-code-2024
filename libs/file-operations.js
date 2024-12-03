const fs = require("node:fs");

//no error handling fails import loudly
const readFile = (filename) => fs.readFileSync(filename, "utf8");
const writeFile = (filename, content) => fs.writeFileSync(filename, content);

module.exports = { readFile, writeFile };
