import style from "./css/WordBox.module.css";

function WordBox({ word }) {
  return (
    <button className={style.wordBox}>
      {word}
      {false && <div className={style.over}></div>}
    </button>
  );
}

export default WordBox;
