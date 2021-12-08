import { useEffect, useState } from "react";
import { useHistory } from "react-router";

import style from "./css/Join.module.css";

function Join({ socket }) {
  // 고정 변수
  const history = useHistory();
  const dir = process.env.PUBLIC_URL;

  // State 설정
  const [profileImg, setProfileImg] = useState(0);
  const [profileName, setProfileName] = useState("");

  // Effect 설정
  useEffect(() => {
    socket.emit("disconnection");

    socket.on("isFull", (isFull) => {
      if (isFull) {
        alert("방이 이미 가득 찼어요");
      } else {
        history.replace("/lobby");
      }
    });
  }, [socket, history]);

  // 함수 설정
  // 이미지 변경 버튼 클릭 이벤트
  const imgBtnOnClickHandler = () => {
    setProfileImg((current) => (current + 1) % 11);
  };
  // 이름 입력칸 변경 이벤트
  const nameInputOnChangeHandler = (event) => {
    setProfileName(event.currentTarget.value);
  };
  // Join 버튼 클릭 이벤트
  const joinPageOnSubmitHandler = (event) => {
    event.preventDefault();

    const reset = (alret) => {
      alert(alret);
      setProfileName("");
    };

    if (profileName.length > 5) {
      reset("이름이 너무 길어요 ( 5글자 이하 )");
      return;
    }
    if (!profileName.replace(/[ 　ㅤ]/g, "")) {
      reset("이름을 입력해주세요 ( 공백 이름 불가 )");
      return;
    }

    socket.emit("join", { profileImg, profileName });
  };

  // JSX
  return (
    <div id="wrap">
      <section className={style.profileBox}>
        <div className={style.profileImgBox}>
          <img src={`${dir}/svg/face_${profileImg}.svg`} alt="face" />

          <button
            className={style.profileImgChangeBtn}
            onClick={imgBtnOnClickHandler}
          >
            <img src={`${dir}/svg/return.svg`} alt="change" />
          </button>
        </div>
        <form onSubmit={joinPageOnSubmitHandler}>
          <div className={style.joinForm}>
            <input
              type="text"
              value={profileName}
              onChange={nameInputOnChangeHandler}
            />
            <button>JOIN</button>
          </div>
        </form>
      </section>

      <section>
        <h1>
          <span>라이어</span> 게임 설명!
        </h1>
        <div className={style.contentBox}>
          <p>
            <span>최소</span> <b>참여 인원 : 4명</b>
            <br />
            <span>최대</span> <b>참여 인원 : 8명</b>
            <br />
            <br />
            게임이 시작되면 참여자 모두에게 <span>특정 단어</span>를 제공합니다.
            <br />
            마피아에게는 비밀 단어의 <span>카테고리</span>를 알려줍니다.
            <br />
            시민에게는 비밀 단어를 알려줍니다.
            <br />
            <br />
            순서대로 <b>비밀 단어에 대한 이야기</b>을 합니다.
            <br />
            시민들은 <b>마피아가 비밀 단어를 눈치채지 못하도록 이야기</b>합니다.
            <br />
            마피아는 <b>정체를 들키지 않도록 비밀 단어를 아는 것처럼 이야기</b>
            합니다.
            <br />
            <br />
            <span>
              너무 관련 없는 이야기를 하면 마피아로 의심을 받을 수 있습니다.
            </span>
            <br />
            <br />
            모두의 이야기가 끝나면 가장 다른 이야기를 하는
            <span>마피아를 투표</span>
            합니다!
            <br />
            <br />
            투표를 통해 <span>마피아를 선택</span> 했다면?
            <br />
            &nbsp; - 마피아는 <b>단어를 맞출 기회</b>가 생기고 단어를 맞추면
            마피아의 승리!
            <br />
            &nbsp; - 단어를 맞추지 못했다면 시민의 승리!
            <br />
            <br />
            투표를 통해 <span>시민을 선택</span>했다면?
            <br />
            &nbsp; - 투표된 시민을 제외하고 <b>다시한번 순서대로 이야기</b>를
            합니다.
            <br />
            &nbsp; - 2번째 투표에서도 시민을 투표한다면 마피아의 승리!
          </p>
        </div>
      </section>
    </div>
  );
}

export default Join;
