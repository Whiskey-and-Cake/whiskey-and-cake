
Template.playerHand.helpers({
  player: function(){
    return Meteor.user()
  },  

  playsHand: function(){
    var user = Meteor.user();
    // displays hand to user, filtered by username.
    return PlayerHand.find({}, {owner: user._id})
  }

});

Template.playerHand.events({

  "click .playCard": function(){
    var user = Meteor.user();
    console.log(user, ' is the user');
    console.log(GameBoard.find({owner: user._id}).fetch().length, ' is the GameBoard');

    if(GameBoard.find({owner: user._id}).fetch().length > 0){
      console.log("Yo, you've already played a card!");
      return;
    }

    Meteor.call('playCard', this, function(err, id) {
      console.log('card being played');
      if (err) {
        throw err;
      }
    });

    Meteor.call('drawWhite', function(err, id){
      if(err){
        throw err;
      }
    });

  },

  "click #clearBoard": function(){
    // clear out white cards
    // redraw blackCard
    // choose new judge
    Meteor.call("drawBlack", function(err, res){
      if(err){
        throw err;
      } else {
        console.log('Board Cleared');
      }
    })
  },

  "click #dealHand": function(){

    var user = Meteor.user();
    var numHandCards = PlayerHand.find({owner: user._id}).count();
    if(numHandCards >= 10){
      console.log('You already have ', numHandCards, ' why not try using them?');
      return;
    }
    Meteor.call("dealHand", function(err, res){
      if(err){
        throw err;
      } else {
        console.log('Hand Dealt');
        console.log('Result object - ', res);
      }
    });
  }

});


