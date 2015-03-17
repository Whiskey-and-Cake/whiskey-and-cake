
Template.playerHand.helpers({
    // userId: userId,


  playsHand: function(){
    return PlayerHand.find({})
  }

});

Template.playerHand.events({

  "click .clearBoard": function(){
    var hey = BoardWhites.find({});
    console.log('heyo - ', hey)
    // hey.remove();
    // BoardWhites.find({}).remove();

  },

  "click .testing123": function(){
    var user = Meteor.user()
    console.log("this - ", user)

    var test = {
      cardType: this.cardType,
      text: this.text,
      expansion: this.expansion,
      playedBy: user.username
    }

    var id = this._id

    PlayerHand.remove({_id: id});
    BoardWhites.insert({cardType: test.cardType, text: test.text, expansion: test.expansion, playedBy: test.playedBy});

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


