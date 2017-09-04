
describe('Diner\'s Club', function () {
  // Be careful, tests can have bugs too...

  it('has a prefix of 38 and a length of 14', function () {
    if (detectNetwork('38345678901234') !== 'Diner\'s Club') {
      throw new Error('Test failed');
    }
  });

  it('has a prefix of 39 and a length of 14', function () {
    if (detectNetwork('39345678901234') !== 'Diner\'s Club') {
      throw new Error('Test failed');
    }

  });
});

describe('American Express', function () {
  // It can get annoying to keep typing the if/throw, so here is a
  // helper function to throw an error if the input statement isn't true. 
  var assert = function (isTrue) {
    if (!isTrue) {
      throw new Error('Test failed');
    }
  };

  it('has a prefix of 34 and a length of 15', function () {
    assert(detectNetwork('343456789012345') === 'American Express');
  });

  it('has a prefix of 37 and a length of 15', function () {
    assert(detectNetwork('373456789012345') === 'American Express');
  });
});

describe('Visa', function () {
  // Chai is an entire library of helper functions for tests!
  // Chai provides an assert that acts the same as our previous assert.
  // Search the documentation to figure out how to access it. 
  //   http://chaijs.com/
  var assert = chai.assert;


  it('has a prefix of 4 and a length of 13', function () {
    assert(detectNetwork('4123456789012') === 'Visa');
  });

  it('has a prefix of 4 and a length of 16', function () {
    assert(detectNetwork('4123456789012345') === 'Visa');
  });

  it('has a prefix of 4 and a length of 19', function () {
    assert(detectNetwork('4123456789012345678') === 'Visa');
  });
});

describe('MasterCard', function () {
  // Chai lets you write more human-readable tests that throw helpful errors.
  // Expect syntax is one way to do this, but there are others. 
  // If you want to know more, check out the documentation. 
  //   http://chaijs.com/api/bdd/
  var expect = chai.expect;

  it("has a prefix of 51 and a length of 16", function () {
    expect(detectNetwork('5112345678901234')).to.equal('MasterCard');
  });

  it("has a prefix of 52 and a length of 16", function () {
    expect(detectNetwork('5212345678901234')).to.equal('MasterCard');
  });

  it("has a prefix of 53 and a length of 16", function () {
    expect(detectNetwork('5312345678901234')).to.equal('MasterCard');
  });

  // You can also use should instead of expect, which changes the style
  // slightly. It really doesn't matter which one you use - check out 
  // http://chaijs.com/guide/styles/ for more info, but it's important
  // to be consistent (unlike in this file, where we use BOTH expect
  // and should, but that's just for learning), so once you've gotten 
  // these tests to pass using should syntax, refactor your tests to 
  // use either expect or should, but not both. 
  var should = chai.should();

  it('has a prefix of 54 and a length of 16', function () {
    detectNetwork('5412345678901234').should.equal('MasterCard');
  });

  it('has a prefix of 55 and a length of 16', function () {
    detectNetwork('5512345678901234').should.equal('MasterCard');
  });

});

// The above tests are still hardcoded
// The below tests are automated with the performTests function

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
};

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

describe('should support China UnionPay')
describe('should support Switch')
