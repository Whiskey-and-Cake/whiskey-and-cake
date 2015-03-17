
player = Meteor.user()

board = [
  {"cardType":"White","text":"Michelle Obama's arms.","expansion": "Base"}
]


Template.gameBoard.helpers({
  
  whites: function(){
    return BoardWhites.find({});
  },

// These two functions are currently static funcs
// Will probably need to instantiate a new collection for each
  cardsPlayed: function(){
    return BoardWhites.find({}).count()
  },

  cardsLeft: function(){
    return 5 - BoardWhites.find({}).count()
  }

})

Template.gameBoard.events({
  "click .playedWhite": function(){
    var id = this._id;
    BoardWhites.remove({_id: id});
  }
})