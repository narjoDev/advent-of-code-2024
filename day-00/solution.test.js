// imports

const { test, expect, describe } = require("@jest/globals");
const { readFile, writeFile } = require("../libs/file-operations");
const { partOne, partTwo } = require("./solution");

// example answers

//use the correct type here (probably an integer)
const EXAMPLE_ANSWERS = {
  // TODO:
  1: undefined,
  2: undefined,
};

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

// TESTS

const parts = [
  [1, partOne],
  [2, partTwo],
];

describe.each(parts)("Part %i Solution", (id, partFunction) => {
  test("example input", () => {
    //test with strict type checking
    expect(partFunction(INPUTS.example)).toStrictEqual(EXAMPLE_ANSWERS[id]);
  });

  test("actual input", () => {
    //this will fail until we verify and save a correct answer to answers.txt
    //test converted to string since we read answer from a file
    const computedString = String(partFunction(INPUTS.actual));
    writeFile(`${__dirname}/output${id}.txt`, computedString);

    expect(computedString).toStrictEqual(ANSWERS[id]);
  });
});
