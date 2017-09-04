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

  // for handling any 'apparent conflict' due to overlap
  let oldPrefixLength;

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

          // check if the card has this prefix
          if (cardNumber.slice(0, thisPrefix.length) === thisPrefix) {
            if (result) { // if there was already a match found
              // check if the new match takes precedence
              if (thisPrefix.length <= oldPrefixLength) {
                // do nothing, as the old one has precedence                
              } else { // the new match takes precedence
                result = card.name;
                oldPrefixLength = thisPrefix.length;
              }
            } else { // this is the first match for a Card Network
              result = card.name;
              oldPrefixLength = thisPrefix.length;
            }
          }
        }
      }
    });
  });

  return result ? result : "Card Network not found! " + cardNumber;
}; // end of detectNetwork(cardNumber)
