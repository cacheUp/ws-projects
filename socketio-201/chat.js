const express = require("express");
const app = express();
const socketio = require("socket.io");

app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(9000, () => {
  console.log("listening to 9000");
});

const io = socketio(expressServer);

io.on("connection", socket => {
  socket.emit("messageFromServer", { data: "Welcome to the socketio server" });
  socket.on("messageToServer", dataFromClient => {
    console.log(dataFromClient);
  });
  socket.on("newMessageToServer", msg => {
    // console.log(msg);
    // io.emit("messageToClients", { text: msg.text });
    io.of("/").emit("messageToClients", { text: msg.text });
  });
});

io.of("/admin").on("connection", socket => {
  console.log("Someone connected to admin namespace.");
  io.of("/admin").emit("welcome", "welcome to the admin channel");
});
