// shuffled decks
WhiteDeck = new Meteor.Collection("WhiteDeck");
BlackDeck = new Meteor.Collection("BlackDeck");

// collection with all user hands
PlayerHand = new Meteor.Collection("PlayerHand");

// collection of all cards on the game table
GameBoard = new Meteor.Collection("GameBoard");

// collection of that round's question and the winning answer
RoundInfo = new Meteor.Collection("RoundInfo");

Meteor.methods({
  newGame: function() {
    Meteor.users.remove({});
  },
  // function deals a player hand at the beginning of the game
  dealHand: function() {
    var rng = Math.round(Math.random() * (Meteor.users.find().fetch().length - 1));
    var randomUserId = Meteor.users.find().fetch()[rng]._id;
    Meteor.users.update({_id: randomUserId}, {$set: {'judge': true}});
    
    for (var j = 0; j<Meteor.users.find().fetch().length; j++) {
      if (!PlayerHand.find({owner: Meteor.user()._id}).fetch()) {
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
  incrementScore: function(cardOwner) {
    Meteor.users.update({_id: cardOwner}, {$inc: {'score': 1}});
  },

  // used for checking if the round is over
  endRound: function(){
    // var round = RoundInfo.findOne({});
    // RoundInfo.update({_id: round._id}, {$set: {roundOver: true}});
    RoundInfo.insert({roundOver: true})
  },

  // resets the round
  newRound: function(){
    RoundInfo.remove({});
    // var round = RoundInfo.findOne({});
    // RoundInfo.update({_id: round._id}, {$set: {roundOver: false}});
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

  clearGameBoard: function() {
    GameBoard.remove({});
  },

  toggleJudge: function() {
    console.log('toggleJudge being called');
    for (var i = 0; i < Meteor.users.find().fetch().length; i++) {
      //console.log(i, 'at i position');
      if (Meteor.users.find().fetch()[i].judge === true) {
        //console.log('current judge found!');
        Meteor.users.update({_id: Meteor.user()._id}, {$set: {'judge': false}});
        if (i === (Meteor.users.find().fetch().length - 1)) {
          //console.log('current judge last in array, updating first to be judge');
          Meteor.users.update({_id: Meteor.users.find().fetch()[0]._id}, {$set: {'judge': true}});
          return;
        } else {
          //console.log('updating next user to be judge!');
          Meteor.users.update({_id: Meteor.users.find().fetch()[++i]._id}, {$set: {'judge': true}});
          return;
        }
      }
    }
  }
});
