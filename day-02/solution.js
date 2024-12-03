function parseFile(file) {
  const lines = file.split("\n").map((line) => {
    return line.split(/\s+/).map(Number);
  });

  return lines;
}

function isSafe(line) {
  const firstDifferenceSign = Math.sign(line[1] - line[0]);

  //all adjacent differences are at least one and at most three
  for (let index = 1; index < line.length; index += 1) {
    let difference = line[index] - line[index - 1];

    if (Math.sign(difference) !== firstDifferenceSign) {
      return false;
    }

    difference = Math.abs(difference);
    if (difference < 1 || difference > 3) {
      return false;
    }
  }

  return true;
}

function partOne(file) {
  const lines = parseFile(file);

  return lines.reduce(
    (totalSafe, line) => totalSafe + (isSafe(line) ? 1 : 0),
    0
  );
}

function dampenerSafe(line) {
  if (isSafe(line)) {
    return true;
  }

  //naively try every possible deletion
  return line.some((_element, index) => {
    const prunedCandidate = [...line];
    prunedCandidate.splice(index, 1);
    return isSafe(prunedCandidate);
  });
}

function partTwo(file) {
  const lines = parseFile(file);

  return lines.reduce(
    (totalSafe, line) => totalSafe + (dampenerSafe(line) ? 1 : 0),
    0
  );
}

module.exports = { partOne, partTwo, isSafe };
