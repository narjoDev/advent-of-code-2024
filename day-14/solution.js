/*
positions and velocities, p & v
x,y represent horizontal, vertical from top left
col,row
actual input space WIDTH: 101, HEIGHT: 103
example WIDTH: 11, HEIGHT: 7
robots teleport to wrap around the edges
- (newPosition + max) % max
where will robot be after 100 seconds?
divide into quadrants, discarding middle row/column
count number of robots in each quadrant
calculate product of quadrant counts = safety factor

SIMULATE ONE HUNDRED SECONDS THEN INTROSPECT
- parse input to array of objects for robots
- no need to retain old information, can mutate with each step
- We don't need a grid, we can move robots using:
  - position, velocity, size of space
  - array map with a helper to step each robot
- helper determines quadrant based on position
- reduce array to quadrant tally object
*/
const STEPS_TO_SIMULATE = 100;
const ACTUAL_INPUT_SIZE = 500;
let isActualInput; //determine actual or example input

function getDimensions() {
  return isActualInput ? { width: 101, height: 103 } : { width: 11, height: 7 };
}

function inputToRobots(input) {
  return input.split("\n").map((line) => {
    const regex = /^p=(-?\d+,-?\d+) v=(-?\d+,-?\d+)$/;
    const [, position, velocity] = line.match(regex).map((xyString) => {
      const [x, y] = xyString.split(",").map(Number);
      return { x, y };
    });
    return { position, velocity };
  });
}

function stepRobot({ position, velocity }) {
  const { width, height } = getDimensions();
  const x = (position.x + velocity.x + width) % width;
  const y = (position.y + velocity.y + height) % height;
  //possibly we could take all steps here
  return { position: { x, y }, velocity };
}

function quadrantOf({ position }) {
  const { x, y } = position;
  const { width, height } = getDimensions();
  const middleX = Math.floor(width / 2);
  const middleY = Math.floor(height / 2);
  if (x === middleX || y === middleY) {
    return null;
  } else {
    const xSign = Math.sign(x - middleX);
    const ySign = Math.sign(y - middleY);
    return String(xSign) + String(ySign);
  }
}

function partOne(input) {
  let robots = inputToRobots(input);
  isActualInput = robots.length === ACTUAL_INPUT_SIZE;

  for (let step = 1; step <= STEPS_TO_SIMULATE; step += 1) {
    robots = robots.map(stepRobot);
  }

  const quadrantTallies = robots.reduce((tally, robot) => {
    const quadrant = quadrantOf(robot);
    if (quadrant) {
      tally[quadrant] ||= 0;
      tally[quadrant] += 1;
    }
    return tally;
  }, {});

  return Object.values(quadrantTallies).reduce((a, b) => a * b);
}

function partTwo(input) {
  inputToRobots(input);
}

/*
export to wrapper file that:
- reads input from text file (using fs.readFileSync)
- passes that raw string as argument to partOne & partTwo
- outputs return values
- tests against answers if known
*/
module.exports = { partOne, partTwo };
