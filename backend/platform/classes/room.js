const uuid = require("uuid");
const CoupDeck = require("./deck");

class CoupRoom {
  constructor(name, password, creator) {
    this.id = uuid();
    this.name = name;
    this.capacity = 6;
    this.users = new Set([creator]);
    this.password = password;
    this.deck = new CoupDeck();
    this.revealedCards = [];
    this.status = "pending";
    this.currentPlayerIdx = 0;
  }

  getId() {
    return this.id;
  }

  addUser(user) {
    this.users.add(user);
  }

  removeUser(user) {
    this.users.delete(user);
  }

  print() {
    console.log("=".repeat(30));
    console.log("room name:", this.name);
    this.users.forEach(user => {
      console.log("user:", user);
    });
    console.log("=".repeat(30));
  }

  //   takeTurn() {}

  checkNumReadyUsers() {
    let count = 0;
    this.users.forEach(user => {
      if (user.status === "ready") {
        count += 1;
      }
    });
    return count;
  }

  startGame() {
    if (this.status === "playing") return;
    if (this.checkNumReadyUsers() < 2) return;
    this.status = "playing";
    this.users.forEach(user => {
      user.addCoins(2);
      user.addCards(this.deck.drawCards(2));
    });
  }
}

module.exports = CoupRoom;
