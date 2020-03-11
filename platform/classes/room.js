const CoupDeck = require("./deck");

class CoupRoom {
  constructor(name, password, creatorId) {
    this._name = name;
    this._capacity = 6;
    this._userIds = new Set([creatorId]);
    this._password = password;
    this._deck = new CoupDeck();
    this._status = "pending";
  }

  addUser(userId) {
    this._userIds.add(userId);
  }

  removeUser(userId) {
    this._userIds.delete(userId);
  }

  print() {
    console.log("=".repeat(30));
    console.log("room name:", this._name);
    this._userIds.forEach(userId => {
      console.log("userId:", userId);
    });
    console.log("=".repeat(30));
  }
}

module.exports = CoupRoom;
