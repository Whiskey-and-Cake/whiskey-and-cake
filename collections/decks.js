// create shuffled decks
WhiteDeck = new Meteor.Collection("WhiteDeck");
BlackDeck = new Meteor.Collection("BlackDeck");

// create collection with all user hands
PlayerHand = new Meteor.Collection("PlayerHand");

// create collection of all cards on the game table (one black card & all played white cards)
GameBoard = new Meteor.Collection("GameBoard");

// Currently this collection provides a check for whether the round is over
RoundInfo = new Meteor.Collection("RoundInfo");
// Initializes RoundInfo with a roundOver variable, used for checking whether the round is over.
RoundInfo.insert({roundOver: null});

Meteor.methods({
  // starts new game
  newGame: function() {
    Meteor.users.remove({});
  },

  // function deals a player hand at the beginning of the game
  dealHand: function() {
    var userArray = Meteor.users.find({'status.online': true}).fetch();
    var judgeCounter = 0;
    for (var i = 0; i < userArray.length; i++) {
      if (userArray[i].judge === true) {
        judgeCounter++;
      }
    }
    if (judgeCounter === 0) {
      var rng = Math.round(Math.random() * (userArray.length - 1));
      var randomUserId = userArray[rng]._id;
      Meteor.users.update({_id: randomUserId}, {$set: {'judge': true}});
    }
    if (judgeCounter === 1) {
      Meteor.call("toggleJudge", function (err) {
        if (err) {
          throw err;
        }
      });
    }
    
    for (var j = 0; j < userArray.length; j++) {
      if (!(PlayerHand.find({owner: userArray[j]._id}).fetch().length === 10)) {
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
    }
  },

  // replenishes white cards in the player's hand
  drawWhite: function() {
    for (var i = 0; i < PlayerHand.find({owner: Meteor.user()._id}).fetch().length; i++) {
      while (PlayerHand.find({owner: Meteor.user()._id}).fetch().length < 10) {
        var _entry = WhiteDeck.findOne({no: 1});
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
  incrementScore: function(cardOwner) {
    Meteor.users.update({_id: cardOwner}, {$inc: {'score': 1}});
  },

  // signals the end of the round by setting roundOver to true
  endRound: function(){
    var round = RoundInfo.findOne({});
    RoundInfo.update({_id: round._id}, {$set: {roundOver: true}});
    // RoundInfo.insert({roundOver: true})
  },

  // resets the round by setting roundOver to false
  newRound: function(){
    // RoundInfo.remove({});
    var round = RoundInfo.findOne({});
    RoundInfo.update({_id: round._id}, {$set: {roundOver: false}});
  },

  // Clear losing cards from the gameboard by clearing the entire board
  // and then inserting the winning answer and corresponding question
  clearLosers: function(winnerCard, questionCard){

    GameBoard.remove({});

    GameBoard.insert({
      text: winnerCard.text,
      expansion: winnerCard.expansion,
      black: false
    });
    GameBoard.insert({
      text: questionCard.text,
      expansion: questionCard.expansion,
      black: true
    });

  },

  // clears gameboard & starts new round
  clearGameBoard: function() {
    GameBoard.remove({});
  },

  // rotates judge role after each round
  toggleJudge: function() {
    for (var i = 0; i < Meteor.users.find({'status.online': true}).fetch().length; i++) {
      if (Meteor.users.find({'status.online': true}).fetch()[i].judge === true) {
        var currentId = Meteor.users.find({'status.online': true}).fetch()[i]._id;
        Meteor.users.update({_id: currentId}, {$set: {'judge': false}});
        if (i === (Meteor.users.find({'status.online': true}).fetch().length - 1)) {
          Meteor.users.update({_id: Meteor.users.find({'status.online': true}).fetch()[0]._id}, {$set: {'judge': true}});
          return;
        } else {
          Meteor.users.update({_id: Meteor.users.find({'status.online': true}).fetch()[++i]._id}, {$set: {'judge': true}});
          return;
        }
      }
    }
  }
});
