
if (Meteor.isClient) {

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  })

  //Template.body.helpers({
  //  user: function() {
  //    return Meteor.user()._id;
  //  }
  //
  //})
}



Meteor.subscribe('WhiteDeck');
Meteor.subscribe('BlackDeck');
Meteor.subscribe('PlayerHand');
Meteor.subscribe('GameBoard');
Meteor.subscribe("userData");