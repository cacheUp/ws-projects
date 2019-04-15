const io = require("../server").io;
const Orb = require("./classes/Orb");
// ========== CLASSES ======================
const Player = require("./classes/Player");
const PlayerData = require("./classes/PlayerData");
const PlayerConfig = require("./classes/PlayerConfig");

let orbs = [];
let players = [];
let settings = {
  defaultOrbs: 500,
  defaultSpeed: 6,
  defaultSize: 6,
  defaultZoom: 1.5,
  worldWidth: 500,
  worldHeight: 500
};
initGame();

io.sockets.on("connect", socket => {
  socket.on("init", data => {
    let playerConfig = new PlayerConfig(settings);
    let playerData = new PlayerData(data.playerName, settings);
    let player = new Player(socket.id, playerConfig, playerData);
    socket.emit("initReturn", {
      orbs
    });
    players.push(playerData);
  });
});

function initGame() {
  for (let i = 0; i < settings.defaultOrbs; i++) {
    orbs.push(new Orb(settings));
  }
}

module.exports = io;
