
Template.playerHand.helpers({
    // userId: userId,
  player: function(){
    return Meteor.user()
  },  

  playsHand: function(){
    return PlayerHand.find({})
  }

});

Template.playerHand.events({

  //  Plays a card from the playerHand
  //  Removes that card from the playerHand
  //  draws a new card from the whiteDeck
  //  removes that card from the whiteDeck
  //  can't play a card if user currently has one in play
  "click .playCard": function(){
    var user = Meteor.user();

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

  },

  "click .resetPlayers": function(){
    // delete all records from cheaters
    console.log('Resetting players')
    // Cheaters.drop();
    delete Cheaters
  },

  "click .clearBoard": function(){
    // clear out white cards
    // redraw blackCard
    // choose new judge
  }


});



