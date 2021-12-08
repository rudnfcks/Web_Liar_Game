import style from "./css/PlayerBox.module.css";

function PlayerBox({ img, name, isReady }) {
  const dir = process.env.PUBLIC_URL;

  return (
    <div className={style.playerBox}>
      {img !== undefined ? (
        <div className={style.playerExist}></div>
      ) : (
        <div className={style.playerNone}></div>
      )}

      <div className={style.profileImgBox}>
        <img src={`${dir}/svg/face_${img}.svg`} alt="face" />
      </div>
      <h3>{name}</h3>
      <h2>{isReady ? "READY" : ""}</h2>
    </div>
  );
}

export default PlayerBox;
