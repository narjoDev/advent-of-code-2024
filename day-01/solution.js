function partOne(file) {
  // get left and right lists
  let lines = file.split("\n");
  const left = [];
  const right = [];
  lines.forEach((line) => {
    let [leftNumber, rightNumber] = line.split(/\s+/).map((n) => Number(n));
    left.push(leftNumber);
    right.push(rightNumber);
  });
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

function partTwo(file) {
  return;
}

module.exports = { partOne, partTwo };
