import style from "./css/PassPopup.module.css";

function PassPopup({ count }) {
  return (
    <div className={style.backGroud}>
      <div className={style.passPopup}>
        <h1>아무도 처형되지 않았습니다.</h1>
        <h1>{count}</h1>
      </div>
    </div>
  );
}

export default PassPopup;
