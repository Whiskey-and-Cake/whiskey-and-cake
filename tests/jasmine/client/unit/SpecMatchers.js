// matchers are like .eql() and .equal()

beforeEach(function () {
  jasmine.addMatchers({
    hasBeenShuffled: function() {
      return {
        compare: function(actual, expected) {
          var deck = actual;

          return {
            pass: deck[0] !== expected
          }
        }
      }
    }
    //toBePlayed: function () {
    //  return {
    //    compare: function (actual, expected) {
    //      var gameboard = actual;
    //
    //      return {
    //        // gameboard includes card just played
    //        pass: gameboard.contains() === expected
    //      }
    //    }
    //  };
    //}
  });
});
