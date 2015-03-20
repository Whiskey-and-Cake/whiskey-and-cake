Template.judgeHand.helpers({
  playedCards: function(){
    var user = Meteor.user()
    return GameBoard.find({})
  }
});

Template.judgeHand.events({
  "click .card": function () {
    //increment score of card owner
    Meteor.users.find({_id: this.owner}, {$set: {'score': 1}});
    //remove cards from GameBoard
    //pass 'judgeship' to next person
  }
});
