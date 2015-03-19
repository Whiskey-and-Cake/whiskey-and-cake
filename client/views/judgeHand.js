Template.judgeHand.helpers({
  playedCards: function(){
    var user = Meteor.user()
    return GameBoard.find({})
  }
});