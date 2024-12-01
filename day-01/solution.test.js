// imports

const { test, expect, describe } = require("@jest/globals");
const { readFile, writeFile } = require("../libs/file-operations");
const { partOne, partTwo } = require("./solution");

// read input and answer files

const INPUTS = {
  actual: readFile(`${__dirname}/input-actual.txt`),
  example: readFile(`${__dirname}/input-example.txt`),
};

let answers = readFile(`${__dirname}/answers.txt`).split("\n");
const ANSWERS = {
  1: answers[0],
  2: answers[1],
};

// example answers

//use the correct type here (probably a number)
const EXAMPLE_ANSWERS = {
  1: 11,
  2: 31,
};

// TESTS

// helpers

describe("Helper: PLACEHOLDER", () => {
  test("PLACEHOLDER", () => {
    const computed = undefined;
    expect(computed).toStrictEqual(undefined);
  });
});

// full solutions

describe.each([
  [1, partOne],
  [2, partTwo],
])("Part %i Solution", (id, partFunction) => {
  test("example input", () => {
    const computed = partFunction(INPUTS.example);
    //test with strict type checking
    expect(computed).toStrictEqual(EXAMPLE_ANSWERS[id]);
  });

  test("actual input", () => {
    //this will fail until we save a correct answer to answers.txt
    //convert computed solution to string since we read answer from a file
    const computedString = String(partFunction(INPUTS.actual));

    //output for easy copy pasting
    writeFile(`${__dirname}/output${id}.txt`, computedString);

    expect(computedString).toStrictEqual(ANSWERS[id]);
  });
});
