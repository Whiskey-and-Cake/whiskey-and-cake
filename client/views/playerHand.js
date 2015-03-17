
Template.playerHand.helpers({
    // userId: userId,
  player: function(){
    return Meteor.user()
  },  

  playsHand: function(){
    return PlayerHand.find({})
  }

});


// round = {
//   judge: null
// }

Template.playerHand.events({

  "click .clearBoard": function(){
    var hey = Meteor.users.find();
    var balls = [];
    var judge = false;

    // Tasks.update(taskId, { $set: { private: setToPrivate } });

    hey.forEach(function(dude){
      // if(!judge){
      //   judge = true;
      //   round.judge = dude;
      // } 
      Competition.insert({name: dude.username, score: 0})
    });

    console.log("Competition - ", Competition.find())

  },

  "click .addScore": function(){
    var user = Competition.findOne();
    var id = user._id
    var sco = user.score + 1
    console.log('this - ', user)

    Competition.update({_id: id}, {score: sco})
  },

  //  Plays a card from the playerHand
  //  Removes that card from the playerHand
  //  draws a new card from the whiteDeck
  //  removes that card from the whiteDeck
  //  can't play a card if user currently has one in play
  "click .testing123": function(){
    var user = Meteor.user()
    console.log("this - ", round)

    if(BoardWhites.find({playedBy: user.username}).count() > 0){
      var what = BoardWhites.find({playedBy: user.username})
      console.log('getting played  - ', what.count())
      return;
    }

    var cardToPlay = { cardType: this.cardType, text: this.text, expansion: this.expansion, playedBy: user.username }

    var id = this._id

    PlayerHand.remove({_id: id});
    BoardWhites.insert({cardType: cardToPlay.cardType, text: cardToPlay.text, expansion: cardToPlay.expansion, playedBy: cardToPlay.playedBy});

    var _entry = WhiteDeck.findOne({});
    var _id = _entry._id
    PlayerHand.insert({
      text: _entry.text,
      expansion: _entry.expansion
    });
    WhiteDeck.remove({_id: _id});

  }


});

Meteor.methods({
  playCard: function(){
    PlayerHand.insert({"cardType":"White","text":"Tester McGilliCutties.","expansion": "Base"});
  }

});


