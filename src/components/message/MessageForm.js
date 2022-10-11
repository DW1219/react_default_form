import './messageForm.css';

function MessageForm({ message, own, icon }) {
  return (
    <div className={own ? 'message own' : 'message'}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={
            icon !== null
              ? icon
              : //: 'https://www.businesspost.co.kr/news/photo/202203/20220310055124_30395.jpg'
                'https://images.chosun.com/resizer/7fXeUbYGUI9_MWDKxDvD3PBUM3c=/210x210/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/TLAG2JUEF5DVJEQFYXCDAFW4FA.png'
          }
          alt=""
        />
        <p className="messageText">{message}</p>
      </div>
    </div>
  );
}

export default MessageForm;
