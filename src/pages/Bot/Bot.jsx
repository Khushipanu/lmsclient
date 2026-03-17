import { useState,useEffect } from 'react'
import './Bot.css'
import {io} from "socket.io-client";

function Bot() {
  const [socket,setSocket]=useState()
  const [messages, setMessages] = useState([
    {
      id:1,
      text:"Hey there! How can I assist you?",
      timestamp:new Date().toLocaleTimeString(),
      sender:"bot"
    }
  ])
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return
    if (!socket) return

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    }

    setMessages([...messages, userMessage])
    setInputValue('');
    socket.emit("ai-message",inputValue)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }
  useEffect(()=>{
    let socketInstance=io("http://localhost:8080");
    setSocket(socketInstance);
    socketInstance.on("ai-message-response",(response)=>{
      const botMessage={
        id:Date.now() +1,
        text:response,
        timestamp:new Date().toLocaleTimeString(),
        sender:'bot'

      }
      setMessages(prevMessages=>[...prevMessages,botMessage]);
    })

    return ()=>{
      socketInstance.disconnect();
    }
  },[])

 return (
  <div className="chat-wrapper">
    <div className="chat-container">
      <div className="chat-header">
        <h1>Ask me anything!</h1>
      </div>

      <div className="messages-container">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender}`}>
            <div className="message-content">
              <p>{message.text}</p>
              <span className="timestamp">{message.timestamp}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="input-container">
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message here."
          className="message-input"
        />
        <button onClick={handleSendMessage} className="send-button">
          Send
        </button>
      </div>
    </div>
  </div>
)
}

export default Bot;