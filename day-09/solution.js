function repeat(times, func) {
  for (let iter = 0; iter < times; iter += 1) {
    func();
  }
}

function diskMapToBlocks(input) {
  //files have ids zero indexed
  let fileId = 0;
  //first digit is a file
  let digitIsFile = true;
  const blocks = [];

  for (let digit of input) {
    digit = Number(digit);

    let toPush = null;
    if (digitIsFile) {
      toPush = fileId;
      fileId += 1;
    }

    //each digit is length of file or length of free space
    repeat(digit, () => blocks.push(toPush));

    digitIsFile = !digitIsFile;
  }
  return blocks;
}

function compact(blocks) {
  const compacted = [...blocks];

  while (true) {
    const firstOpen = compacted.indexOf(null);
    if (firstOpen === -1) break;

    let popped = null;
    while (popped === null) {
      popped = compacted.pop();
    }

    compacted.splice(firstOpen, 1, popped);
  }

  return compacted;
}

function checksumCallback(acc, element, index) {
  if (element === null) {
    return acc;
  } else {
    const product = element * index;
    return acc + product;
  }
}

function partOne(input) {
  const blocks = diskMapToBlocks(input);
  const compacted = compact(blocks);
  return compacted.reduce(checksumCallback, 0);
}

function diskMapToSizes(input) {
  const fileSizes = [];
  const openSizes = [];
  let nextIsFile = true;

  for (let digit of input) {
    digit = Number(digit);

    const target = nextIsFile ? fileSizes : openSizes;
    target.push(digit);

    nextIsFile = !nextIsFile;
  }

  return { fileSizes, openSizes };
}

function zip(array1, array2) {
  const zipped = [];
  //for this problem we can assume same lengths*
  for (let index = 0; index < array1.length; index += 1) {
    zipped.push(array1[index]);
    zipped.push(array2[index]);
  }

  // *array2 might be one shorter
  if (zipped.slice(-1)[0] === undefined) zipped.pop();

  return zipped;
}

function expand(blockDetails) {
  const blocks = [];

  blockDetails.forEach((details) => {
    const { size, id } = details;

    repeat(size, () => blocks.push(id));
  });

  return blocks;
}

function compactWhole(fileSizes, openSizes) {
  // each file index comes just before that open index
  // for each file size, find an open space
  // - of lesser index
  // - and lesser or equal size
  // we need to save the file's original index as that is its id
  //start a new array listing file size with id?
  //after moving things, zip them together?
  const fileDetails = fileSizes.map((size, index) => ({ size, id: index }));
  const openDetails = openSizes.map((size) => ({ size, id: null }));

  fileDetails.reduceRight((_acc, file) => {
    for (let index = 0; index < file.id; index += 1) {
      const candidate = openDetails[index];
      // FIXME: I forgot to consider fitting multiple things in an open space
      //so maybe my whole approach to part two is broken
      if (candidate.id === null && candidate.size >= file.size) {
        openDetails.splice(index, 1, file);
        break;
      }
    }
    return undefined;
  });

  return expand(zip(fileDetails, openDetails));
}

// function wholeFileChecksumCallback(sum, element, index) {}

function partTwo(input) {
  const { fileSizes, openSizes } = diskMapToSizes(input);
  const compacted = compactWhole(fileSizes, openSizes);
  return compacted.reduce(checksumCallback, 0);
}

/*
export to wrapper file that:
- reads input from text file (using fs.readFileSync)
- passes that raw string as argument to partOne & partTwo
- outputs return values
- tests against answers if known
*/
module.exports = { partOne, partTwo };
