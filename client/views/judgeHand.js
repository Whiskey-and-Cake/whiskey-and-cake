Template.judgeHand.helpers({
  playedCards: function(){
    var user = Meteor.user()
    return GameBoard.find({})
  }
});

Template.judgeHand.events({
  "click .card": function () {
    //increment score of card owner
    //remove cards from GameBoard
    //pass 'judgeship' to next person
  }
});
