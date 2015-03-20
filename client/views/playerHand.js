
Template.playerHand.helpers({
    // userId: userId,
  player: function(){
    return Meteor.user()
  },  

  playsHand: function(){
    var user = Meteor.user();
    // displays hand to user, filtered by username.
    return PlayerHand.find({}, {owner: user.username})
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

    // problem with 'drawWhite'
    Meteor.call('drawWhite', function(err, res){
      if(err){
        throw err;
      }
    })

    //var cardToPlay = { cardType: this.cardType, text: this.text, expansion: this.expansion, playedBy: user.username }
    //
    //var id = this._id
    //
    //PlayerHand.remove({_id: id});
    //GameBoard.insert({cardType: cardToPlay.cardType, text: cardToPlay.text, expansion: cardToPlay.expansion, black: false, playedBy: cardToPlay.playedBy});
  },

  // "click .playCard": function(){
  //   Meteor.call("playCard", function(err, res){
  //     if(err){
  //       throw err;
  //     } else {
  //       console.log('card played');
  //       console.log('Result object - ', res);
  //     }
  //   })
  // },

  // Doesn't work.
  //"click .resetPlayers": function(){
  //  // delete all records from cheaters
  //  console.log('Resetting players')
  //  // Cheaters.drop();
  //  delete Cheaters
  //},

  "click #clearBoard": function(){
    // clear out white cards
    // redraw blackCard
    // choose new judge
    Meteor.call("drawBlack", function(err, res){
      if(err){
        throw err;
      } else {
        console.log('Board Cleared')
      }
    })
  },

  "click #dealHand": function(){

    var user = Meteor.user();
    var numHandCards = PlayerHand.find({owner: user.username}).count();
    if(numHandCards >= 12){
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
  },

  "click #rotateJudge": function(){
    // for testing judeg functionality
    // Will ideally be a part of the .clearBoard function above.
    var users = Meteor.users.find();
    possJudges = [];

    users.forEach(function(user){
      possJudges.push(user.username);
    });
    console.log('possJudges... ', possJudges);
    if(judgeIndex === possJudges.length){
      judgeIndex = 0;
    }
    console.log('old judgename - ', judgename);
    judgename = possJudges[judgeIndex];
    judgeIndex ++;
    console.log('new judgename - ', judgename);

  }

});

  //  Plays a card from the playerHand
  //  Removes that card from the playerHand
  //  draws a new card from the whiteDeck
  //  removes that card from the whiteDeck
  //  can't play a card if user currently has one in play

  //  Old playCard listener, going to try to implement it with the collections functions

  // "click .playCard": function(){
  //   var user = Meteor.user();

  //   if(BoardWhites.find({playedBy: user.username}).count() > 0){
  //     var what = BoardWhites.find({playedBy: user.username})
  //     console.log('getting played  - ', what.count())
  //     return;
  //   }

  //   var cardToPlay = { cardType: this.cardType, text: this.text, expansion: this.expansion, playedBy: user.username }

  //   var id = this._id

  //   PlayerHand.remove({_id: id});
  //   BoardWhites.insert({cardType: cardToPlay.cardType, text: cardToPlay.text, expansion: cardToPlay.expansion, playedBy: cardToPlay.playedBy});

  //   var _entry = WhiteDeck.findOne({});
  //   var _id = _entry._id
  //   PlayerHand.insert({
  //     text: _entry.text,
  //     expansion: _entry.expansion
  //   });
  //   WhiteDeck.remove({_id: _id});

  // },


