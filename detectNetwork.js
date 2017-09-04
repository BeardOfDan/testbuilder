"use strict";

var detectNetwork = function (cardNumber) {
  // shorter to type
  const length = cardNumber.length;
  const prefix = cardNumber.slice(0, 2);

  switch (length) {
    case 14:
      if ((prefix === "38") || (prefix === "39")) {
        return "Diner's Club";
      }
      break;

    case 15:
      if ((prefix === "34") || (prefix === "37")) {
        return "American Express";
      }
      break;

    case 13:
    case 19:
      if (prefix.charAt(0) === "4") {
        return "Visa";
      } else if (cardNumber.slice(0, 4) === "6011") {
        return "Discover";
      }
      break;

    case 16:
      if (prefix.charAt(0) === "4") {
        return "Visa";
      } else if (cardNumber.slice(0, 4) === "6011") {
        return "Discover";
      } else {
        const prefixNum = new Number(prefix);
        if ((prefixNum < 56) && (prefixNum > 50)) {
          return "MasterCard";
        }
      }
      break;

    default:
      return "Unhandled Card Number: " + cardNumber;
  } // end of switch
}; // end of detectNetwork(cardNumber)
