require("dotenv").config();

const port = process.env.PORT || 4001;
const namespace = process.env.NAMESPACE || "US";
const BACKEND_URL = `http://127.0.0.1:${port}/${namespace}`;
console.log("BACKEND_URL:", BACKEND_URL);

const socket = require("socket.io-client")(BACKEND_URL);

setTimeout(() => {
  socket.emit("system.add_user", { username: "andy" });
}, 1000);

setTimeout(() => {
  socket.emit("system.add_room", { roomName: "room1" });
}, 2000);
