"use strict";
/* jshint 
esversion: 6,
devel: true,
node: true,
-W097 
*/

// imports

const { test, expect, describe } = require("@jest/globals");
const { readFile, writeFile } = require("../libs/file-operations");
const { DAY, partOne, partTwo } = require("./solution");

// TODO: input example answers

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

describe("partOne", () => {
  test("input-example", () => {
    expect(partOne(INPUTS.example)).toStrictEqual(EXAMPLE_ANSWERS[1]);
  });
  test("input-actual", () => {
    const computedString = String(partOne(INPUTS.actual));
    writeFile(`${DIR}/output1.txt`, computedString);

    expect(computedString).toStrictEqual(ANSWERS[1]);
  });
});

describe("partTwo", () => {
  test("input-example", () => {
    expect(partTwo(INPUTS.example)).toStrictEqual(EXAMPLE_ANSWERS[2]);
  });
  test("input-actual", () => {
    const computedString = String(partTwo(INPUTS.actual));
    writeFile(`${DIR}/output2.txt`, computedString);

    expect(computedString).toStrictEqual(ANSWERS[2]);
  });
});
