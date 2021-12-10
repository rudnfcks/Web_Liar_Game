import { useState } from "react/cjs/react.development";
import style from "./css/WordBox.module.css";

function WordBox({ word, func }) {
  const [isVote, setIsVote] = useState(false);

  const btnClickHandler = () => {
    if (func(word)) {
      setIsVote(true);
    }
  };

  return (
    <button className={style.wordBox} onClick={btnClickHandler}>
      {word}
      {isVote && <div className={style.over}></div>}
    </button>
  );
}

export default WordBox;
