require("dotenv").config();

const port = process.env.PORT || 4001;
const app = require("express")();
const http = require("http");
const socketIo = require("socket.io");

const server = http.createServer(app);
const io = socketIo(server);

const startPlatform = require("./platform");

startPlatform(io);

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
