import ChatBox from "../components/ChatBox";
import PlayerBox from "../components/PlayerBox";

import style from "./css/Lobby.module.css";

function Lobby() {
  const test = [1, 2, 3, 4, 5, 6, 7];

  function playerBox(data) {
    let arr = [];
    for (let i = 0; i < 8; i++) {
      arr.push(<PlayerBox img={data[i]} name="플레이어" isReady={true} />);
    }

    return arr;
  }

  return (
    <div id="wrap">
      <ChatBox />
      <section className={style.contentBox}>
        <h1>참여자</h1>
        <div className={style.playerBox}>{playerBox(test)}</div>
        <button>{false ? "UNREADY" : "READY"}</button>
      </section>
    </div>
  );
}

export default Lobby;
