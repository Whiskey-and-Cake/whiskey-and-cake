Template.playerHand.helpers({
  
});

Template.gameBoard.helpers({
  // picks the winning white card for the round  
  chooseWinner: function(whiteCard){
    // only the judge for the round gets to choose the winner
    if( !Meteor.userId().judge ) {
      return;
    } else {
      // whatever user played the winning white card gets a point
      user['whiteCard.userId']['score'] += 1;
      //the round is now over
        // so the judge property needs to rotate one
        // the board needs to be cleared
        // 1 new white card needs to be dealt to each player aside from the previous judge
        // a new black card must be drawn
        // round.cardsPlayed & round.cardLeft need to be reset
        // round can be an object
        // round: {cardsPlayed: 0, cardsLeft: x, blackCard: blackCard, whiteCards: [whiteCards]}
    }
  }
})