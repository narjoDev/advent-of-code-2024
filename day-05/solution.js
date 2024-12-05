function parseRulesUpdates(input) {
  let [rawRules, updates] = input.split("\n\n");

  const rules = {}; //key comes before all elements in value array
  rawRules.split("\n").forEach((ruleLine) => {
    const [before, after] = ruleLine.split("|").map(Number);
    rules[before] ||= [];
    rules[before].push(after);
  });

  updates = updates.split("\n").map((update) => {
    return update.split(",").map(Number);
  });

  return { rules, updates };
}

function inRightOrder(update, rules) {
  //for each page, no page before it has to be after it
  for (let index = 0; index < update.length; index += 1) {
    const page = update[index];
    const mustBeAfter = rules[page];

    if (mustBeAfter) {
      const priors = update.slice(0, index);

      if (priors.some((prior) => mustBeAfter.includes(prior))) {
        return false;
      }
    }
  }

  return true;
}

function middleOf(array) {
  return array[Math.floor(array.length / 2)];
}

function partOne(input) {
  const { rules, updates } = parseRulesUpdates(input);
  const rightUpdates = updates.filter((update) => inRightOrder(update, rules));
  const middles = rightUpdates.map(middleOf);
  return middles.reduce((sum, number) => sum + number, 0);
}

function reorderUpdate(update, rules) {
  const newUpdate = [...update];
  while (!inRightOrder(newUpdate, rules)) {
    for (let index = 0; index < newUpdate.length; index += 1) {
      const page = newUpdate[index];
      const mustBeAfter = rules[page];
      if (!mustBeAfter) continue;

      const priors = newUpdate.slice(0, index);
      for (const priorIndex in priors) {
        const prior = priors[priorIndex];
        if (mustBeAfter.includes(prior)) {
          newUpdate.splice(priorIndex, 1);
          newUpdate.push(prior);
          break;
        }
      }
    }
  }
  return newUpdate;
}

function partTwo(input) {
  const { rules, updates } = parseRulesUpdates(input);
  const wrongUpdates = updates.filter((update) => !inRightOrder(update, rules));
  const rightedWrongs = wrongUpdates.map((update) =>
    reorderUpdate(update, rules)
  );
  const middles = rightedWrongs.map(middleOf);
  return middles.reduce((sum, number) => sum + number, 0);
}

/*
export to wrapper file that:
- reads input from text file (using fs.readFileSync)
- passes that raw string as argument to partOne & partTwo
- outputs return values
- tests against answers if known
*/
module.exports = { partOne, partTwo };
