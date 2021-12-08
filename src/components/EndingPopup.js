import style from "./css/EndingPopup.module.css";

function EndingPopup({ isMafiaWin, count }) {
  return (
    <div className={style.backGroud}>
      <div className={style.endingPopup}>
        <h1>{isMafiaWin ? "마피아" : "시민"}의</h1>
        <h1>승리!</h1>
        <h1>{count}</h1>
      </div>
    </div>
  );
}

export default EndingPopup;
