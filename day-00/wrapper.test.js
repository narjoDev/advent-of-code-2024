"use strict";
/* jshint 
esversion: 6,
devel: true,
node: true,
-W097 
*/

const { test, expect, describe } = require("@jest/globals");
const { INPUTS, ANSWERS, partOne, partTwo } = require("./wrapper");

describe("partOne", () => {
  test("input-example correct answer", () => {
    expect(partOne(INPUTS.example)).toStrictEqual("Not Implemented");
  });
  // test("input-actual correct answer", () => {
  //   expect(partOne(INPUTS.actual)).toStrictEqual(ANSWERS[1]);
  // });
});

describe("partTwo", () => {
  test("input-example correct answer", () => {
    expect(partTwo(INPUTS.example)).toStrictEqual("Not Implemented");
  });
  // test("input-actual correct answer", () => {
  //   expect(partTwo(INPUTS.actual)).toStrictEqual(ANSWERS[2]);
  // })
});
