import { useState } from "react";
import style from "./css/GameBox.module.css";

function GameBox({
  index,
  img,
  name,
  word,
  content,
  isDead,
  isVoteTime,
  voteCount,
  votePlayer,
  isTurn,
}) {
  // 고정 변수
  const dir = process.env.PUBLIC_URL;

  // State 설정
  const [isVote, setIsVote] = useState(false);

  // 함수 설정
  const isVoteBtnClickHandler = () => {
    if (votePlayer(index) === true) {
      setIsVote(true);
    }
  };

  return (
    <div className={style.gameBox}>
      <div className={style.profileBox}>
        <div className={style.profileImgBox}>
          <img src={`${dir}/svg/face_${img}.svg`} alt="face" />
        </div>
        <h1>{name}</h1>
      </div>

      {isTurn && <div className={style.turnEffect}></div>}

      {
        // 플레이어 참여
        img !== undefined ? (
          <div className={style.playerExist}></div>
        ) : (
          <div className={style.playerNone}></div>
        )
      }

      {
        // 플레이어 사망
        isDead ? (
          <div className={style.deadBox}></div>
        ) : (
          <div className={style.contentBox}>
            <h3>이 {word} 은/는</h3>
            <div>
              <p>{content}</p>
            </div>
            <h3>{word} 입니다.</h3>
          </div>
        )
      }

      {
        // 투표 시간
        isVoteTime && (
          <button className={style.voteBox} onClick={isVoteBtnClickHandler}>
            <h1>{voteCount !== null ? voteCount : ""}</h1>
          </button>
        )
      }

      {
        // 투표 여부
        isVote && <div className={style.isVote}></div>
      }
    </div>
  );
}

export default GameBox;
