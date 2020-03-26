const CoupPlatform = require("./classes/platform");

const start = io => {
  const platform = new CoupPlatform(io);
  platform.start();
};

module.exports = start;
