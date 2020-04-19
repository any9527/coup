const CoupUser = require("./user");
const CoupRoom = require("./room");

// const clients = {};

class CoupPlatform {
  constructor(io) {
    this.rooms = {}; // { roomId: Room, .. }
    this.users = {}; // { userId: User }
    this.namespace = process.env.NAMESPACE || "US";
    this.io = io.of(this.namespace);

    this.sendUsers = this.sendUsers.bind(this);
    this.sendRooms = this.sendRooms.bind(this);
    this.sendRoom = this.sendRoom.bind(this);
  }

  sendUsers(socket, broadcastExceptSelf = true) {
    console.log("sendUsers called");
    const eventType = "system.get_users";
    const data = {
      users: Object.values(this.users).map((u) => ({
        id: u.id,
        name: u.getName(),
      })),
    };
    console.log("users data:", data);
    if (socket) {
      if (broadcastExceptSelf) {
        socket.broadcast.emit(eventType, data);
      } else {
        socket.emit(eventType, data);
      }
    } else {
      this.io.emit(eventType, data);
    }
  }

  sendRooms(socket, broadcastExceptSelf = true) {
    console.log("sendRooms called");
    const eventType = "system.get_rooms";
    const data = {
      rooms: Object.values(this.rooms).map((r) => ({
        id: r.id,
        name: r.getName(),
      })),
    };
    console.log("users data:", data);
    if (socket) {
      if (broadcastExceptSelf) {
        socket.broadcast.emit(eventType, data);
      } else {
        socket.emit(eventType, data);
      }
    } else {
      this.io.emit(eventType, data);
    }
  }

  sendRoom(roomId, socket, broadcastExceptSelf = false) {
    console.log("roomId:", roomId);
    const room = this.rooms[roomId];
    if (!room) {
      console.log("room invalid");
      return;
    }
    const type = "system.get_room";
    const users = room.getUsers();
    console.log("users:", users);
    if (!socket) {
      this.io.in(roomId).emit(type, { users });
    } else if (broadcastExceptSelf) {
      socket.to(roomId).emit(type, { users });
    } else {
      socket.emit(type, { users });
    }
  }

  replaceUserSocket(userId, socket) {
    console.log("\nreplace user socket");
    console.log("userId:", userId);
    console.log("socket:", socket.id);
    const user = this.users[userId];
    if (!user) {
      console.log("user not found, ignore");
      return;
    }
    console.log("found this user:", user.name);
    user.setSocket(socket);
  }

  //
  logOutUser(userId, socket) {
    console.log("logOutUser:", userId);
    // delete user
    delete this.users[userId];
    this.print();
    this.sendUsers(socket);
  }

  init() {
    this.io.on("connection", (socket) => {
      console.log("socket connected:", socket.id);
      if (socket.handshake.query.userId) {
        this.replaceUserSocket(socket.handshake.query.userId, socket);
      }
      // socket.emit("connection", { connected: true });

      // if user provides userId, then it's connected before
      // replace the user's socket with new one
      socket.on("system.add_user", ({ username }) => {
        console.log("### username:", username);
        if (!username) return;
        const user = new CoupUser(username, socket);
        this.users[user.id] = user;
        socket.emit("system.add_user", { id: user.id });
        console.log("socket emit syste.add_user");
        this.print();
        this.sendUsers(socket);
      });

      socket.on("system.get_users", () => {
        this.sendUsers(socket, false);
      });

      socket.on("system.get_rooms", () => {
        this.sendRooms(socket, false);
      });

      socket.on("system.get_room", ({ roomId }) => {
        this.sendRoom(roomId, socket, true);
      });

      socket.on("system.add_room", ({ roomName, password, userId }) => {
        if (!roomName) return;
        const room = new CoupRoom(roomName, password, this.users[userId]);
        const roomId = room.getId();
        socket.emit("system.add_room", { id: roomId });
        this.rooms[roomId] = room;
        this.sendRooms(socket);
        room.print();
      });

      socket.on("room.add_user", ({ roomId, userId }) => {
        if (!roomId) return;
        const room = this.rooms[roomId];
        if (!room) return;
        room.addUser(this.users[userId]);
        socket.emit("room.add_user", {});
        this.sendRoom(roomId, false);
      });

      socket.on("room.remove_user", ({ roomName }) => {
        if (!roomName) return;
        const room = this.rooms[roomName];
        if (!room) return;
        room.removeUser(this.users[socket.id]);
      });

      socket.on("disconnect", () => {
        console.log("socket disconnect:", socket.id);
        // on disconnect, only delete the old socket
        // not deleting the user, because user might reconnect immediately
        // due to refresh or bad network connection
        this.print();
        // this.sendUsers();
      });

      socket.on("system.log_out", ({ userId }) => {
        this.logOutUser(userId, socket);
      });
    });
  }

  start() {
    this.init();
  }

  print() {
    console.log("@".repeat(30));
    console.log("Users: ", Object.keys(this.users).length);
    Object.keys(this.users).forEach((userId) => {
      console.log("name:", this.users[userId].getName());
    });
    console.log("@".repeat(30));
  }
}

module.exports = CoupPlatform;
