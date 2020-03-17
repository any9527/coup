const CoupUser = require("./user");
const CoupRoom = require("./room");

class CoupPlatform {
  constructor(io) {
    this._rooms = {}; // { roomName: Room, .. }
    this._users = {}; // { socketId: User, .. }
    this._namespace = process.env.NAMESPACE || "US";
    this._io = io.of(this._namespace);
  }

  init() {
    this._io.on("connection", socket => {
      console.log("connected", this._users[socket.id]);

      socket.on("system.add_user", ({ username }) => {
        if (!username) return;
        const user = new CoupUser(username);
        user.print();
        this._users[socket.id] = user;
        this.print();
      });

      socket.on("system.add_room", ({ roomName, password }) => {
        if (!roomName) return;
        if (this._rooms[roomName]) return { err: "room exists" };
        const room = new CoupRoom(roomName, password, this._users[socket.id]);
        room.print();
      });

      socket.on("room.add_user", ({ roomName }) => {
        if (!roomName) return;
        const room = this._rooms[roomName];
        if (!room) return;
        room.addUser(this._users[socket.id]);
      });

      socket.on("room.remove_user", ({ roomName }) => {
        if (!roomName) return;
        const room = this._rooms[roomName];
        if (!room) return;
        room.removeUser(this._users[socket.id]);
      });

      socket.on("disconnect", () => {
        const user = this._users[socket.id];
        if (!user) return;
        delete this._users[socket.id];
        this.print();
      });
    });
  }

  start() {
    this.init();
  }

  print() {
    console.log("@".repeat(30));
    console.log("Users: ");
    Object.keys(this._users).map(socketId => {
      console.log("name:", this._users[socketId]);
    });
    console.log("@".repeat(30));
  }
}

module.exports = CoupPlatform;
