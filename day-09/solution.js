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
  if (element === null || element === undefined) {
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

function diskMapToSections(input) {
  const sections = [];
  let nextIsFile = true;
  let nextId = 0;

  for (let digit of input) {
    digit = Number(digit);
    const toPush = { size: digit };

    if (nextIsFile) {
      toPush.id = nextId;
      nextId += 1;
    }

    sections.push(toPush);
    nextIsFile = !nextIsFile;
  }

  return sections;
}

function expand(blockDetails) {
  const blocks = [];

  blockDetails.forEach((details) => {
    const { size, id } = details;

    repeat(size, () => blocks.push(id));
  });

  return blocks;
}

function compactWhole(sections) {
  const lastId = sections.findLast((section) => section.id !== undefined).id;

  for (let fileId = lastId; fileId >= 0; fileId -= 1) {
    const fileIndex = sections.findIndex((section) => section.id === fileId);
    const file = sections[fileIndex];

    //find a place to put it
    for (let tryIndex = 0; tryIndex < fileIndex; tryIndex += 1) {
      const candidate = sections[tryIndex];

      if (candidate.id === undefined && candidate.size >= file.size) {
        const extra = candidate.size - file.size;

        candidate.size = extra; //mutating reassignment
        sections.splice(fileIndex, 1, { size: file.size });
        sections.splice(tryIndex, 0, file);
        break;
      }
    }
  }

  return sections;
}

function partTwo(input) {
  const sections = diskMapToSections(input);
  const compacted = compactWhole(sections);
  const expanded = expand(compacted);

  return expanded.reduce(checksumCallback, 0);
}

/*
export to wrapper file that:
- reads input from text file (using fs.readFileSync)
- passes that raw string as argument to partOne & partTwo
- outputs return values
- tests against answers if known
*/
module.exports = { partOne, partTwo };
