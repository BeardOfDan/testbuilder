"use strict";

var detectNetwork = function(cardNumber) {
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
            }
            break;

        case 16:
            if (prefix.charAt(0) === "4") {
                return "Visa";
            } else {
                prefixNum = new Number(prefix);
                if ((prefixNum < 56) && (prefixNum > 50)) {
                    return "MasterCard";
                }
            }
            break;
    } // end of switch

};

// The tests given in the console are all of a certain format
// so I will make a function that will convert them into an array
let suppliedTestString = `38345678901234 (Diner's Club)
39345678901234 (Diner's Club)
343456789012345 (American Express)
373456789012345 (American Express)
4123456789012 (Visa)
4123456789012345 (Visa)
4123456789012345678 (Visa)
5112345678901234 (MasterCard)
5212345678901234 (MasterCard)
5312345678901234 (MasterCard)
5412345678901234 (MasterCard)
5512345678901234 (MasterCard)`;

let values = suppliedTestString.split("\n");

// Since the instructions only state to work in this file 
// (and the console), instead of doing anything in the .test.js file (yet),
// I am doing some basic testing this way
pseudoTests = function() {
    let passes = 0;
    let failures = 0;

    for (let i = 0; i < values.length; i++) {
        let cardNumber = values[i].match(/\d+/)[0];
        let expected = values[i].match(/\(.+\)/)[0];
        // remove the parentheses
        expected = expected.slice(1, expected.length - 1);

        let actual = detectNetwork(cardNumber);

        if (actual === expected) {
            passes++;
        } else {
            failures++;
        }
    }
    console.log(`${passes} tests passing \n${failures} tests failing`);
};