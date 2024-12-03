function sum(array) {
  return array.reduce((acc, v) => acc + v, 0);
}

function evaluateMultiplication(instruction) {
  const operands = instruction.match(/\d+/g).map(Number);
  return operands[0] * operands[1];
}

function partOne(input) {
  //scan match valid sections
  const MULTIPLICATION_PATTERN = /mul\(\d+,\d+\)/g;
  const uncorrupted = input.match(MULTIPLICATION_PATTERN);

  //evaluate valid things
  const products = uncorrupted.map((instruction) =>
    evaluateMultiplication(instruction)
  );

  //add up
  return sum(products);
}

function partTwo(input) {
  // ignore instructions that have don't() after the most recent do()
  // split on do() then split those on don't
  const DO = "do()";
  const DONT = "don't()";

  const doSegments = input.split(DO);
  // (beginning defaults to on)

  const enabledSegments = doSegments.map((segment) => {
    const endIndex = segment.indexOf(DONT);
    return endIndex === -1 ? segment : segment.slice(0, endIndex);
  });

  // do not join the segments before parsing as that risks
  // hallucinating instructions that were separated before
  // e.g. `mul(5do(),4)` would erroneously become `mul(5,4)`
  // (or join with an instruction-invalid character)
  return sum(enabledSegments.map((segment) => partOne(segment)));
}

/*
export to wrapper file that:
- reads input from text file (using fs.readFileSync)
- passes that raw string as argument to partOne & partTwo
- outputs return values
- tests against answers if known
*/
module.exports = { partOne, partTwo };
