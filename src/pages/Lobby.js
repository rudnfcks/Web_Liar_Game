import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import ChatBox from "../components/ChatBox";
import PlayerBox from "../components/PlayerBox";

import style from "./css/Lobby.module.css";
import chatBoxstyle from "../components/css/ChatBox.module.css";

function Lobby({ socket }) {
  // 고정 변수
  const history = useHistory();

  // State 설정
  const [myInfo, setMyInfo] = useState({});
  const [players, setPlayers] = useState([]);
  const [chatting, setChatting] = useState([]);
  const [count, setCount] = useState(null);

  // Effect 설정
  useEffect(() => {
    // socket 정보 요청
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
    // 채팅 기능 구현
    socket.on("chatting", (data) => {
      setChatting((current) => [...current, data]);

      const chatBox = document.getElementsByClassName(
        chatBoxstyle.chattingBox
      )[0];
      chatBox.scrollTop = chatBox.scrollHeight;
    });
    // 게임 시작 카운트
    socket.on("lobbyCount", (value) => {
      setCount(value);
    });
  }, [socket]);
  useEffect(() => {
    // 내 정보가 없다면 Join으로 이동
    if (!myInfo) {
      document.location.href = "/join";
    }
  }, [myInfo]);
  useEffect(() => {
    // 게임 시작 신호
    socket.on("gameStart", () => {
      history.replace("/game");
    });
  }, [socket, history]);

  // 함수 설정
  // Ready
  const readyBtnClickHandler = () => {
    socket.emit("ready", !myInfo.isReady);
  };
  // chatting 전송
  const chattingBtnClickHandler = (chatData) => {
    socket.emit("chatting", chatData);
  };

  return (
    <div id="wrap">
      <ChatBox data={chatting} info={myInfo} send={chattingBtnClickHandler} />
      <section className={style.contentBox}>
        <h1>참여자</h1>
        <div className={style.playerBox}>
          {
            // 플레이어가 있다면
            players &&
              players.map((item, key) => (
                <PlayerBox
                  img={item.img}
                  name={item.name}
                  isReady={item.isReady}
                  key={key}
                />
              ))
          }
        </div>
        <button onClick={readyBtnClickHandler}>
          {
            // 내 정보가 있다면
            myInfo && myInfo.isReady ? "UNREADY" : "READY"
          }
        </button>
        {count !== null && (
          <div className={style.countPopup}>
            <h1>{count}</h1>
          </div>
        )}
      </section>
    </div>
  );
}

export default Lobby;
