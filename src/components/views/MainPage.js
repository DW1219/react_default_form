import { useMqttState, useSubscription } from 'mqtt-react-hooks';
import React, { useEffect, useRef, useState } from 'react';
//import ChatOnline from "../../components/chatOnline/ChatOnline";
import MessageForm from '../message/MessageForm';
import './messenger.css';
//import { AuthContext } from "../../context/AuthContext";
import Tobbar from '../../components/topbar/Topbar';

const myId = 'biden';

function MainPage() {
  const { connectionStatus } = useMqttState();
  const { message } = useSubscription(['test', 'fuck']);

  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(true);
  const [messages, setMessages] = useState([
    { text: '와 손흥민 너무 잘한다~!! 최고!!', id: 'biden' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  //const [arrivalMessage, setArrivalMessage] = useState(null);
  //const [onlineUsers, setOnlineUsers] = useState([]);
  //const socket = useRef();
  //const { user } = useContext(AuthContext);
  const scrollRef = useRef();

  /*
  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);
*/
  /*
  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);
*/

  useEffect(() => {
    setMessages((prev) => [...prev, { text: message?.message, id: myId }]);
  }, [message]);

  /*
  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        user.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user]);
*/
  /*
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversations/" + user._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);
*/
  /*
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);
*/

  const handleSubmit = () => {
    setMessages((prev) => [...prev, { text: newMessage, id: myId }]);
  };

  /*
  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };*/

  useEffect(() => {}, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      <Tobbar />
      <div>{`Connect Status : ${connectionStatus} | Current Topic : ${message?.topic}`}</div>
      <div style={{ display: 'flex', flexDirection: 'column' }}></div>

      <div className="messenger">
        {/*<div className="chatMenu">
          <div className="chatMenuWrapper">
            {<input placeholder="Search for friends" className="chatMenuInput" />}
            {conversations.map((c) => (
              <div onClick={()=> setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div>*/}
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {/*}
                  <MessageForm
                    message="와 손흥민 너무 잘한다~!! 최고!!"
                    own={true}
                    icon="https://theyouthdream.com/files/attach/images/2021/11/18/f8571524b4d791beffb683b3557c12f9.gif"
                  />
                  <MessageForm message="천상계 급이다" own={false} icon={null} />
                  <MessageForm
                    message="이렇게 국봉이 차오른다!!!"
                    own={false}
                    icon="https://cdn.imweb.me/upload/S20170119587fc1996d25a/5a540781d256c.gif"
                  />
                  <MessageForm
                    message="프리킥 성공율 쩐다!!!!!!!!!!"
                    own={true}
                    icon="https://theyouthdream.com/files/attach/images/2021/11/18/f8571524b4d791beffb683b3557c12f9.gif"
                  />
                  <MessageForm
                    message="대한민국!!!~!!!!!!"
                    own={false}
                    icon={null}
                  />
                  <MessageForm
                    message="오 필승 코리아~~~~~~~~~~"
                    own={false}
                    icon={null}
                  />
                  <MessageForm
                    message="우루과이 이기자 가즈아~~~~!!!"
                    own={false}
                    icon={null}
                  />
                  <MessageForm
                    message="2006년 패배를 갚아주자!!!"
                    own={false}
                    icon={null}
                  />
                  <MessageForm message="5:0 예상~!!!!!" own={false} icon={null} />{*/}

                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <MessageForm
                        message={m.text}
                        own={myId === m.id}
                        //own={m.owner}
                        icon={null}
                      />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="Input..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        {/*<div className="chatOnline">
          <div className="chatOnlineWrapper">
                      <ChatOnline
              onlineUsers={onlineUsers}
              //currentId={user._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>*/}
      </div>
    </>
  );
}

export default MainPage;
