Template.gameBoard.helpers({

  users: function(){
    return Meteor.users.find({});
  },

  question: function(){
    console.log("this is the question text: ", GameBoard.find({black: true}, {text: 1}));
    return GameBoard.find({black: true});
  },
  
  answers: function(){
    return GameBoard.find({black: false});
  },

  numPlayers: function(){
    return Meteor.users.find().count()
  },

  // returns a count of all played cards on the board
  cardsPlayed: function(){
    return GameBoard.find({black: false}).count()
  },

  cardsLeft: function(){
    var count = Meteor.users.find().count();
    return count - GameBoard.find({black: false}).count();
  },

  roundOver: function(){
    var players = Meteor.users.find().count();
    var played = GameBoard.find({black: false}).count();
    return players - played === 0;
  }

});

Template.gameBoard.events({
  "click .answerCards": function (event) {
    event.stopPropagation();
    //store click context to pass into method call
    var cardOwner = this.owner;
    //store current score to pass into method call
    var tempScore = Meteor.users.findOne({}, {_id: cardOwner}).score;
    //calls incrementScore from decks.js
    Meteor.call('incrementScore', cardOwner, tempScore, function(err, id) {
      console.log('incrementScore called');
      if (err) {
        throw err;
      }
    }),
    //remove cards from GameBoard
    Meteor.call('clearGameBoard', function (err, result) {
      console.log('clearGameBoard called');
      if (err) {
        throw err;
      }
    }),
    //pass 'judgeship' to next person
    Meteor.call('toggleJudge', function (err, result) {
      console.log('toggleJudge called');
      if (err) {
        throw err;
      }
    }),
    //draw next black card
    Meteor.call("drawBlack", function(err, res){
      if(err){
        throw err;
      } else {
        console.log('Question card drawn');
      }
    })
  }
});