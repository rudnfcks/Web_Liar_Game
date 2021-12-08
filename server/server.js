const http = require("http");
const fs = require("fs");
const io = require("socket.io");
const { profile } = require("console");

const server = http.createServer();
const port = 5000;
const sockets = io(server, {
  cors: {
    origin: "*",
    credential: true,
  },
});

// 변수 설정
let membersInfo = [];
let mafiaNumber = null;
let category = "";
let word = "";
let isTime = ""; // Talk, Vote, VoteResult, SelectWord

// 함수 설정
// 현재 날짜, 시간 추출
function getDate() {
  const now = new Date();

  const year = now.getFullYear();
  const month = ("0" + now.getMonth()).slice(-2);
  const day = ("0" + now.getDay()).slice(-2);
  const hours = ("00" + now.getHours()).slice(-2);
  const minutes = ("00" + now.getMinutes()).slice(-2);
  const seconds = ("00" + now.getSeconds()).slice(-2);

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
// Disconnect
const disconnect = (socket) => {
  let name;

  membersInfo = membersInfo.filter((element) => {
    if (element.socket === socket) {
      name = element.name;
      return false;
    } else {
      return true;
    }
  });

  name && console.log(`${getDate()} > [${name}] is Disconnect`);
};
// membersInfo
const getMembersInfo = () => {
  let lobbyInfo = [];

  membersInfo.map((data) => {
    const info = {
      name: data.name,
      img: data.img,
      commant: data.commant,
      voteCount: data.voteCount,
      isDead: data.isDead,
      isReady: data.isReady,
    };

    lobbyInfo.push(info);
  });

  for (let i = membersInfo.length; i < 8; i++) {
    lobbyInfo.push({});
  }

  return lobbyInfo;
};

// 소켓 설정
sockets.on("connection", (socket) => {
  // Join 시 실행
  socket.on("join", ({ profileImg, profileName }) => {
    if (membersInfo.length >= 8) {
      socket.emit("isFull", true);
      return;
    } else {
      socket.emit("isFull", false);

      const memberInfo = {
        socket: socket,
        name: profileName,
        img: profileImg,
        commant: "",
        voteCount: null,
        isDead: false,
        isReady: false,
      };

      membersInfo.push(memberInfo);
      console.log(`${getDate()} > [${profileName}] is Join`);
    }
  });

  // Lobby 시 실행
  socket.on("lobby", () => {
    sockets.emit("info", getMembersInfo());
  });

  // Disconnect 시 실행
  socket.on(["disconnect"], () => {
    disconnect(socket);
    sockets.emit("info", getMembersInfo());
  });
  socket.on("disconnection", () => {
    disconnect(socket);
    sockets.emit("info", getMembersInfo());
  });
});

server.listen(port, () => {
  console.log(`Socket Server is Running to ${port}...`);
});
