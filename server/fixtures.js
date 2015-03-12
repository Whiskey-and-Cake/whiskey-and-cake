/**
 * Created by kate on 3/12/15.
 * Cmd line if meteor running on port 3000 already.
 * kill -9 `ps ax | grep node | grep meteor | awk '{print $1}'`
 */



if (BlackDeck.find().count() === 0) {
  for (var i=0; i<CardsMaster.length; i++) {
    if (CardsMaster[i]["cardType"] === "Black") {
      BlackDeck.insert({
        text: CardsMaster[i]["text"],
        expansion: CardsMaster[i]["expansion"],
      });
    }
  }
}

if (WhiteDeck.find().count() === 0) {
  for (var i=0; i<CardsMaster.length; i++) {
    if (CardsMaster[i]["cardType"] === "White") {
      WhiteDeck.insert({
        text: CardsMaster[i]["text"],
        expansion: CardsMaster[i]["expansion"],
      });
    }
  }
}