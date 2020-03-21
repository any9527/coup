const { CARDS } = require("../utils/const");
const { shuffle } = require("../utils/methods.js");

class CoupDeck {
  constructor(type = "regular") {
    this.deck = [];
    this.generateDeck();
  }

  drawCards(numOfCards) {
    const cards = [];
    for (let i = 0; i < numOfCards; i += 1) {
      if (!this.deck.length) break;
      cards.push(this.deck.pop());
    }
    this.shuffleDeck();
    return cards;
  }

  returnCards(cards) {
    this.deck.push(...cards);
    this.shuffleDeck();
  }

  generateDeck() {
    this.deck = shuffle(CARDS);
  }

  shuffleDeck() {
    this.deck = shuffle(this.deck);
  }
}

module.exports = CoupDeck;
