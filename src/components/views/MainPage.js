import { useMqttState, useSubscription } from 'mqtt-react-hooks';
import React, { useEffect, useRef, useState } from 'react';
import Tobbar from '../../components/topbar/Topbar';
import MessageForm from '../message/MessageForm';
import './messenger.css';

let myId = '';
let myRoom = '';

//http://test3.bonkab.com/?topic={채널명}&id={내아이디}

function MainPage() {
  const { client } = useMqttState();
  const { message } = useSubscription([myRoom, '']);

  //topic 바꿔서 다른 url 들어가면 알아서 렌더링이 다시 시작되니깐 알아서 초기화되는 것처럼 보임
  const [messages, setMessages] = useState([
    { text: '와 손흥민 너무 잘한다~!! 최고!!', id: myId },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const scrollRef = useRef();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    console.log('queryParams : ', queryParams);
    const currentRoom = queryParams.get('topic');
    const currentId = queryParams.get('id');
    console.log('current Room & ID : ', currentRoom, currentId);
    myRoom = currentRoom;
    myId = currentId;
  }, [myRoom]);

  useEffect(() => {
    console.log('new message arrived : ', message);

    if (message) {
      const { topic: topicValue, message: messageValue } = message;
      console.log('parsed messageValue : ', messageValue);
      try {
        let parsedMsg = JSON.parse(messageValue);
        //let receiveData = message?.text;
        console.log('parded parsedMsg.text: ', parsedMsg.text);
        console.log('parded parsedId.id: ', parsedMsg.id);
        console.log('topic value : ', topicValue);

        setMessages((prev) => [
          ...prev,
          { text: parsedMsg.text, id: parsedMsg.id },
        ]);
      } catch (err) {
        console.log('errrrr');
        setMessages((prev) => [
          ...prev,
          { text: message?.message, id: 'trump' },
        ]);
      }
    }
  }, [message]);

  const handleSubmit = () => {
    const jsonFormat = {
      id: 'biden',
      text: newMessage,
    };
    setMessages((prev) => [...prev, { text: newMessage, id: 'biden' }]);
    return client.publish('test', JSON.stringify(jsonFormat));
    //return client.publish('test', jsonFormat);
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      <Tobbar />
      <div>{`Connect Status : ${client} | Current Topic : ${message?.topic}`}</div>
      <div style={{ display: 'flex', flexDirection: 'column' }}></div>

      <div className="messenger">
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
              {messages.map((m) => (
                <div ref={scrollRef}>
                  <MessageForm
                    message={m.text}
                    own={myId === m.id}
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
          </div>
        </div>
      </div>
    </>
  );
}

export default MainPage;
