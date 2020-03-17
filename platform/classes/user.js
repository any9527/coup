class CoupUser {
  constructor(name) {
    this._name = name;
    this._coins = 0;
    this._cards = new Set();
    this._status = "pending";
  }

  updateStatus(status) {
    this._status = status;
  }

  addCoins(numOfCoins) {
    this._coins += numOfCoins;
  }

  removeCoins(numOfCoins) {
    if (this._coins - numOfCoins < 0) {
      this._coins = 0;
    } else {
      this._coins -= numOfCoins;
    }
  }

  addCards(cards) {
    cards.forEach(card => {
      this._cards.add(card);
    });
  }

  removeCard(name) {
    this._cards.delete(name);
  }

  print() {
    console.log("=============");
    console.log("name:", this._name);
    console.log("coins:", this._coins);
    console.log("cards:", this._cards);
    console.log("status:", this._status);
    console.log("=============");
  }
}

module.exports = CoupUser;
