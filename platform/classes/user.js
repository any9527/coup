class CoupUser {
  constructor(name) {
    this._name = name;
    this._coins = 0;
    this._roles = [];
    this._room = "";
  }

  print() {
    console.log("=============");
    console.log("name:", this._name);
    console.log("=============");
  }
}

module.exports = CoupUser;
