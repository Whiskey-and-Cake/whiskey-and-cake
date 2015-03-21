Template.judgeHand.helpers({
  playedCards: function(){
    var user = Meteor.user()
    return GameBoard.find({})
  }
});

Template.judgeHand.events({
  "click .card": function (event) {
    event.stopPropagation();
    //store click context to pass into method call
    var cardOwner = this.owner;
    //store current score to pass into method call
    var tempScore = Meteor.users.findOne({}, {_id: cardOwner}).score;
    //calls incrementScore from decks.js
    Meteor.call('incrementScore', cardOwner, tempScore, function(err, id) {
      console.log('incrementScore called');
      if (err) {
        throw err;
      }
    }),
    //remove cards from GameBoard
    Meteor.call('clearGameBoard', function (err, result) {
      console.log('clearGameBoard called');
      if (err) {
        throw err;
      }
    }),
    //pass 'judgeship' to next person
    Meteor.call('toggleJudge', function (err, result) {
      console.log('toggleJudge called');
      if (err) {
        throw err;
      }
    })
  }
});
