import style from "./css/PlayerPopup.module.css";

function PlayerPopup({ img, name, isMafia, count }) {
  const dir = process.env.PUBLIC_URL;

  return (
    <div className={style.backGroud}>
      <div className={style.playerPopup}>
        <div className={style.profileImgBox}>
          <img src={`${dir}/svg/face_${img}.svg`} alt="face" />
        </div>
        <h1>
          {name} 은/는 마피아가 {isMafia ? "맞습니다." : "아닙니다."}
        </h1>
        <h1>{count}</h1>
      </div>
    </div>
  );
}

export default PlayerPopup;
