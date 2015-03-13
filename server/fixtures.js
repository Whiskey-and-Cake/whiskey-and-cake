/**
 * Created by kate on 3/12/15.
 * Cmd line if meteor running on port 3000 already.
 * kill -9 `ps ax | grep node | grep meteor | awk '{print $1}'`
 */
var _incrementBlack = 0;
if (BlackDeck.find().count() === 0) {
  for (var i=0; i<CardsMaster.length; i++) {
    if (CardsMaster[i]["cardType"] === "Black") {
      BlackDeck.insert({
        no: _incrementBlack,
        text: CardsMaster[i]["text"],
        expansion: CardsMaster[i]["expansion"]
      });
      _incrementBlack++;
    }
  }
}

var _incrementWhite = 0;
if (WhiteDeck.find().count() === 0) {
  for (var i=0; i<CardsMaster.length; i++) {
    if (CardsMaster[i]["cardType"] === "White") {
      WhiteDeck.insert({
        no: _incrementWhite,
        text: CardsMaster[i]["text"],
        expansion: CardsMaster[i]["expansion"]
      });
      _incrementWhite++;
    }
  }
}

// Empty Shuffled Deck prior to each game
ShuffledBlackDeck.remove({});
ShuffledWhiteDeck.remove({});

// Instantiate Shuffled Deck prior to each game
var _countBlack = BlackDeck.find().count(); //275
var _countWhite = WhiteDeck.find().count(); //1047
var _key, _entry;

var newKey = function(count) {
  return Math.floor(Math.random() * count);
};

// Black Deck
_key = newKey(_countBlack);
for (var i=0; i<_countBlack; i++) {
  while (ShuffledBlackDeck.findOne({no: _key})) {
    _key = newKey(_countBlack);
  }
  _entry = BlackDeck.findOne({no: i});
  ShuffledBlackDeck.insert({
    no: _key,
    text: _entry.text,
    expansion: _entry.expansion
  });
}

// White Deck
_key = newKey(_countWhite);
for (var i=0; i<_countWhite; i++) {
  while (ShuffledWhiteDeck.findOne({no: _key})) {
    _key = newKey(_countWhite);
  }
  _entry = WhiteDeck.findOne({no: i});
  ShuffledWhiteDeck.insert({
    no: _key,
    text: _entry.text,
    expansion: _entry.expansion
  });
}