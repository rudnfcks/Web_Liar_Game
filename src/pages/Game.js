import { useEffect, useState } from "react";
import { useHistory } from "react-router";

import ChatBox from "../components/ChatBox";
import GameBox from "../components/GameBox";
import PlayerPopup from "../components/PlayerPopup";

import style from "./css/Game.module.css";
import chatBoxstyle from "../components/css/ChatBox.module.css";

function Game({ socket }) {
  // 고정 변수
  const history = useHistory();

  // State 설정
  const [myInfo, setMyInfo] = useState({});
  const [players, setPlayers] = useState([]);
  const [chatting, setChatting] = useState([]);
  const [word, setWord] = useState({});
  const [turn, setTurn] = useState(null);
  const [inputCommand, setInputCommand] = useState("");
  const [voteTime, setVoteTime] = useState(false);
  const [isVote, setIsVote] = useState(false);
  const [voteResult, setVoteResult] = useState(null);
  const [voteResultTimer, setVoteResultTimer] = useState(3);

  // Effect 설정
  useEffect(() => {
    // socket 정보 요청
    socket.emit("turn");
    socket.emit("word");
    socket.emit("membersInfo");
    socket.emit("myInfo");

    // 내 정보 가져오기
    socket.on("myInfo", (info) => {
      setMyInfo(info);
    });
    // 모든 플레이어 정보 가져오기
    socket.on("membersinfo", (info) => {
      setPlayers(info);
    });
    socket.on("word", (word) => {
      setWord(word);
    });
    // 턴 숫자 가져오기
    socket.on("turn", (number) => {
      setTurn(number);
    });
    // 모두가 이야기를 했을 경우
    socket.on("voteTime", (value) => {
      setVoteTime(value);
    });
    socket.on("voteResult", (value) => {
      setVoteResult(value);
    });
    socket.on("voteResultTimer", (value) => {
      setVoteResultTimer(value);
    });

    // 채팅 기능 구현
    socket.on("chatting", (data) => {
      setChatting((current) => [...current, data]);

      const chatBox = document.getElementsByClassName(
        chatBoxstyle.chattingBox
      )[0];
      chatBox.scrollTop = chatBox.scrollHeight;
    });
  }, [socket]);
  useEffect(() => {
    // 내 정보가 없다면 Join으로 이동
    if (!myInfo) {
      document.location.href = "/join";
    }
  }, [myInfo]);

  // 함수 설정
  // chatting 전송
  const chattingBtnClickHandler = (chatData) => {
    socket.emit("chatting", chatData);
  };
  // command 변경
  const inputCommandChangeHandler = (event) => {
    setInputCommand(event.currentTarget.value);
  };
  // command 전송
  const CommandSubmitHandler = (event) => {
    event.preventDefault();

    if (turn === myInfo.index) {
      socket.emit("commant", { index: myInfo.index, commant: inputCommand });
      setInputCommand("");
    } else {
      alert("아직 차례가 아니에요");
      setInputCommand("");
    }
  };
  // 투표 Socket
  const votePlayer = (number) => {
    if (!isVote) {
      socket.emit("vote", { number: number, index: myInfo.index });
      setIsVote(true);
      return true;
    } else {
      return false;
    }
  };

  return (
    <div id="wrap">
      <ChatBox data={chatting} info={myInfo} send={chattingBtnClickHandler} />
      <section className={style.contentBox}>
        <h1>
          {voteTime ? "투표 시간" : "이야기 시간"}
          <span>
            ({myInfo && myInfo.isMafia ? "라이어" : `단어 : ${word.word}`})
          </span>
        </h1>
        <div className={style.gameBox}>
          {players.map((data, key) => (
            <GameBox
              index={key}
              img={data.img}
              name={data.name}
              word={word.category}
              content={data.commant}
              isDead={data.isDead}
              isVoteTime={voteTime}
              voteCount={data.voteCount}
              votePlayer={votePlayer}
              key={key}
            />
          ))}
        </div>
        <form
          id={style.gameForm}
          className={turn === (myInfo && myInfo.index) ? style.isTurn : ""}
          onSubmit={CommandSubmitHandler}
        >
          <div>
            <h3>이 {word && word.category} 은/는</h3>
            <input
              type="text"
              value={inputCommand}
              onChange={inputCommandChangeHandler}
            />
            <h3>{word && word.category} 입니다.</h3>
          </div>
          <button>확인</button>
        </form>
        {voteResult !== null && (
          <PlayerPopup
            img={players[voteResult].img}
            name={players[voteResult].name}
            isMafia={players[voteResult].isMafia}
            count={voteResultTimer}
          />
        )}
      </section>
    </div>
  );
}

export default Game;
