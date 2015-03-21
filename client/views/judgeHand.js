Template.judgeHand.helpers({
  playedCards: function(){
    var user = Meteor.user()
    return GameBoard.find({})
  }
});

Template.judgeHand.events({
  "click .card": function () {
    var cardOwner = this.owner;
    var tempScore = Meteor.users.findOne({}, {_id: cardOwner}).score;

    Meteor.call('incrementScore', cardOwner, tempScore, function(err, id) {
      if (err) {
        throw err;
      }
    })
    // Meteor.users.allow({
    //   update: function() {
    //     console.log('updates allowed');
    //     return true;
    //   }
    // });
    // //store current score
    // var tempScore = Meteor.users.findOne({}, {_id: this.owner}).score;
    // console.log(tempScore);
    // //console.log(Meteor.users.findOne({_id: this.owner}), 'clicky clicky');
    // //increment score of card owner
    // Meteor.users.update({_id: this.owner}, {$set: {'score': ++tempScore}});
    // //remove cards from GameBoard
    // //pass 'judgeship' to next person
  }
});
