/**
 * Created by kate on 3/12/15.
 */

WhiteDeck = new Meteor.Collection("WhiteDeck");

ShuffledWhiteDeck = new Meteor.Collection("ShuffledWhiteDeck");

PlayedCards = {};

function DealHand() {
  var hand = [];
  var _countWhite = WhiteDeck.find().count(); //1047
  var _key, _entry;
  var newKey = function(count) {
    return Math.floor(Math.random() * count);
  };
  _key = newKey(_countWhite);
  for (var i=0; i<10; i++) {
    while (PlayedCards[_key]) {
      _key = newKey(_countWhite);
    }
    PlayedCards[_key] = true;
    _entry = WhiteDeck.findOne({no: _key});
    hand.push({
      text: 'Mechahitler',//_entry.text,
      expansion: 'base'//_entry.expansion
    });
  }
  return hand;
}

TESTHAND = DealHand();