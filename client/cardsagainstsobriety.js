
if (Meteor.isClient) {

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  }),

  Template.body.helpers({
    user: function() {
      return Meteor.user().username;
    }

  })
}

if (Meteor.isServer) {
  
  Meteor.startup(function () {
  });
}

Meteor.subscribe('WhiteDeck');
Meteor.subscribe('BlackDeck');
Meteor.subscribe('PlayerHand');
Meteor.subscribe('GameBoard');
Meteor.subscribe('Scoreboard');
//test
Meteor.subscribe("userData");