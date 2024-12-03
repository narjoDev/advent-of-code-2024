function sum(array) {
  return array.reduce((acc, v) => acc + v, 0);
}

function evaluateMultiplication(instruction) {
  const operands = instruction.match(/\d+/g);
  return operands[0] * operands[1];
}

function partOne(input) {
  //scan match valid sections
  const uncorrupted = input.match(/mul\(\d+,\d+\)/g);
  //evaluate valid things
  const results = uncorrupted.map((instruction) =>
    evaluateMultiplication(instruction)
  );
  //add up
  return sum(results);
}

function partTwo(input) {
  // ignore instructions that have don't() after the most recent do()
  // split on do() then split those on don't
  const doSegments = input.split("do()");
  const enabledSegments = doSegments.map((segment) => {
    const split = segment.split("don't()");
    return split[0];
  });

  let operations = [];

  enabledSegments.forEach((segment) => {
    operations = operations.concat(segment.match(/mul\(\d+,\d+\)/g));
  });

  const results = operations.map((instruction) =>
    evaluateMultiplication(instruction)
  );

  return sum(results);
}

/*
export to wrapper file that:
- reads input from text file (using fs.readFileSync)
- passes that raw string as argument to partOne & partTwo
- outputs return values
- tests against answers if known
*/
module.exports = { partOne, partTwo };
