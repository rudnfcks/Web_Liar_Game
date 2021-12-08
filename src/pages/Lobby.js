import { useEffect, useState } from "react";
import ChatBox from "../components/ChatBox";
import PlayerBox from "../components/PlayerBox";

import style from "./css/Lobby.module.css";

function Lobby({ socket }) {
  // State 설정
  const [players, setPlayers] = useState([]);

  // Effect 설정
  useEffect(() => {
    socket.emit("lobby");

    socket.on("info", (info) => {
      setPlayers(info);
    });
  }, [socket]);

  return (
    <div id="wrap">
      <ChatBox />
      <section className={style.contentBox}>
        <h1>참여자</h1>
        <div className={style.playerBox}>
          {players.map((item, key) => (
            <PlayerBox
              img={item.img}
              name={item.name}
              isReady={item.isReady}
              key={key}
            />
          ))}
        </div>
        <button>{false ? "UNREADY" : "READY"}</button>
      </section>
    </div>
  );
}

export default Lobby;
