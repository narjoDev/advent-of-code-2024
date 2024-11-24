// imports

const { test, expect, describe } = require("@jest/globals");
const { readFile, writeFile } = require("../libs/file-operations");
const { DAY, partOne, partTwo } = require("./solution");

// TODO: input example answers

//use the correct type here (probably an integer)
const EXAMPLE_ANSWERS = {
  1: undefined,
  2: undefined,
};

// read input and answer files

const dayPadded = DAY.toString().padStart(2, "0");
const DIR = `./day-${dayPadded}`;

const INPUTS = {
  actual: readFile(`${DIR}/input-actual.txt`),
  example: readFile(`${DIR}/input-example.txt`),
};

let answers = readFile(`${DIR}/answers.txt`).split("\n");
const ANSWERS = {
  1: answers[0],
  2: answers[1],
};

// TESTS

const PARTS = [
  { id: 1, partFunction: partOne },
  { id: 2, partFunction: partTwo },
];

PARTS.forEach((part) => {
  const { id, partFunction } = part;

  describe(`Part ${id} Solution`, () => {
    test("example input", () => {
      //test with strict type checking
      expect(partFunction(INPUTS.example)).toStrictEqual(EXAMPLE_ANSWERS[id]);
    });

    test("actual input", () => {
      //test converted to string since we read it from a file
      const computedString = String(partFunction(INPUTS.actual));
      writeFile(`${DIR}/output${id}.txt`, computedString);

      expect(computedString).toStrictEqual(ANSWERS[id]);
    });
  });
});
