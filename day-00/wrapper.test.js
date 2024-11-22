"use strict";
/* jshint 
esversion: 6,
devel: true,
node: true,
-W097 
*/

const { test, expect, describe } = require("@jest/globals");
const { FILES, partOne, partTwo } = require("./wrapper");

describe("partOne", () => {
  test("input-example correct answer", () => {
    expect(partOne(FILES.example)).toStrictEqual("Not Implemented");
  });
  // test("input-actual correct answer", () => {
  //   expect(partOne(FILES.actual)).toStrictEqual(null);
  // })
});

describe("partTwo", () => {
  test("input-example correct answer", () => {
    expect(partTwo(FILES.example)).toStrictEqual("Not Implemented");
  });
  // test("input-actual correct answer", () => {
  //   expect(partTwo(FILES.actual)).toStrictEqual(null);
  // })
});
