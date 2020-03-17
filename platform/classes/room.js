const CoupDeck = require("./deck");

class CoupRoom {
  constructor(name, password, creator) {
    this._name = name;
    this._capacity = 6;
    this._users = new Set([creator]);
    this._password = password;
    this._deck = new CoupDeck();
    this.revealedCards = [];
    this._status = "pending";
    this._currentPlayerIdx = 0;
  }

  addUser(user) {
    this._users.add(user);
  }

  removeUser(user) {
    this._users.delete(user);
  }

  print() {
    console.log("=".repeat(30));
    console.log("room name:", this._name);
    this._users.forEach(user => {
      console.log("user:", user);
    });
    console.log("=".repeat(30));
  }

  _takeTurn() {}

  _checkNumReadyUsers() {
    count = 0;
    this._users.forEach(user => {
      if (user._status === "ready") {
        count += 1;
      }
    });
    return count;
  }

  _startGame() {
    if (this._status === "playing") return;
    if (this._checkNumReadyUsers() < 2) return;
    this._status = "playing";
    this._users.forEach(user => {
      user.addCoins(2);
      user.addCards(this._deck.drawCards(2));
    });
  }
}

module.exports = CoupRoom;
