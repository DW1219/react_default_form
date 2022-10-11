import { useMqttState, useSubscription } from 'mqtt-react-hooks';
import React, { useEffect, useRef, useState } from 'react';
import Tobbar from '../../components/topbar/Topbar';
import MessageForm from '../message/MessageForm';
import './messenger.css';

const myId = 'biden';

//http://test3.bonkab.com/?topic={채널명}&id={내아이디}

function MainPage() {
  const { client } = useMqttState();
  const { message } = useSubscription(['test', 'fuck']);

  const [messages, setMessages] = useState([
    { text: '와 손흥민 너무 잘한다~!! 최고!!', id: 'biden' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const scrollRef = useRef();

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
      id: myId,
      text: newMessage,
    };
    setMessages((prev) => [...prev, { text: newMessage, id: myId }]);
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
