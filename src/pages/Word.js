import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import ChatBox from "../components/ChatBox";
import EndingPopup from "../components/EndingPopup";
import WordBox from "../components/WordBox";

import style from "./css/Word.module.css";
import chatBoxstyle from "../components/css/ChatBox.module.css";

function Word({ socket }) {
  // 고정 변수
  const history = useHistory();

  // State 설정
  const [chatting, setChatting] = useState([]);

  const [myInfo, setMyInfo] = useState({});

  const [words, setWords] = useState([]);

  const [isVote, setIsVote] = useState(false);
  const [timer, setTimer] = useState(3);

  const [isMafiaWin, setIsMafiaWin] = useState(null);

  // Effect 설정
  useEffect(() => {
    socket.emit("myInfo");
    socket.emit("words");

    // 내 정보 가져오기
    socket.on("myInfo", (info) => {
      setMyInfo(info);
    });
    socket.on("words", (data) => {
      setWords(data);
    });
    socket.on("timer", (value) => {
      setTimer(value);
    });
    socket.on("isMafiaWin", (value) => {
      setIsMafiaWin(value);
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
  useEffect(() => {
    socket.on("gameEnd", () => {
      history.replace("/lobby");
    });
  });

  // 함수 설정
  // chatting 전송
  const chattingBtnClickHandler = (chatData) => {
    socket.emit("chatting", chatData);
  };
  const wordButtonClickHandler = (word) => {
    if (myInfo.isMafia) {
      if (!isVote) {
        socket.emit("selectWord", word);
        setIsVote(true);
        return true;
      } else {
        return false;
      }
    }
  };

  return (
    <div id="wrap">
      <ChatBox data={chatting} info={myInfo} send={chattingBtnClickHandler} />
      <section className={style.contentBox}>
        <h1>단어 선택</h1>
        <div className={style.wordBox}>
          {words.map((text, key) => (
            <WordBox word={text} func={wordButtonClickHandler} key={key} />
          ))}
          {
            // 엔딩 팝업
            isMafiaWin !== null ? (
              <EndingPopup isMafiaWin={isMafiaWin} count={timer} />
            ) : (
              ""
            )
          }
        </div>
      </section>
    </div>
  );
}

export default Word;
