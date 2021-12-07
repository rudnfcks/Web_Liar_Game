import style from "./css/Join.module.css";

function Join() {
  // 고정 변수
  const dir = process.env.PUBLIC_URL;

  return (
    <div id="wrap">
      <section className={style.profileBox}>
        <div className={style.profileImgBox}>
          <img src={`${dir}/svg/face_0.svg`} alt="face" />

          <button className={style.profileImgChangeBtn}>
            <img src={`${dir}/svg/return.svg`} alt="change" />
          </button>
        </div>
        <form id={style.joinForm}>
          <input type="text" />
          <button>JOIN</button>
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
