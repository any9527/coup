const CoupPlatform = require("./classes/platform");

const start = io => {
  let platform = new CoupPlatform(io);
  platform.start();
};

module.exports = start;
