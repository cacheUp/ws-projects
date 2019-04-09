function joinRoom(roomName) {
  // send this room name to server
  nsSocket.emit("joinRoom", roomName, newNumberOfMembers => {
    console.log(newNumberOfMembers);
    document.querySelector(
      ".curr-room-num-users"
    ).innerHTML = `${newNumberOfMembers} <span class="glyphicon glyphicon-user"></span
  >`;
  });
}