function splitToLines(input) {
  return input.split("\n").map((line) => {
    let [testValue, operands] = line.split(":");
    testValue = Number(testValue);
    operands = operands.trim().split(/\s+/).map(Number);
    return { testValue, operands };
  });
}

const opAdd = (a, b) => a + b;
const opMulti = (a, b) => a * b;
const opConcat = (a, b) => Number(String(a) + String(b));

function canBeTrue(line, operations) {
  const { testValue, operands } = line;
  const [first, second, ...rest] = operands;

  if (rest.length === 0) {
    return operations.some((op) => op(first, second) === testValue);
  } else {
    return operations.some((op) => {
      const result = op(first, second);
      const ifUseOp = { testValue, operands: [result].concat(rest) };
      return canBeTrue(ifUseOp, operations);
    });
  }
}

function partOne(input, operations = [opAdd, opMulti]) {
  const lines = splitToLines(input);
  const possibleLines = lines.filter((line) => canBeTrue(line, operations));

  return possibleLines.reduce((sum, line) => {
    return sum + line.testValue;
  }, 0);
}

function partTwo(input) {
  const operations = [opAdd, opMulti, opConcat];
  return partOne(input, operations);
}

/*
export to wrapper file that:
- reads input from text file (using fs.readFileSync)
- passes that raw string as argument to partOne & partTwo
- outputs return values
- tests against answers if known
*/
module.exports = { partOne, partTwo };
