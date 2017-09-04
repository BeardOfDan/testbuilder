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
    }
  ];

  // gets set to the value of the card's name below
  let result = "Card not found! " + cardNumber;
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
            result = card.name;
          }
        }
      }
    });
  });

  return result;
}; // end of detectNetwork(cardNumber)

