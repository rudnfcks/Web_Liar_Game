import style from "./css/Chatting.module.css";

function Chatting({ img, name, content }) {
  const dir = process.env.PUBLIC_URL;

  return (
    <div className={style.chattingBox}>
      <div className={style.profileImgBox}>
        <img src={`${dir}/svg/face_${img}.svg`} alt="face" />
      </div>

      <div className={style.contentBox}>
        <h1>{name}</h1>
        <p>{content}</p>
      </div>
    </div>
  );
}

export default Chatting;
