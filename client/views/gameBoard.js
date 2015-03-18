// Leaderboard = {};
// Leaderboard = [];
Template.gameBoard.helpers({

  users: function(){
    return Meteor.users.find({});
  },
  
  whites: function(){
    return BoardWhites.find({});
  },

  numPlayers: function(){
    return Meteor.users.find().count()
  },

  playas: function(){
    var users = Meteor.users.find({});
    
    users.forEach(function(user){
      // console.log('user - ', user);
      if(Cheaters.findOne({username: user.username})){
        // console.log('Tryna double cheat me...')
        return;
      } else {
        Cheaters.insert({username: user.username, score: 0})
      }
    })

    return Cheaters.find();
  },

// returns a count of all played cards on the board
  cardsPlayed: function(){
    return BoardWhites.find({}).count()
  },

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
    var playedBy = this.playedBy;

    var cheat = Cheaters.findOne({username: playedBy});
    var id = cheat._id

    Cheaters.update({_id: id}, {$inc: {score: 1}});
  }
})

