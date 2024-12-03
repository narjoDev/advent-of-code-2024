function splitToLines(input) {
  return input.split("\n");
}

function partOne(input) {
  splitToLines(input);
}

function partTwo(input) {
  splitToLines(input);
}

/*
export to wrapper file that:
- reads input from text file (using fs.readFileSync)
- passes that raw string as argument to partOne & partTwo
- outputs return values
- tests against answers if known
*/
module.exports = { partOne, partTwo };
