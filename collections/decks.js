// create shuffled decks
WhiteDeck = new Meteor.Collection("WhiteDeck");
BlackDeck = new Meteor.Collection("BlackDeck");

// create collection with all user hands
PlayerHand = new Meteor.Collection("PlayerHand");

// create collection of all cards on the game table (one black card & all played white cards)
GameBoard = new Meteor.Collection("GameBoard");

// Currently this collection provides a check for whether the round is over
// This is done by initializing a roundOver property of this collection when the judge picks a winner
// Then that property is deleted when a new round is started
RoundInfo = new Meteor.Collection("RoundInfo");

//This is where we hold our methods that get called from the client side
Meteor.methods({
  // function deals a player hand at the beginning of the game
  dealHand: function() {
    //userArray holds an array of players that are logged in using the user-status package
    var userArray = Meteor.users.find({'status.online': true}).fetch();
    var judgeCounter = 0;
    for (var i = 0; i < userArray.length; i++) {
      if (userArray[i].judge === true) {
        judgeCounter++;
      }
    }
    //if the deal button was pushed and no judges are assigned alrady, assign one randomly
    if (judgeCounter === 0) {
      var rng = Math.round(Math.random() * (userArray.length - 1));
      var randomUserId = userArray[rng]._id;
      Meteor.users.update({_id: randomUserId}, {$set: {'judge': true}});
    }
    //if the deal button was pushed and there is 1 judge already, toggle that judge
    if (judgeCounter === 1) {
      Meteor.call("toggleJudge", function (err) { //function at the end of this file
        if (err) {
          throw err;
        }
      });
    }
    //iterate over all active players and insert up to 10 cards in their hand
    for (var j = 0; j < userArray.length; j++) {
      //adding .fetch() onto the end of the find method returns an array, thus we can use length
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
    var userArray = Meteor.users.find({'status.online': true}).fetch();
    for (var i = 0; i < userArray.length; i++) {
      while (PlayerHand.find({owner: userArray[i]._id}).fetch().length < 10) {
        var _entry = WhiteDeck.findOne({}, {no: 1});
        var _entryId = _entry.no;
        PlayerHand.insert({
          no: _entry.no,
          text: _entry.text,
          expansion: _entry.expansion,
          owner: userArray[i]._id
        });
        WhiteDeck.remove({no: _entryId});
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

  // signals the end of the inserting a roundOver property and setting it to true
  endRound: function(){
    RoundInfo.insert({roundOver: true})
  },

  // resets the round by removing the roundOver property
  newRound: function(){
    var round = RoundInfo.findOne({});
    RoundInfo.remove({_id: round._id});
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
    var userArray = Meteor.users.find({'status.online': true}).fetch();
    //iterate through all active users
    for (var i = 0; i < userArray.length; i++) {
      //if that user is the judge
      if (userArray[i].judge === true) {
        //take his unique _.id
        var currentId = userArray[i]._id;
        //set his judge property to false
        Meteor.users.update({_id: currentId}, {$set: {'judge': false}});
        //if that user is the final element in the array
        if (i === (userArray.length - 1)) {
          //set the judge property to true for the first position in the array
          Meteor.users.update({_id: userArray[0]._id}, {$set: {'judge': true}});
          //break out
          return;
        } else {
          //for any other position make the next array index the judge
          Meteor.users.update({_id: userArray[++i]._id}, {$set: {'judge': true}});
          //breakout
          return;
        }
      }
    }
  }
});
