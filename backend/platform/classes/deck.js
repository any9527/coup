const { CARDS } = require("../utils/const");
const { shuffle } = require("../utils/methods.js");

class CoupDeck {
  constructor(type = "regular") {
    this.deck = [];
    this._generateDeck();
  }

  drawCards(numOfCards) {
    const cards = [];
    for (let i = 0; i < numOfCards; i++) {
      if (!this.deck.length) break;
      cards.push(this.deck.pop());
    }
    this._shuffleDeck();
    return cards;
  }

  returnCards(cards) {
    this.deck.push(...cards);
    this._shuffleDeck();
  }

  _generateDeck() {
    this.deck = shuffle(CARDS);
  }

  _shuffleDeck() {
    this.deck = shuffle(deck);
  }
}

module.exports = CoupDeck;
