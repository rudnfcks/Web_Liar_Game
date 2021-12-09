import { useState } from "react";
import Chatting from "./Chatting";
import style from "./css/ChatBox.module.css";

function ChatBox({ data, info, send }) {
  // State 설정
  const [chatInput, setChatInput] = useState("");

  // 함수 설정
  // 채팅 입력칸 변경 이벤트
  const chatInputChangeHandler = (event) => {
    setChatInput(event.currentTarget.value);
  };
  // 채팅 전송 버튼 클릭 이벤트
  const chatBtnClickHandler = (event) => {
    event.preventDefault();

    if (!chatInput.replace(/[ 　ㅤ]/g, "")) {
      setChatInput("");
      return;
    }

    const chatData = {
      name: info.name,
      img: info.img,
      content: chatInput,
    };

    setChatInput("");
    send(chatData);
  };

  return (
    <section className={style.chatBox}>
      <div className={style.chattingBox}>
        {
          // Chatting Data가 있다면
          data &&
            data.map((item, key) => (
              <Chatting
                key={key}
                img={item.img}
                name={item.name}
                content={item.content}
              />
            ))
        }
      </div>
      <form id={style.chattingForm} onSubmit={chatBtnClickHandler}>
        <input
          type="text"
          value={chatInput}
          onChange={chatInputChangeHandler}
        />
        <button>전송</button>
      </form>
    </section>
  );
}

export default ChatBox;
