const OBSTACLE = "#";
const VISITED = "X";
const GUARD = "^";
const START_DIRECTION = "up";

const nextDirection = {
  up: "right",
  right: "down",
  down: "left",
  left: "up",
};

const indexOffsets = {
  up: { rowDelta: -1, colDelta: 0 },
  down: { rowDelta: 1, colDelta: 0 },
  right: { rowDelta: 0, colDelta: 1 },
  left: { rowDelta: 0, colDelta: -1 },
};

function splitToGrid(input) {
  return input.split("\n").map((line) => line.split(""));
}

function locateAndMarkGuard(grid) {
  let guard;
  for (const row in grid) {
    for (const col in grid[row]) {
      if (grid[row][col] === GUARD) {
        grid[row][col] = VISITED;
        guard = {
          direction: START_DIRECTION,
          location: { row: Number(row), col: Number(col) },
        };
        break;
      }
    }
    if (guard) break;
  }

  return guard;
}

function makeStep(grid, guard) {
  const {
    direction,
    location: { row, col },
  } = guard;

  // check next coordinate
  const { rowDelta, colDelta } = indexOffsets[direction];
  const nextSpot = { row: row + rowDelta, col: col + colDelta };
  const nextTerrain = grid[nextSpot.row]?.[nextSpot.col];

  //if out of bounds, replace and done
  if (nextTerrain === undefined) {
    grid[row][col] = VISITED;
    return true;
  } else if (nextTerrain === OBSTACLE) {
    guard.direction = nextDirection[direction];
    return false;
  } else {
    //is clear
    grid[row][col] = VISITED;
    guard.location = nextSpot;
    return false;
  }
}

function countVisited(grid) {
  return grid.reduce((sum, row) => {
    return (
      sum +
      row.reduce((rowSum, spot) => {
        return rowSum + (spot === VISITED ? 1 : 0);
      }, 0)
    );
  }, 0);
}

function stepTillExit(grid, guard) {
  while (true) {
    const complete = makeStep(grid, guard);
    if (complete === true) break;
  }
}

function partOne(input) {
  const grid = splitToGrid(input);
  const guard = locateAndMarkGuard(grid);

  stepTillExit(grid, guard);

  return countVisited(grid);
}

function obstructionCandidates(input) {
  const grid = splitToGrid(input);
  const guard = locateAndMarkGuard(grid);
  const { row: startRow, col: startCol } = guard.location;

  stepTillExit(grid, guard);

  //visited indices excluding the start location
  const candidates = [];
  for (let row = 0; row < grid.length; row += 1) {
    for (let col = 0; col < grid[0].length; col += 1) {
      if (
        grid[row][col] === VISITED &&
        (row !== startRow || col !== startCol)
      ) {
        candidates.push({ row, col });
      }
    }
  }

  return candidates;
}

function gridLoops(grid, guard) {
  let isLoop = false;
  const priorStates = new Set();

  while (true) {
    const complete = makeStep(grid, guard);
    if (complete === true) break;

    const state = JSON.stringify(guard);
    if (priorStates.has(state)) {
      isLoop = true;
      break;
    } else {
      priorStates.add(state);
    }
  }

  return isLoop;
}

function partTwo(input) {
  //obstruction candidates are all visited locations
  const candidates = obstructionCandidates(input);

  //TRY ALL CANDIDATES (smarter way?)
  let validLocations = 0;
  for (const obstacle of candidates) {
    const grid = splitToGrid(input);
    const guard = locateAndMarkGuard(grid);

    grid[obstacle.row][obstacle.col] = OBSTACLE;
    if (gridLoops(grid, guard)) {
      validLocations += 1;
    }
  }

  return validLocations;
}

/*
export to wrapper file that:
- reads input from text file (using fs.readFileSync)
- passes that raw string as argument to partOne & partTwo
- outputs return values
- tests against answers if known
*/
module.exports = { partOne, partTwo };
