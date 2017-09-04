// This function will automatically test all of the different possible combinations
const performTests = function (prefixes, lengths, expected) {
  const { expect } = chai;

  // Note, the double tilda (~~) operator is an efficient alternative to Math.floor()
  const getRandomDigit = function () {
    return ~~(Math.random() * 10);
  };

  // This provides 'junk' digits in order to have the cards be the correct length.
  const getSuffix = function (prefix, length) {
    let suffix = "";
    for (let i = prefix.length; i < length; i++) {
      suffix += getRandomDigit();
    }
    return suffix;
  };

  // testing for each of the possible prefix and length combinations
  for (let i = 0; i < prefixes.length; i++) {
    for (let j = 0; j < lengths.length; j++) {
      // the testing framework works asyncronously, therefore, and IIFE is required
      (function () {
        let thisPrefix = prefixes[i];
        let thisLength = lengths[j];

        it(`has a prefix of ${thisPrefix} and a length of ${thisLength}`, function () {
          let thisCardNumber = thisPrefix + getSuffix(thisPrefix, thisLength);
          expect(detectNetwork(thisCardNumber)).to.equal(expected);
        });
      })();
    }
  }
}; // end of performTests(prefixes, lengths, expected)


describe('Diner\'s Club', function () {
  const prefixes = ["38", "39"];
  const lengths = [14];

  performTests(prefixes, lengths, "Diner's Club");
});

describe('American Express', function () {
  const prefixes = ["34", "37"];
  const lengths = [15];

  performTests(prefixes, lengths, "American Express");
});

describe('Visa', function () {
  const prefixes = ["4"];
  const lengths = [13, 16, 19];

  performTests(prefixes, lengths, "Visa");
});

describe('MasterCard', function () {
  const prefixes = ["51", "52", "53", "54", "55"];
  const lengths = [16];

  performTests(prefixes, lengths, "MasterCard");
});

describe('Discover', function () {
  const prefixes = ["6011", "644", "645", "646", "647", "648", "649", "65"];
  const lengths = [16, 19];

  performTests(prefixes, lengths, "Discover");
});

describe('Maestro', function () {
  const prefixes = ["5018", "5020", "5038", "6304"];
  const lengths = [12, 13, 14, 15, 16, 17, 18, 19];

  performTests(prefixes, lengths, "Maestro");
});

describe('China UnionPay', function () {
  const prefixes = ["622126-622925", "624-626", "6282-6288"];
  const lengths = [16, 17, 18, 19];

  performTests(prefixes, lengths, "China UnionPay");
});

describe('Switch', function () {
  const prefixes = ["4903", "4905", "4911", "4936", "564182", "633110", "6333", "6759"];
  const lengths = [16, 18, 19];

  performTests(prefixes, lengths, "Switch");
});
