/**
 * Created by kate on 3/12/15.
 * Cmd line if meteor running on port 3000 already.
 * kill -9 `ps ax | grep node | grep meteor | awk '{print $1}'`
 */

if (BlackDeck.find().count() === 0) {
  for (var i=0; i<CardsMaster.length; i++) {
    if (CardsMaster[i]["cardType"] === "Black") {
      BlackDeck.insert({
        no: i,
        text: CardsMaster[i]["text"],
        expansion: CardsMaster[i]["expansion"]
      });
    }
  }
}

if (WhiteDeck.find().count() === 0) {
  for (var i=0; i<CardsMaster.length; i++) {
    if (CardsMaster[i]["cardType"] === "White") {
      WhiteDeck.insert({
        no: i,
        text: CardsMaster[i]["text"],
        expansion: CardsMaster[i]["expansion"]
      });
    }
  }
}

// Empty Shuffled Deck prior to each game
ShuffledBlackDeck.remove({});
ShuffledWhiteDeck.remote({});

// Instantiate Shuffled Deck prior to each game
var _countBlack = BlackDeck.find().count();
var _countWhite = WhiteDeck.find().count();
var _key;

var newKey = function(count) {
  return Math.floor(Math.random() * count);
};

// Black Deck
_key = newKey(_countBlack);
for (var i=0; i<_countBlack; i++) {
  while (ShuffledBlackDeck.find({no: _key})) {
    _key = newKey(_countBlack);
  }
    ShuffledBlackDeck.insert({
      no: i,
      text: BlackDeck[_key]["text"],
      expansion: BlackDeck[_key]["expansion"]
    });
}

// White Deck
_key = newKey(_countWhite);
for (var i=0; i<_countBlack; i++) {
  while (ShuffledWhiteDeck.find({no: _key})) {
    _key = newKey(_countWhite);
  }
    ShuffledWhiteDeck.insert({
      no: i,
      text: WhiteDeck[_key]["text"],
      expansion: WhiteDeck[_key]["expansion"]
    });
}
