const uuid = require("uuid/v4");
const CoupDeck = require("./deck");

class CoupRoom {
  constructor(name, password, creator) {
    this.id = uuid();
    this.name = name;
    this.capacity = 6;
    this.creatorId = creator.id;
    this.users = new Set([creator]);
    this.password = password;
    this.deck = new CoupDeck();
    this.revealedCards = [];
    this.status = "pending";
    this.currentPlayerIdx = 0;
    this.initSocket(creator);
  }

  initSocket(user) {
    user.joinRoom(this.id);
    user.socket.on("room.start_game", () => {
      console.log("ROOM.START_GAME");
      this.startGame();
      const users = this.getUsers();
      // send to everyone
      this.users.forEach(u => {
        u.socket.emit("room.game_started", { users, status: this.status });
      });
    });
  }

  getUsers() {
    const users = [];
    this.users.forEach(u =>
      users.push({
        id: u.id,
        name: u.name,
        status: u.status,
        coins: u.coins,
        cards: Array.from(u.cards)
      })
    );
    return users;
  }

  addUser(user) {
    this.users.add(user);
    this.initSocket(user);
  }

  removeUser(user) {
    this.users.delete(user);
  }

  print() {
    console.log("=".repeat(30));
    console.log("room name:", this.name);
    this.users.forEach(user => {
      console.log("user:", user.id, user.name);
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
