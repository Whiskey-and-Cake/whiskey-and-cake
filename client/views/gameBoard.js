Template.gameBoard.helpers({

  users: function(){
    return Meteor.users.find({'status.online': true});
  },

  question: function(){
    return GameBoard.find({black: true});
  },
  
  answers: function(){
    return GameBoard.find({black: false});
  },

  numPlayers: function(){
    if (Meteor.users.find({'status.online': true}).count() === 0) {
      return 'NO';
    } else {
      return Meteor.users.find({'status.online': true}).count();   
    }
  },

  // returns a count of all played cards on the board
  cardsPlayed: function(){
    return GameBoard.find({black: false}).count()
  },

  cardsLeft: function(){
    var count = Meteor.users.find({'status.online': true}).count();
    return Math.max(0, (count - 1) - GameBoard.find({black: false}).count());
  },

  allCardsPlayed: function(){
    var players = (Meteor.users.find().count() - 1);
    var played = GameBoard.find({black: false}).count();
    return players - played === 0;
  },

  winnerChosen: function(){
    var round = RoundInfo.findOne({});
    return round.roundOver;
  }

});


Template.gameBoard.events({
  "click .answerCards": function (event) {
    event.stopPropagation();

    // calls endRound from deck.js, which sets roundOver to true for the winnerChosen helper above
    Meteor.call('endRound', function(err, res){
      if(err){
        throw err;
      }
    });

    // store click context to pass into method call
    var cardOwner = this.owner;
    //store current score to pass into method call
    // calls incrementScore from decks.js
    Meteor.call('incrementScore', cardOwner, function(err, id) {
      console.log('incrementScore called');
      if (err) {
        throw err;
      }
    });

    // stores the winning card
    var answer = GameBoard.findOne({owner: cardOwner});
    // stores the question card
    var question = GameBoard.findOne({black: true});
    // calls clearLosers form decks.js, which clears the GameBoard and inserts 
    // the winning card along with the card it answered
    Meteor.call("clearLosers", answer, question, function(err, result){
      if(err) {
        throw err;
      }
    });

  },

  "click #nextRound": function(event){
    event.stopPropagation();

    // calls newRound which removes round data
    Meteor.call('newRound', function(err, result){
      if(err) {
        throw err;
      }
    })

    //remove cards from GameBoard
    Meteor.call('clearGameBoard', function (err, result) {
      //console.log('clearGameBoard called');
      if (err) {
        throw err;
      }
    }),
    //pass 'judgeship' to next person
    Meteor.call('toggleJudge', function (err, result) {
      //console.log('toggleJudge called');
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



