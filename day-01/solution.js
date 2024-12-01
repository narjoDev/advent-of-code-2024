function parseToLists(file) {
  let lines = file.split("\n");
  const leftList = [];
  const rightList = [];

  lines.forEach((line) => {
    let [left, right] = line.split(/\s+/).map((str) => Number(str));
    leftList.push(left);
    rightList.push(right);
  });

  return [leftList, rightList];
}

function partOne(file) {
  const [left, right] = parseToLists(file);

  //sort both lists to pair up
  left.sort();
  right.sort();

  //convert each index to distance between the two (abs)
  //sum all distances
  let totalDistance = 0;
  for (let index = 0; index < left.length; index += 1) {
    totalDistance += Math.abs(left[index] - right[index]);
  }

  return totalDistance;
}

function tally(array) {
  const tallies = {};
  array.forEach((value) => {
    tallies[value] = (tallies[value] ?? 0) + 1;
  });

  return tallies;
}

function partTwo(file) {
  const [left, right] = parseToLists(file);
  const rightTally = tally(right);

  let totalSimilarity = 0;
  left.forEach((number) => {
    totalSimilarity += number * (rightTally[number] ?? 0);
  });

  return totalSimilarity;
}

module.exports = { partOne, partTwo };
