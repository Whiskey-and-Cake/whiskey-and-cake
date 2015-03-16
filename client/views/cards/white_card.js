Template.whiteCard.helpers({
  //these functions are here because I don't have a card collection and just wanted to put something up on the template
  text: function () {
    return WhiteCards[0]['text'];
  },
  expansion: function () {
    return WhiteCards[0]['expansion']
  }
});

//test data
WhiteCards = [
{"id":409,"cardType":"A","text":"An asymmetric boob job.","numAnswers":0,"expansion": "Base"}
]