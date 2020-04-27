const uuid = require("uuid/v4");

class CoupUser {
  constructor(name, socket) {
    this.id = uuid();
    this.name = name;
    this.socket = socket;
    this.coins = 0;
    this.cards = new Set();
    this.status = "pending";
  }

  setSocket(socket) {
    this.socket = socket;
  }

  joinRoom(roomId) {
    this.socket.join(roomId);
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

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
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
