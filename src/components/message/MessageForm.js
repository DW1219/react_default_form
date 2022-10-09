//import { format } from "timeago.js";
import "./messageForm.css";

function MessageForm({ message, own, icon }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={
            icon !== null
              ? icon
              : "https://www.businesspost.co.kr/news/photo/202203/20220310055124_30395.jpg"
          }
          alt=""
        />
        <p className="messageText">{message}</p>
      </div>
      {/*<div className="messageBottom">{format(message.createdAt)}</div>*/}
    </div>
  );
}

export default MessageForm;
