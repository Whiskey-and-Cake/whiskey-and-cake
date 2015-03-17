
Template.gameBoard.helpers({

  users: function(){
    return Meteor.users.find();
  },

  judge: function(){
    var user = Meteor.user()
    var current = CurUsers.find({username: user.username})
    return current.judge;
  },

  current: function(){
    return CurUsers.find();
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
  }
})

