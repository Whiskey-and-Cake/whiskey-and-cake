WhiteDeck = new Meteor.Collection("WhiteDeck");
BlackDeck = new Meteor.Collection('BlackDeck');

PlayerHand = new Meteor.Collection("PlayerHand");

// game board is the replacement for board whites
BoardWhites = new Meteor.Collection("BoardWhites");
GameBoard = new Meteor.Collection("GameBoard");

Scoreboard = new Meteor.Collection("Scoreboard");

Cheaters = new Meteor.Collection("Cheaters");


Meteor.methods({
  // function deals a player hand at the beginning of the game
  dealHand: function(PlayerHand) {
    for (var i = 0; i < 10; i++) {
      var _entry = WhiteDeck.findOne({}, {no: 1});
      var _id = _entry.no;
      PlayerHand.insert({
        no: _entry.no,
        text: _entry.text,
        expansion: _entry.expansion
      });
      WhiteDeck.remove({no: _id});
    }
  },
  // replenishes white cards in the player's hand
  drawWhite: function(PlayerHand) {
    if (PlayerHand.find().count() < 10) {
      var _entry = WhiteDeck.findOne({}, {no: 1});
      var _id = _entry.no;
      PlayerHand.insert({
        no: _entry.no,
        text: _entry.text,
        expansion: _entry.expansion
      });
      WhiteDeck.remove({no: _id});
    }
  },
  // adds card to game board with the user id and removes from playerhand
  playCard: function(hand, card, user) {
    hand.remove({no: card.no});
    GameBoard.insert({
      no: card.no,
      text: card.text,
      expansion: card.expansion,
      black: false,
      user: user
    });
  },
  // this function starts a new hand by clearing the GameBoard and adding a black card
  drawBlack: function() {
    GameBoard.remove({});
    var _card = BlackDeck.findOne({}, {no: 1});
    var _id = _card.no;
    GameBoard.insert({
      no: _card.no,
      text: _card.text,
      expansion: _card.expansion,
      black: true
    });
    BlackDeck.remove({no: _id});
  }
});