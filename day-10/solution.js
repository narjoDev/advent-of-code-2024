/*
Part One
Sum scores of each trailhead
- trailheads are `0`
- score is count of peaks it can reach
- peaks are `9`
- duplicate paths to the same peak do not stack
- a path goes from 0 to 9, up by 1 each step
- steps are vertical or horizontal common not diagonal

INPUT: (processed) grid of numbers
OUTPUT: number, sum of scores

DATA
grid of numbers, two-dimensional array
store set of peaks for each trailhead:
- object with trailhead keys and set of peaks
intermediate stepping through grid

ALGORITHM
constants for trailhead and peak digits
parse input to two dimensional array of numbers
identify coordinates of trailheads
iterate through trailheads
for each trailhead, trace all possible paths and populate peaks
- pathFind() helper
=>trails = { trailhead: Set(peaks) }
reduce sum size of sets

pathFind(grid, current) helper:
returns set of peaks (coordinates converted to string)
(recursive?)
aware of grid, start coordinates, current location
if current is peak returns self in set
fetch adjacents, coordinates and digit, for each:
- if is next digit, add pathFind(adjacent) to result set
returns set of results (unions of returned sets)
*/
const TRAILHEAD = 0;
const PEAK = 9;

function parseGrid(input) {
  return input.split("\n").map((line) => line.split("").map(Number));
}

function findTrailheads(grid) {
  //returns array of trailhead coordinates as [row, col]
  const trailheads = [];

  for (let row = 0; row < grid.length; row += 1) {
    for (let col = 0; col < grid[0].length; col += 1) {
      if (grid[row][col] === TRAILHEAD) {
        trailheads.push([row, col]);
      }
    }
  }

  return trailheads;
}

function neighbors(coordinates) {
  const [row, col] = coordinates;
  return [
    [row - 1, col],
    [row + 1, col],
    [row, col - 1],
    [row, col + 1],
  ];
}

function pathPeaks(grid, coordinates) {
  const [row, col] = coordinates;
  const here = grid[row][col];

  let peaks = new Set();

  if (here === PEAK) {
    peaks.add(coordinates.join(","));
  } else {
    const adjacents = neighbors(coordinates);

    adjacents.forEach((adjacentCoordinates) => {
      let [nextRow, nextCol] = adjacentCoordinates;

      if (grid[nextRow]?.[nextCol] === here + 1) {
        peaks = peaks.union(pathPeaks(grid, adjacentCoordinates));
      }
    });
  }

  return peaks;
}

function partOne(input) {
  const grid = parseGrid(input);
  const trailheads = findTrailheads(grid);
  const trails = {};

  for (const trailhead of trailheads) {
    const key = trailhead.join(",");
    trails[key] = pathPeaks(grid, trailhead);
  }

  return Object.values(trails).reduce((sum, set) => sum + set.size, 0);
}

/*
Part Two
now we care about distinct trails not distinct peaks
we can actually just return account when we find a peak
add them up
we can use the same traversal but return a number rather than set
*/

function pathRating(grid, coordinates) {
  const [row, col] = coordinates;
  const here = grid[row][col];

  if (here === PEAK) {
    return 1;
  } else {
    const adjacents = neighbors(coordinates);

    const branchRatings = adjacents.map((adjacentCoordinates) => {
      let [nextRow, nextCol] = adjacentCoordinates;

      if (grid[nextRow]?.[nextCol] === here + 1) {
        return pathRating(grid, adjacentCoordinates);
      } else {
        return 0;
      }
    });

    return branchRatings.reduce((sum, score) => sum + score, 0);
  }
}

function partTwo(input) {
  const grid = parseGrid(input);
  const trailheads = findTrailheads(grid);
  const ratings = trailheads.map((trailhead) => pathRating(grid, trailhead));

  return ratings.reduce((sum, score) => sum + score, 0);
}

/*
export to wrapper file that:
- reads input from text file (using fs.readFileSync)
- passes that raw string as argument to partOne & partTwo
- outputs return values
- tests against answers if known
*/
module.exports = { partOne, partTwo };
