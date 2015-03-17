
Leaderboard = {};

var names = [
  'Ada Lovelace',
  'Grace Hopper',
  'Marie Curie',
  'Carl Friedrich Gauss',
  'Nikola Tesla',
  'Claude Shannon'
  ];

Template.gameBoard.helpers({

  users: function(){
    return Meteor.users.find();
  },

  Competition: function(){
    return Competition.find();
  },

  judge: function(){
    var user = Meteor.user()
    return round.judge.username === user.username;
  },
  
  whites: function(){
    return BoardWhites.find({});
  },

// returns a count of all played cards on the board
  cardsPlayed: function(){
    return BoardWhites.find({}).count()
  },

// currently assumes 5 total players, but this can be amended later to take into account total number of users logged in
  cardsLeft: function(){
    var count = Meteor.users.find().count()
    return count - BoardWhites.find({}).count()
  },

  roundOver: function(){
    var players = Meteor.users.find().count();
    var played = BoardWhites.find({}).count();
    return players - played === 0;
  }

})

Template.gameBoard.events({
  "click .playedWhite": function(){
    var id = this._id;
    BoardWhites.remove({_id: id});
  },

  "click .pickWinner": function(){
    var user = this.playedBy;
    
    Scoreboard.update({user: {score: 1}})
    console.log('USER - ', Scoreboard.find({user: user}))
  },

  "click .scoreIt": function(){
    Competition.insert({name: "David", score: 0})
  }
})

