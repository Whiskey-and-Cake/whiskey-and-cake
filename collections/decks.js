// shuffled decks
WhiteDeck = new Meteor.Collection("WhiteDeck");
BlackDeck = new Meteor.Collection('BlackDeck');

// collection with all user hands
PlayerHand = new Meteor.Collection("PlayerHand");

// collection of all cards on the game table
GameBoard = new Meteor.Collection("GameBoard");


//Scoreboard = new Meteor.Collection("Scoreboard");
//Cheaters = new Meteor.Collection("Cheaters");

// on meteor start, clear current decks
WhiteDeck.remove({});
BlackDeck.remove({});
PlayerHand.remove({});
GameBoard.remove({});

Meteor.methods({
  // function deals a player hand at the beginning of the game
  dealHand: function() {
    var rng = Math.round(Math.random() * (Meteor.users.find().fetch().length - 1));
    var randomUserId = Meteor.users.find().fetch()[rng]._id;
    Meteor.users.update({_id: randomUserId}, {$set: {'judge': true}});
    
    for (var j = 0; j<Meteor.users.find().fetch().length; j++) {
      var userArray = Meteor.users.find().fetch();
      for (var i = 0; i < 10; i++) {
        var _entry = WhiteDeck.findOne({}, {no: 1});
        var _id = _entry.no;
        PlayerHand.insert({
          no: _entry.no,
          text: _entry.text,
          expansion: _entry.expansion,
          owner: userArray[j]._id
        });
        WhiteDeck.remove({no: _id});
      }
    }
  },
  // replenishes white cards in the player's hand
  drawWhite: function() {
    for (var i = 0; i < PlayerHand.find({owner: Meteor.user()._id}).fetch().length; i++) {
      while (PlayerHand.find({owner: Meteor.user()._id}).fetch().length < 10) {
        var _entry = WhiteDeck.findOne({}, {no: 1});
        var _id = _entry.no;
        PlayerHand.insert({
          no: _entry.no,
          text: _entry.text,
          expansion: _entry.expansion,
          owner: Meteor.user()._id
        });
        WhiteDeck.remove({no: _id});
      }
    }
  },
  // adds card to game board with the user id and removes from playerhand
  // added username
  playCard: function(card) {
    PlayerHand.remove({no: card.no});
    GameBoard.insert({
      no: card.no,
      text: card.text,
      expansion: card.expansion,
      black: false,
      owner: card.owner
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
      owner: _card.owner,
      black: true
    });
    BlackDeck.remove({no: _id});
  },
  //increment score of card owner
  incrementScore: function(cardOwner, tempScore) {
    Meteor.users.update({_id: cardOwner}, {$set: {'score': ++tempScore}});
  },
  clearGameBoard: function() {
    GameBoard.remove({})
  },
  toggleJudge: function() {
    console.log('toggleJudge being called');
    for (var i = 0; i < Meteor.users.find().fetch().length; i++) {
      console.log(i, 'at i position');
      if (Meteor.users.find().fetch()[i].judge === true) {
        console.log('current judge found!')
        Meteor.users.update({_id: Meteor.user()._id}, {$set: {'judge': false}});
        if (i === (Meteor.users.find().fetch().length - 1)) {
          console.log('current judge last in array, updating first to be judge')
          Meteor.users.update({_id: Meteor.users.find().fetch()[0]._id}, {$set: {'judge': true}});
          return;
        } else {
          console.log('updating next user to be judge!')
          Meteor.users.update({_id: Meteor.users.find().fetch()[++i]._id}, {$set: {'judge': true}});
          return;
        }
      }
    }
  }
});
