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
    return GameBoard.find().count()
  },

  cardsLeft: function(){
    var count = Meteor.users.find().count();
    return count - GameBoard.find({}).count();
  },

  roundOver: function(){
    var players = Meteor.users.find().count();
    var played = GameBoard.find({}).count();
    return players - played === 0;
  }

});

