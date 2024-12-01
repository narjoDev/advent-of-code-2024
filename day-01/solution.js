function parseToLists(file) {
  // get left and right lists
  let lines = file.split("\n");
  const left = [];
  const right = [];
  lines.forEach((line) => {
    let [leftNumber, rightNumber] = line.split(/\s+/).map((n) => Number(n));
    left.push(leftNumber);
    right.push(rightNumber);
  });
  return [left, right];
}

function partOne(file) {
  const [left, right] = parseToLists(file);
  //sort both lists to par up
  left.sort();
  right.sort();
  //convert each index to distance between the two(abs)
  let totalDistance = 0;
  for (let index = 0; index < left.length; index += 1) {
    totalDistance += Math.abs(left[index] - right[index]);
  }
  //some all distances
  return totalDistance;
  return;
}

function listToTally(array) {
  const count = {};
  array.forEach((value) => {
    count[value] = (count[value] ?? 0) + 1;
  });
  return count;
}

function partTwo(file) {
  const [left, right] = parseToLists(file);
  const rightTally = listToTally(right);

  let total = 0;
  left.forEach((v) => {
    total += v * (rightTally[v] ?? 0);
  });

  return total;
}

module.exports = { partOne, partTwo };
