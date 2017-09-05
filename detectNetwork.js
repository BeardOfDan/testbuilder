"use strict";

let cards = [
  {
    "name": "Maestro",
    "prefixes": [
      "5018", "5020", "5038", "6304"
    ],
    "lengths": [12, 13, 14, 15, 16, 17, 18, 19]
  }, {
    "name": "Discover",
    "prefixes": [
      "6011", "65"
    ],
    "ranges": [
      { "start": "644", "end": "649" }
    ],
    "lengths": [16, 19]
  }, {
    "name": "Diner's Club",
    "prefixes": [
      "38", "39"
    ],
    "lengths": [14]
  }, {
    "name": "American Express",
    "prefixes": [
      "34", "37"
    ],
    "lengths": [15]
  }, {
    "name": "Switch",
    "prefixes": ["4903", "4905", "4911", "4936", "564182", "633110", "6333", "6759"],
    "lengths": [16, 18, 19]
  },
  // Switch goes before Visa, so that it gets tested first, because they have
  // prefix overlap, and Switch has longer prefixes.
  // This could be done with .sort(), but then it would be an extra process running
  // every time, instead of it just being right the first time
  {
    "name": "Visa",
    "prefixes": [
      "4"
    ],
    "lengths": [13, 16, 19]
  }, {
    "name": "MasterCard",
    "prefixes": [],
    "ranges": [
      { "start": "51", "end": "55" }
    ],
    "lengths": [16]
  }, {
    "name": "China UnionPay",
    "prefixes": [],
    "ranges": [
      { "start": "622126", "end": "622925" },
      { "start": "624", "end": "626" },
      { "start": "6282", "end": "6288" }
    ],
    "lengths": [16, 17, 18, 19]
  }
];

var detectNetwork = function (cardNumber) {
  let result; // gets set to the value of the card's name below

  // filter by length
  let matchingCards = cards.filter(function (card) {
    return card.lengths.some(function (len) {
      return len === cardNumber.length;
    });
  });

  // if any matchingCards element has a range, check it for a match
  for (let i = 0; i < matchingCards.length; i++) {
    let card = matchingCards[i];
    if (card.ranges) {
      // check each of the ranges
      for (let j = 0; j < card.ranges.length; j++) {
        let range = card.ranges[j];

        let prefix = cardNumber.slice(0, range.start.length);
        let start = parseInt(range.start);
        let end = parseInt(range.end);
        if ((start <= prefix) && (end >= prefix)) {
          return card.name;
        }
      }
    }
  }

  // check by prefixes
  outermostLoop: for (let i = 0; i < matchingCards.length; i++) {
    let card = matchingCards[i];
    for (let j = 0; j < card.prefixes.length; j++) {
      let prefix = card.prefixes[j];
      let thisPrefix = cardNumber.slice(0, prefix.length);
      if (prefix === thisPrefix) {
        result = card.name;
        break outermostLoop; // no need to search anymore
      }
    }
  }

  return result ? result : "Card Network not found! " + cardNumber;
}; // end of detectNetwork(cardNumber)
