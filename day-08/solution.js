const EMPTY = ".";

function splitToLines(input) {
  return input.split("\n");
}

function eachPair(array, callback) {
  //for each index not including last
  for (let left = 0; left < array.length - 1; left += 1) {
    //pair with each following index
    for (let right = left + 1; right < array.length; right += 1) {
      callback(array[left], array[right]);
    }
  }
}

function mapAntennas(lines) {
  const antennas = {};

  for (let row = 0; row < lines.length; row += 1) {
    for (let col = 0; col < lines[0].length; col += 1) {
      const frequency = lines[row][col];
      if (frequency !== EMPTY) {
        antennas[frequency] ||= [];
        antennas[frequency].push({ row, col });
      }
    }
  }

  return antennas;
}

function determineAntiNodes(a, b, max) {
  const rowDelta = b.row - a.row;
  const colDelta = b.col - a.col;

  let antiNodes = [
    [a.row - rowDelta, a.col - colDelta],
    [b.row + rowDelta, b.col + colDelta],
  ];

  antiNodes = antiNodes.filter((node) => {
    let [row, col] = node;
    return row >= 0 && col >= 0 && row <= max.row && col <= max.col;
  });

  //return as something I can put in a set
  return antiNodes.map((node) => node.join(","));
}

function partOne(input) {
  const lines = splitToLines(input);
  const maximums = { row: lines.length - 1, col: lines[0].length - 1 };
  //index non dot characters
  //classify by character
  const antennas = mapAntennas(lines);
  const antiNodes = new Set();
  //within each character class, for each pair:
  for (const frequency in antennas) {
    eachPair(antennas[frequency], (a, b) => {
      const theseAntiNodes = determineAntiNodes(a, b, maximums);
      theseAntiNodes.forEach((antiNode) => antiNodes.add(antiNode));
    });
  }
  //determine the anti nodes (filter inbounds)
  //add anti nodes to a set
  //get size of set
  return antiNodes.size;
}

function partTwo(input) {
  splitToLines(input);
}

/*
export to wrapper file that:
- reads input from text file (using fs.readFileSync)
- passes that raw string as argument to partOne & partTwo
- outputs return values
- tests against answers if known
*/
module.exports = { partOne, partTwo };
