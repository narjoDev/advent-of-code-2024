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

function gcd(a, b) {
  const lesser = Math.min(a, b);

  let greatest = 1;
  for (let divisor = 2; divisor <= lesser; divisor += 1) {
    if (a % divisor === 0 && b % divisor === 0) {
      greatest = divisor;
    }
  }

  return greatest;
}

// eslint-disable-next-line max-lines-per-function, max-statements
function resonantAntiNodes(a, b, max) {
  let rowDelta = b.row - a.row;
  let colDelta = b.col - a.col;

  // determine if there is a lesser inline delta
  const deltaDivisor = gcd(rowDelta, colDelta);
  rowDelta = Math.round(rowDelta / deltaDivisor);
  colDelta = Math.round(colDelta / deltaDivisor);

  const antiNodes = [[a.row, a.col]];

  let row = a.row;
  let col = a.col;
  for (let steps = 1; ; steps += 1) {
    row -= rowDelta;
    col -= colDelta;
    if (row < 0 || col < 0 || row > max.row || col > max.col) {
      break;
    }

    antiNodes.push([row, col]);
  }

  row = a.row;
  col = a.col;
  for (let steps = 1; ; steps += 1) {
    row += rowDelta;
    col += colDelta;
    if (row < 0 || col < 0 || row > max.row || col > max.col) {
      break;
    }

    antiNodes.push([row, col]);
  }

  return antiNodes.map((node) => node.join(","));
}

function partTwo(input) {
  const lines = splitToLines(input);
  const maximums = { row: lines.length - 1, col: lines[0].length - 1 };
  const antennas = mapAntennas(lines);
  const antiNodes = new Set();
  for (const frequency in antennas) {
    eachPair(antennas[frequency], (a, b) => {
      const theseAntiNodes = resonantAntiNodes(a, b, maximums);
      theseAntiNodes.forEach((antiNode) => antiNodes.add(antiNode));
    });
  }
  return antiNodes.size;
}

/*
export to wrapper file that:
- reads input from text file (using fs.readFileSync)
- passes that raw string as argument to partOne & partTwo
- outputs return values
- tests against answers if known
*/
module.exports = { partOne, partTwo };
