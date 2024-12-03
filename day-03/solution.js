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
  const products = uncorrupted.map((instruction) =>
    evaluateMultiplication(instruction)
  );

  //add up
  return sum(products);
}

function partTwo(input) {
  // ignore instructions that have don't() after the most recent do()
  // split on do() then split those on don't
  const doSegments = input.split("do()");

  const enabledSegments = doSegments.map((segment) => {
    const split = segment.split("don't()");
    return split[0]; // first element is before any "don't()"
  });

  let operations = [];
  enabledSegments.forEach((segment) => {
    operations = operations.concat(segment.match(/mul\(\d+,\d+\)/g));
  });

  const products = operations.map((instruction) =>
    evaluateMultiplication(instruction)
  );

  return sum(products);
}

/*
export to wrapper file that:
- reads input from text file (using fs.readFileSync)
- passes that raw string as argument to partOne & partTwo
- outputs return values
- tests against answers if known
*/
module.exports = { partOne, partTwo };
