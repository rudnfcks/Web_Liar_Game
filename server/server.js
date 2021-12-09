const http = require("http");
const fs = require("fs");
const io = require("socket.io");

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
let word = { category: "", word: "" };
let isGamePlaying = false;
let isTurn = 0;
let voteCount = 0;
let data;

// 데이터 준비
fs.readFile("./Data.json", "utf-8", (error, jsonfile) => {
  if (error) {
    return console.log(error);
  }

  data = JSON.parse(jsonfile);
});

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
      isMafia: data.isMafia,
    };

    lobbyInfo.push(info);
  });

  for (let i = membersInfo.length; i < 8; i++) {
    lobbyInfo.push({});
  }

  return lobbyInfo;
};
const getMyInfo = (socket) => {
  let info;

  membersInfo.map((data, key) => {
    if (data.socket === socket) {
      info = {
        index: key,
        name: data.name,
        img: data.img,
        commant: data.commant,
        voteCount: data.voteCount,
        isDead: data.isDead,
        isReady: data.isReady,
        isMafia: data.isMafia,
      };
    }
  });

  return info;
};
const gameStartCount = (num) => {
  setTimeout(() => {
    if (!num) {
      sockets.emit("gameStart");
    } else {
      sockets.emit("lobbyCount", num);
    }
    console.log(`${getDate()} > Game is Start Count : ${num}`);
  }, (3 - num) * 1000);
};

// 소켓 설정
sockets.on("connection", (socket) => {
  // Join 시 실행
  socket.on("join", ({ profileImg, profileName }) => {
    if (membersInfo.length === 0) {
      isGamePlaying = false;
    }

    if (membersInfo.length >= 8) {
      socket.emit("isJoin", {
        isJoin: false,
        content: "이미 방이 가득 찼어요",
      });
      return;
    } else if (isGamePlaying) {
      socket.emit("isJoin", {
        isJoin: false,
        content: "이미 게임이 시작됐어요",
      });
    } else {
      socket.emit("isJoin", {
        isJoin: true,
      });

      const memberInfo = {
        socket: socket,
        name: profileName,
        img: profileImg,
        commant: "",
        voteCount: 0,
        isDead: false,
        isReady: false,
        isMafia: false,
      };

      membersInfo.push(memberInfo);
      console.log(`${getDate()} > [${profileName}] is Join`);
    }
  });

  // 멤버 정보 요청
  socket.on("membersInfo", () => {
    sockets.emit("membersinfo", getMembersInfo());
  });
  // 본인 정보 요청
  socket.on("myInfo", () => {
    socket.emit("myInfo", getMyInfo(socket));
  });

  // 레디 할 경우
  socket.on("ready", (value) => {
    let name = "";
    let ready = value;

    membersInfo.map((item, index) => {
      if (item.socket === socket) {
        membersInfo[index].isReady = ready;
        name = membersInfo[index].name;
      }
    });

    // 레디 여부 로그
    console.log(`${getDate()} > [${name}] is ${ready ? "Ready" : "UnReady"}`);

    // 데이터 전달
    sockets.emit("membersinfo", getMembersInfo());
    socket.emit("myInfo", getMyInfo(socket));

    // 모두 레디 하였는지 판단
    let isAllReady = true;

    if (membersInfo.length >= 4) {
      membersInfo.map((data) => {
        if (data.isReady === false) {
          isAllReady = false;
        }
      });
    } else {
      isAllReady = false;
    }

    // 모두 레디 하였을 경우
    if (isAllReady) {
      // 마피아 지정
      mafiaNumber = Math.floor(Math.random() * membersInfo.length);
      membersInfo[mafiaNumber].isMafia = true;

      // 단어 지정
      const categoryIndex = Math.floor(Math.random() * data.length);
      const wordIndex = Math.floor(
        Math.random() * data[categoryIndex].카테고리.length
      );

      word.category = data[categoryIndex].카테고리;
      word.word = data[categoryIndex].단어[wordIndex];

      // 게임 시작 카운트 다운
      for (let i = 3; i >= 0; i--) {
        gameStartCount(i);
      }
      isGamePlaying = true;
    }
  });

  // Game 에서 사용할 socket
  // 게임 시작 후 단어 요청
  socket.on("word", () => {
    socket.emit("word", word);
  });
  // 턴 숫자 요청
  socket.on("turn", () => {
    socket.emit("turn", isTurn);
  });
  socket.on("commant", ({ index, commant }) => {
    membersInfo[index].commant = commant;
    isTurn++;

    if (isTurn < membersInfo.length) {
      if (membersInfo[isTurn].isDead === true) {
        isTurn++;
      }
    }

    sockets.emit("turn", isTurn);
    sockets.emit("membersinfo", getMembersInfo());

    console.log(`${getDate()} > Game Commant is : ${commant}`);
    console.log(`${getDate()} > Game Turn is : ${isTurn}`);

    if (isTurn >= membersInfo.length) {
      setTimeout(() => {
        sockets.emit("voteTime", true);
        console.log(`${getDate()} > Game is Vote Time`);
      }, 3000);
    }
  });
  socket.on("vote", ({ number, index }) => {
    if (index === 0) {
      addVoteIndex = number;
    }

    membersInfo[number].voteCount++;
    voteCount++;

    sockets.emit("membersinfo", getMembersInfo());
    console.log(`${getDate()} > Member is Vote to ${membersInfo[number].name}`);

    // 투표가 종료될 경우
    if (voteCount >= membersInfo.length) {
      let max = 0;
      let maxMembers = [];

      membersInfo.map((data) => {
        if (data.voteCount > max) {
          max = data.voteCount;
        }
      });

      membersInfo.map((data, index) => {
        if (data.voteCount === max) {
          maxMembers.push(index);
        }
      });

      // 동수표가 나왔을 경우
      if (maxMembers.length >= 2) {
        isTurn = 0;
        voteCount = 0;

        for (let i = 0; i < membersInfo.length; i++) {
          membersInfo[i].commant = "";
        }

        console.log(`${getDate()} > Game Commant is : ${commant}`);
        console.log(`${getDate()} > Game Turn is : ${isTurn}`);
      }
      // 동수표가 나오지 않았을 경우
      else {
        sockets.emit("voteResult", maxMembers[0]);

        for (let i = 3; i >= 0; i--) {
          setTimeout(() => {
            sockets.emit("voteResultTimer", i);
          }, (3 - i) * 1000);
        }

        // 투표한 사람이 마피아가 맞다면
        if (membersInfo[maxMembers[0]].isMafia == true) {
          sockets.emit("voteResult", null);
        }
        // 투표한 사람이 마피아가 아니라면
        else {
          membersInfo[maxMembers[0]].isDead = true;
          isTurn = 0;
          voteCount = 0;

          for (let i = 0; i < membersInfo.length; i++) {
            membersInfo[i].commant = "";
          }
        }
      }
    }
  });

  // Chatting 기능 구현
  socket.on("chatting", (data) => {
    console.log(`${getDate()} > [${data.name}] is Chatting : ${data.content}`);
    sockets.emit("chatting", data);
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
