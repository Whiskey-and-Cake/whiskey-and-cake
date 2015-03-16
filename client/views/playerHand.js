
Template.playerHand.helpers({
    // userId: userId,

    

    handCards: [
      {"cardType":"White","text":"Michelle Obama's arms.","expansion": "Base"},
      {"cardType":"White","text":"German dungeon porn.","expansion": "Base"},
      {"cardType":"White","text":"White people.","expansion": "Base"},
      {"cardType":"White","text":"Getting so angry that you pop a boner.","expansion": "Base"},
      {"cardType":"White","text":"An asymmetric boob job.","expansion": "Base"}
    ]

});

Template.playerHand.events({
  "click .testing123": function(){
    console.log('BAM BAM BAM');
    Meteor.call("playCard");
  }
});

Meteor.methods({
  playCard: function(){
    console.log('playcard called');
    board.push('Hello World');
  }
});


