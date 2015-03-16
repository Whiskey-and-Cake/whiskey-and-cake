Template.playerHand.helpers({
  
});

// player = Meteor.user()
player = Meteor.user()
Template.gameBoard.helpers({
  
  // allows the judge to pick the winning white card for the round  
  // chooseWinner: function(whiteCard){
  //   // only the judge for the round gets to choose the winner, and only if there are no cards left to be played for the round.
  //   // not sure if this can check for judge-ship though.

  //   if( !Meteor.userId().judge && round.cardsLeft === 0) {
  //     return;
  //   } else {
  //     // whatever user played the winning white card gets a point
  //     user['whiteCard.userId']['score'] += 1;

  //     //the round is now over
  //       // the judge property needs to rotate to the next user
  //       // the board needs to be cleared
  //       // 1 new white card needs to be dealt to each player aside from the previous judge
  //       // a new black card must be drawn
  //       // round.cardsPlayed & round.cardLeft need to be reset
  //       // round can be an object
  //       // round: {cardsPlayed: 0, cardsLeft: x, blackCard: blackCard, whiteCards: [whiteCards]}
  //   }
  // }

  // deal: function(){

  // }
  test: player.username,

  board: []

  // player: Meteor.user().username
    // username: Meteor.user().username

  // round: {
  //   cardsPlayed: 0,
  //   cardsLeft: (users - cardsPlayed),
  //   // judge: userId,
  //   cardsOnBoard: [whiteCard, whiteCard1]
  // }

})