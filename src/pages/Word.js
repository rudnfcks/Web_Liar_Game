import ChatBox from "../components/ChatBox";
import EndingPopup from "../components/EndingPopup";
import WordBox from "../components/WordBox";

import style from "./css/Word.module.css";

function Word() {
  const test = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

  return (
    <div id="wrap">
      <ChatBox />
      <section className={style.contentBox}>
        <h1>단어 선택</h1>
        <div className={style.wordBox}>
          {test.map((data) => (
            <WordBox word={data} />
          ))}
          {false && <EndingPopup isMafiaWin={true} count={3} />}
        </div>
      </section>
    </div>
  );
}

export default Word;
