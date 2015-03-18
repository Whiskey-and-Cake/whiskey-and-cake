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
    //  this helper is loaded into the view as a way to see all the active  'cheaters', or, in other words, players.
    //  it loops through all the users Meteor has and if it can't find any cheaters with that username, it adds them to cheaters.
    //  the final return statement just provides all the cheaters to the gameboard view as 'playas'
    //  Ideally this the loop through should happen elsewhere and this should just return all the cheaters since I think it's
    //  the loop that causes users to get double added to cheaters.
    var users = Meteor.users.find({});
    
    users.forEach(function(user){
      if(Cheaters.findOne({username: user.username})){
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
    //  Whenever an in play card gets played, this checks for the corresponding 'cheater' and increases their score by 1
    var playedBy = this.playedBy;

    var cheat = Cheaters.findOne({username: playedBy});
    var id = cheat._id

    Cheaters.update({_id: id}, {$inc: {score: 1}});
  }
})

