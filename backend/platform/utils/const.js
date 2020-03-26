const { deepFreeze } = require("./methods");

const ACTIONS = {
  exchange: {
    name: "Exchange",
    description: "",
    counterActions: ["Challenge"],
    roles: ["Ambassador"],
    gain: 0,
    loss: 0
  },
  assassinate: {
    name: "Assassinate",
    description: "",
    counterActions: ["Blocks Assassination", "Challenge"],
    roles: ["Assassin"],
    gain: 0,
    loss: 3
  },
  blocksAssassination: {
    name: "Blocks Assassination",
    description: "",
    counterActions: ["Challenge"],
    roles: ["Contessa"],
    gain: 0,
    loss: 0
  },
  challenge: {
    name: "Challenge",
    description: "",
    counterActions: [],
    roles: [],
    gain: 0,
    loss: 0
  },
  steal: {
    name: "Steal",
    description: "",
    counterActions: ["Blocks Stealing", "Challenge"],
    roles: ["Captain"],
    gain: 2,
    loss: 0
  },
  blocksStealing: {
    name: " Blocks Stealing",
    description: "",
    counterActions: ["Challenge"],
    roles: ["Ambassador", "Captain"],
    gain: 0,
    loss: 0
  },
  tax: {
    name: "Tax",
    description: "",
    counterActions: ["Challenge"],
    roles: ["Duke"],
    gain: 3,
    loss: 0
  },
  foreignAid: {
    name: "Foreign Aid",
    description: "",
    counterActions: ["Blocks Foreign Aid", "Challenge"],
    roles: [],
    gain: 2,
    loss: 0
  },
  blocksForeignAid: {
    name: "Blocks Foreign Aid",
    description: "",
    counterActions: ["Challenge"],
    roles: ["Duke"],
    gain: 0,
    loss: 0
  },
  drawIncome: {
    name: "Draw Income",
    description: "",
    counterActions: [],
    roles: [],
    gain: 1,
    loss: 0
  },
  coup: {
    name: "Coup",
    description: "",
    counterActions: [],
    roles: [],
    gain: 0,
    loss: 7
  }
};

const CARDS = [
  "Assassin",
  "Assassin",
  "Assassin",
  "Captain",
  "Captain",
  "Captain",
  "Ambassador",
  "Ambassador",
  "Ambassador",
  "Duke",
  "Duke",
  "Duke",
  "Contessa",
  "Contessa",
  "Contessa"
];

module.exports = { ACTIONS: deepFreeze(ACTIONS), CARDS };
