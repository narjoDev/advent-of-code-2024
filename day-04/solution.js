function splitToLines(input) {
  return input.split("\n");
}

function transpose(nestedArray) {
  const newArray = [];
  //for each column make it an array
  for (let column = 0; column < nestedArray[0].length; column += 1) {
    const newRow = [];
    for (let row = 0; row < nestedArray.length; row += 1) {
      newRow.push(nestedArray[row][column]);
    }

    newArray.push(newRow);
  }

  return newArray;
}

function countHorizontal(lines) {
  return lines.reduce((total, line) => {
    total += line.match(/XMAS/g)?.length ?? 0;
    total += line.match(/SAMX/g)?.length ?? 0;
    return total;
  }, 0);
}

function countVertical(lines) {
  const transposed = transpose(lines);
  return countHorizontal(transposed.map((array) => array.join("")));
}

function makeStartCoordinates(width, height) {
  let rowZeroes = "0".repeat(width).split("").map(Number);
  const startRowIndices = [...rowZeroes];
  for (let originalRow = 1; originalRow < height; originalRow += 1) {
    startRowIndices.push(originalRow);
  }

  const startColIndices = [];
  for (
    let originalColumn = width - 1;
    originalColumn > 0;
    originalColumn -= 1
  ) {
    startColIndices.push(originalColumn);
  }
  let columnZeroes = "0".repeat(height).split("").map(Number);
  startColIndices.push(...columnZeroes);

  return startRowIndices.map((row, index) => {
    return { row, col: startColIndices[index] };
  });
  // return { row: startRowIndices, col: startColIndices };
}

function toDiagonals(lines) {
  const width = lines[0].length;
  const height = lines.length;

  const starts = makeStartCoordinates(width, height);
  const diagonals = starts.map((start) => {
    const diagonal = [];
    let { row, col } = start;

    while (row < height && col < width) {
      diagonal.push(lines[row][col]);
      row += 1;
      col += 1;
    }
    return diagonal;
  });

  return diagonals;
}

function countBothDiagonals(lines) {
  const diagonalA = toDiagonals(lines);
  const diagonalB = toDiagonals([...lines].reverse());
  const diagonals = [...diagonalA, ...diagonalB].map((array) => array.join(""));
  return countHorizontal(diagonals);
}

function partOne(input) {
  const lines = splitToLines(input);
  let total = 0;

  total += countHorizontal(lines);
  total += countVertical(lines);
  total += countBothDiagonals(lines);

  return total;
}

function isXmasBox(box) {
  const center = box[1][1];
  if (center !== "A") {
    return false;
  }

  const [topLeft, , topRight] = box[0];
  const [bottomLeft, , bottomRight] = box[2];
  const corners = topLeft + topRight + bottomLeft + bottomRight;
  if (
    corners.match(/M/g)?.length !== 2 ||
    corners.match(/S/g)?.length !== 2 ||
    topLeft === bottomRight
  ) {
    return false;
  }

  return true;
}

function partTwo(input) {
  const lines = splitToLines(input);
  let total = 0;
  //for each three by three box
  const BOX_SIZE = 3;
  for (let row = 0; row <= lines.length - BOX_SIZE; row += 1) {
    for (let col = 0; col <= lines[0].length - BOX_SIZE; col += 1) {
      const box = [];
      for (let rowOffset = 0; rowOffset < BOX_SIZE; rowOffset += 1) {
        const slice = lines[row + rowOffset].slice(col, col + BOX_SIZE);
        box.push(slice);
      }
      if (isXmasBox(box)) {
        total += 1;
      }
    }
  }

  return total;
}

/*
export to wrapper file that:
- reads input from text file (using fs.readFileSync)
- passes that raw string as argument to partOne & partTwo
- outputs return values
- tests against answers if known
*/
module.exports = { partOne, partTwo, transpose, toDiagonals, isXmasBox };
