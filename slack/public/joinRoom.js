function joinRoom(roomName) {
  // send this room name to server
  nsSocket.emit("joinRoom", roomName, newNumberOfMembers => {
    console.log(newNumberOfMembers);
    document.querySelector(
      ".curr-room-num-users"
    ).innerHTML = `${newNumberOfMembers} <span class="glyphicon glyphicon-user"></span
  >`;
  });
  nsSocket.on("historyCatchUp", history => {
    const messagesUl = document.querySelector("#messages");
    messagesUl.innerHTML = "";
    history.forEach(msg => {
      const newMessage = buildHTML(msg);
      const currentMessages = messagesUl.innerHTML;
      messagesUl.innerHTML = currentMessages + newMessage;
    });
    messagesUl.scrollTo(0, messagesUl.scrollHeight);
  });
  nsSocket.on("updateMembers", numMembers => {
    document.querySelector(
      ".curr-room-num-users"
    ).innerHTML = `${numMembers} <span class="glyphicon glyphicon-user"></span
    >`;
    document.querySelector(".curr-room-text").innerText = `${roomName} 
      `;
  });

  let searchBox = document.querySelector("#search-box");
  searchBox.addEventListener("input", e => {
    let messages = Array.from(document.getElementsByClassName("message-text"));
    console.log(messages);
    messages.forEach(msg => {
      if (
        msg.innerText.toLowerCase().indexOf(e.target.value.toLowerCase()) === -1
      ) {
        msg.style.display = "none";
      } else {
        msg.style.display = "block";
      }
    });
  });
}
