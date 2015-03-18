WhiteDeck = new Meteor.Collection("WhiteDeck");

DealHands = function() {
  PlayerHand = new Meteor.Collection("PlayerHand");
  Meteor.call('DealHand', function(err, res) {
    Session.set('serverResponse', res);
  });
};

DrawCards = function() {
  Meteor.call('DrawCards', function(err, res) {
    Session.set('serverResponse', res);
  });
};

