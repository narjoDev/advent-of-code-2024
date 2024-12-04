// imports

const { test, expect, describe } = require("@jest/globals");
const { readFile, writeFile } = require("../libs/file-operations");
const {
  partOne,
  partTwo,
  transpose,
  toDiagonals,
  isXmasBox,
} = require("./solution");

// read input and answer files

const INPUTS = {
  actual: readFile(`${__dirname}/input-actual.txt`),
  example1: readFile(`${__dirname}/example1.txt`),
  example2: readFile(`${__dirname}/example2.txt`),
};

let answers = readFile(`${__dirname}/answers.txt`).split("\n");
const ANSWERS = {
  1: answers[0],
  2: answers[1],
};

// example answers

//use the correct type here (probably a number)
const EXAMPLE_ANSWERS = {
  1: 18,
  2: 9,
};

// TESTS

// helpers

describe("Helper: transpose", () => {
  test("transpose", () => {
    const input = [
      [0, 1],
      [2, 3],
    ];
    const computed = transpose(input);
    expect(computed[0][0]).toStrictEqual(0);
    expect(computed[0][1]).toStrictEqual(2);
    expect(computed[1][0]).toStrictEqual(1);
    expect(computed[1][1]).toStrictEqual(3);
  });
});

describe("Helper: toDiagonals", () => {
  test("toDiagonals", () => {
    const input = [
      [0, 1],
      [2, 3],
    ];
    const computed = toDiagonals(input);
    // [ [1], [0, 3], [2] ]
    expect(computed[0][0]).toStrictEqual(1);
    expect(computed[1][0]).toStrictEqual(0);
    expect(computed[1][1]).toStrictEqual(3);
    expect(computed[2][0]).toStrictEqual(2);
  });
});

describe("Helper: isXmasBox", () => {
  test("isXmasBox: true", () => {
    const input = ["M.S", ".A.", "M.S"];
    const computed = isXmasBox(input);
    expect(computed).toStrictEqual(true);
  });
  test("isXmasBox: false", () => {
    const input = ["M.S", ".A.", "S.M"];
    const computed = isXmasBox(input);
    expect(computed).toStrictEqual(false);
  });
});

// full solutions

describe.each([
  [1, partOne],
  [2, partTwo],
])("Part %i Solution", (id, partFunction) => {
  test("example input", () => {
    const computed = partFunction(INPUTS[`example${id}`]);
    //test with strict type checking
    expect(computed).toStrictEqual(EXAMPLE_ANSWERS[id]);
  });

  test("actual input", () => {
    //this will fail until we save a correct answer to answers.txt
    //convert computed solution to string since we read answer from a file
    const computedString = String(partFunction(INPUTS.actual));

    //output for easy copy pasting
    //must do this before the assertion fails or it gets skipped
    writeFile(`${__dirname}/output${id}.txt`, computedString);

    expect(computedString).toStrictEqual(ANSWERS[id]);
  });
});
