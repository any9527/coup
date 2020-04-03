const CoupUser = require("./user");
const CoupRoom = require("./room");

const clients = {};

class CoupPlatform {
  constructor(io) {
    this.rooms = {}; // { roomName: Room, .. }
    this.users = {}; // { socketId: User, .. }
    this.namespace = process.env.NAMESPACE || "US";
    this.io = io.of(this.namespace);
  }

  init() {
    this.io.on("connection", socket => {
      console.log("user connected", socket.id);
      clients[socket.id] = socket;

      const sendUsers = () => {
        this.io.emit("system.get_users", {
          users: Object.values(this.users).map(u => u.getName())
        });
      };

      socket.emit("connection", { connected: true });

      socket.on("system.add_user", ({ username }) => {
        if (!username) return;
        const user = new CoupUser(username);
        user.print();
        this.users[socket.id] = user;
        this.print();
        sendUsers();
      });

      socket.on("system.get_users", sendUsers);

      socket.on("system.add_room", ({ roomName, password }) => {
        if (!roomName) return;
        const room = new CoupRoom(roomName, password, this.users[socket.id]);
        room.emit("system.add_room", { id: room.getId() });
        room.print();
      });

      socket.on("room.add_user", ({ roomName }) => {
        if (!roomName) return;
        const room = this.rooms[roomName];
        if (!room) return;
        room.addUser(this.users[socket.id]);
      });

      socket.on("room.remove_user", ({ roomName }) => {
        if (!roomName) return;
        const room = this.rooms[roomName];
        if (!room) return;
        room.removeUser(this.users[socket.id]);
      });

      socket.on("disconnect", () => {
        const user = this.users[socket.id];
        if (!user) return;
        delete this.users[socket.id];
        this.print();
        sendUsers();
        delete clients[socket.id];
      });

      socket.on("system.log_out", () => {
        console.log("log out:", socket.id);
        const user = this.users[socket.id];
        if (!user) return;
        delete this.users[socket.id];
        this.print();
        sendUsers();
      });
    });
  }

  start() {
    this.init();
  }

  print() {
    console.log("@".repeat(30));
    console.log("Users: ");
    Object.keys(this.users).forEach(socketId => {
      console.log("name:", this.users[socketId]);
    });
    console.log("@".repeat(30));
  }
}

module.exports = CoupPlatform;
