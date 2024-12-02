function parseFile(file) {
  const lines = file.split("\n").map((line) => {
    return line.split(/\s+/).map((v) => parseInt(v, 10));
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
  let total = 0;

  lines.forEach((line) => {
    if (isSafe(line)) {
      total += 1;
    }
  });

  return total;
}

function dampenerSafe(line) {
  if (isSafe(line)) {
    return true;
  }

  //naively try every possible deletion
  for (let pruneIndex = 0; pruneIndex < line.length; pruneIndex += 1) {
    const prunedCandidate = [...line];
    prunedCandidate.splice(pruneIndex, 1);
    if (isSafe(prunedCandidate)) {
      return true;
    }
  }

  return false;
}

function partTwo(file) {
  const lines = parseFile(file);
  let total = 0;

  lines.forEach((line) => {
    if (dampenerSafe(line)) {
      total += 1;
    }
  });

  return total;
}

module.exports = { partOne, partTwo, isSafe };
