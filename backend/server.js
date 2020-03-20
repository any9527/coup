require("dotenv").config();
const port = process.env.PORT || 4001;
var app = require("express")();
var http = require("http");
const socketIo = require("socket.io");
const server = http.createServer(app);
const io = socketIo(server);

const startPlatform = require("./platform");
startPlatform(io);

app.get("/", function(req, res) {
  res.send("<h1>Hello world</h1>");
});

server.listen(port, function() {
  console.log(`listening on *:${port}`);
});
