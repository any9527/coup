class CoupUser {
  constructor(name) {
    this.name = name;
    this.coins = 0;
    this.cards = new Set();
    this.status = "pending";
  }

  updateStatus(status) {
    this.status = status;
  }

  addCoins(numOfCoins) {
    this.coins += numOfCoins;
  }

  removeCoins(numOfCoins) {
    if (this.coins - numOfCoins < 0) {
      this.coins = 0;
    } else {
      this.coins -= numOfCoins;
    }
  }

  addCards(cards) {
    cards.forEach(card => {
      this.cards.add(card);
    });
  }

  removeCard(name) {
    this.cards.delete(name);
  }

  print() {
    console.log("=============");
    console.log("name:", this.name);
    console.log("coins:", this.coins);
    console.log("cards:", this.cards);
    console.log("status:", this.status);
    console.log("=============");
  }
}

module.exports = CoupUser;
