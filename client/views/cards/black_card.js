Template.blackCard.helpers({
  //these functions are here because I don't have a card collection and just wanted to put something up on the template
  text: function () {
    return BlackCardData[0]['text'];
  },
  expansion: function () {
    return BlackCardData[0]['expansion']
  }
});

//test cardData
var BlackCardData = [
  {"id":642,"cardType":"Q","text":"When I pooped, what came out of my butt?","numAnswers":1,"expansion": "CAHe1"},
  {"id":643,"cardType":"Q","text":"In the distant future, historians will agree that _ marked the beginning of America's decline.","numAnswers":1,"expansion": "CAHe1"},
  {"id":644,"cardType":"Q","text":"In a pinch, _ can be a suitable substitute for _.","numAnswers":2,"expansion": "CAHe1"},
  {"id":645,"cardType":"Q","text":"What has been making life difficult at the nudist colony?","numAnswers":1,"expansion": "CAHe1"}    
]