import ChatBox from "../components/ChatBox";
import GameBox from "../components/GameBox";
import PlayerPopup from "../components/PlayerPopup";

import style from "./css/Game.module.css";

function Game() {
  const test = [1, 2, 3, 4, 5, 6, 7];

  function gameBox(data) {
    let arr = [];
    for (let i = 0; i < 8; i++) {
      arr.push(
        <GameBox
          img={data[i]}
          name="플레이어"
          word="카테고리"
          content="이렇게 작성해야 된다는 것을 보여주는"
          isDead={false}
          isVoteTime={false}
          voteCount={3}
        />
      );
    }

    return arr;
  }

  return (
    <div id="wrap">
      <ChatBox />
      <section className={style.contentBox}>
        <h1>이야기 시간</h1>
        <div className={style.gameBox}>{gameBox(test)}</div>
        <form id={style.gameForm}>
          <div>
            <h3>이 카테고리 은/는</h3>
            <input type="text" />
            <h3>카테고리 입니다.</h3>
          </div>
          <button>확인</button>
        </form>
        {false && (
          <PlayerPopup img={1} name="플레이어" isMafia={false} count={3} />
        )}
      </section>
    </div>
  );
}

export default Game;
