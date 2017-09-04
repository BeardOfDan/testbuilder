"use strict";

var detectNetwork = function (cardNumber) {
  let cards = [
    {
      "name": "Maestro",
      "prefixes": [
        "5018", "5020", "5038", "6304"
      ],
      "lengths": [12, 13, 14, 15, 16, 17, 18, 19]
    },
    {
      "name": "Discover",
      "prefixes": [
        "6011", "644", "645", "646", "647", "648", "649", "65"
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
      "name": "Visa",
      "prefixes": [
        "4"
      ],
      "lengths": [13, 16, 19]
    }, {
      "name": "MasterCard",
      "prefixes": [
        "51", "52", "53", "54", "55"
      ],
      "lengths": [16]
    }, {
      "name": "China UnionPay",
      "prefixes": ["622126-622925", "624-626", "6282-6288"],
      "lengths": [16, 17, 18, 19]
    }, {
      "name": "Switch",
      "prefixes": ["4903", "4905", "4911", "4936", "564182", "633110", "6333", "6759"],
      "lengths": [16, 18, 19]
    }
  ];

  // gets set to the value of the card's name below
  let result;
  // go through each card
  cards.forEach(function (card) {
    // for each length
    card.lengths.forEach(function (length) {
      // check if cardNumber.length matches
      if (cardNumber.length === length) {
        // go through each prefix
        let prefix = card.prefixes;
        for (let i = 0; i < prefix.length; i++) {
          let thisPrefix = prefix[i];

          if (cardNumber.slice(0, thisPrefix.length) === thisPrefix) {
            // test here if result already has a value
            // if so, test if the prefix for it is shorter than this one
            // if so, then replace it with this card
            result = card.name;
          }
        }
      }
    });
  });

  return result ? result : "Card not found! " + cardNumber;
}; // end of detectNetwork(cardNumber)

