if (Meteor.isClient) {
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  })
}

Meteor.subscribe('WhiteDeck');
Meteor.subscribe('BlackDeck');
Meteor.subscribe('PlayerHand');
Meteor.subscribe('GameBoard');
Meteor.subscribe("userData");