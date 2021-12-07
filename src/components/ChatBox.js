import Chatting from "./Chatting";
import style from "./css/ChatBox.module.css";

function ChatBox() {
  return (
    <section className={style.chatBox}>
      <div className={style.chattingBox}>
        <Chatting
          img={1}
          name="플레이어"
          content="엄청 다이나믹하고 길고 많고 엄청나고 신기하고 왜이러는지 모르겠는 무지하게 긴 채팅 내용"
        />
        <Chatting img={1} name="플레이어" content="채팅 내용" />
        <Chatting img={1} name="플레이어" content="채팅 내용" />
        <Chatting img={1} name="플레이어" content="채팅 내용" />
        <Chatting img={1} name="플레이어" content="채팅 내용" />
        <Chatting img={1} name="플레이어" content="채팅 내용" />
        <Chatting img={1} name="플레이어" content="채팅 내용" />
        <Chatting img={1} name="플레이어" content="채팅 내용" />
        <Chatting img={1} name="플레이어" content="채팅 내용" />
        <Chatting img={1} name="플레이어" content="채팅 내용" />
        <Chatting img={1} name="플레이어" content="채팅 내용" />
        <Chatting img={1} name="플레이어" content="채팅 내용" />
        <Chatting img={1} name="플레이어" content="채팅 내용" />
        <Chatting img={1} name="플레이어" content="채팅 내용" />
      </div>
      <form id={style.chattingForm}>
        <input type="text" />
        <button>전송</button>
      </form>
    </section>
  );
}

export default ChatBox;
