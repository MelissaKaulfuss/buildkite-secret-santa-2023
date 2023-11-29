const shuffleSeed = require('shuffle-seed');

const domain = 'buildkite.com';

const people = {
  Baz: `chris@${domain}`,
  Ben: `ben@${domain}`,
  Brett: `brett@${domain}`,
  Chris: `chris.c@${domain}`,
  Hannah: `hannah@${domain}`,
  Mel: `mel@${domain}`,
  MHz: `michelle@${domain}`,
  Michael: `michael@${domain}`,
  Mitch: `mitch@${domain}`,
}

// Takes a seed and list of hints, and returns the secret santa list
//
// Example:
//
//   secretSanta(42, {
//     Baz:     { hint: 'Baz's hint',     address: 'Baz's address' },
//     Ben:     { hint: 'Ben's hint',     address: 'Ben's address' },
//     Brett:   { hint: 'Brett's hint',   address: 'Brett's address' },
//     Chris:   { hint: 'Chris's hint',   address: 'Chris's address' },
//     Hannah:  { hint: 'Hannah's hint',  address: 'Hannah's address' },
//     Mel:     { hint: 'Mel's hint',     address: 'Mel's address' },
//     MHz:     { hint: 'MHz's hint',     address: 'MHz's address' },
//     Michael: { hint: 'Michael's hint', address: 'Michael's address' },
//     Mitch:   { hint: 'Mitch's hint',   address: 'Mitch's address' },
//   })
//
//   returns:
//
//   [
//     { name: 'Baz',     email: '...', received: { name: 'Mitch',   hint: 'Mitch's hint',   address: 'Mitch's address' } },
//     { name: 'Ben',     email: '...', received: { name: 'Michael', hint: 'Michael's hint', address: 'Michael's address' } },
//     { name: 'Brett',   email: '...', received: { name: 'MHz',     hint: 'MHz's hint',     address: 'MHz's address' } },
//     { name: 'Chris',   email: '...', received: { name: 'Mel',     hint: 'Mel's hint',     address: 'Mel's address' } },
//     { name: 'Hannah',  email: '...', received: { name: 'Chris',   hint: 'Chris's hint',   address: 'Chris's address' } },
//     { name: 'Mel',     email: '...', received: { name: 'Brett',   hint: 'Brett's hint',   address: 'Brett's address' } },
//     { name: 'MHz',     email: '...', received: { name: 'Ben',     hint: 'Ben's hint',     address: 'Ben's address' } },
//     { name: 'Michael', email: '...', received: { name: 'Baz',     hint: 'Baz's hint',     address: 'Baz's address' } },
//     { name: 'Mitch',   email: '...', received: { name: 'Hannah',  hint: 'Hannah's hint',  address: 'Hannah's address' } },
//   ]
exports.calculate = function(seed, answers) {
  if (!answers) return;

  const shuffledNames = shuffleSeed.shuffle(Object.keys(people), seed);

  return shuffledNames.map((name, index) => {
    const receivedName = shuffledNames[index + 1] || shuffledNames[0]
    const answer = answers[receivedName];

    if (!answer) {
      throw new Error(`Missing answer for ${receivedName}`);
    }

    if (!answer.hint) {
      throw new Error(`Missing hint for ${receivedName}`);
    }

    if (!answer.address) {
      throw new Error(`Missing address for ${receivedName}`);
    }

    return {
      name: name,
      email: people[name],
      received: {
        name: receivedName,
        hint: answer.hint,
        address: answer.address
      }
    };
  }, {})
}

exports.message = function(listItem) {
  return `Hi!\n\n` +
    `You received:\n${listItem.received.name}\n\n` +
    `Their xmas pressie hint:\n${listItem.received.hint}\n\n` +
    `Their delivery address:\n${listItem.received.address}\n\n` +
    `Lots of love,\nSanta’s Magical Unicorns`;
}