//Cmd line if meteor running on port 3000 already.
//kill -9 `ps ax | grep node | grep meteor | awk '{print $1}'`

/* DECK INSTANTIATION */

// in-place shuffle algorithm for CardsMaster
for (var i=0; i<CardsMaster.length; i++) {
  var j = Math.floor(Math.random() * i);
  var hole = CardsMaster[i];
  CardsMaster[i] = CardsMaster[j];
  CardsMaster[j] = hole;
}

// order number for database deck
var _incrementBlack = 0;
var _incrementWhite = 0;

// instantiate databases with shuffled data
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

Meteor.publish('WhiteDeck', function() { return WhiteDeck.find(); });
Meteor.publish('BlackDeck', function() { return BlackDeck.find(); });
Meteor.publish('PlayerHand', function() { return PlayerHand.find(); });
Meteor.publish('GameBoard', function() { return GameBoard.find(); });
Meteor.publish('Scoreboard', function() { return Scoreboard.find(); });
Meteor.publish('Cheaters', function() { return Cheaters.find(); });
//Testing publishing capabilities 
Meteor.publish("userData", function () {
  return Meteor.users.find({});
});