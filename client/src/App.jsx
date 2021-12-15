
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css';

function App() {
  // создаем состояние в которм будем хранить сообщения
  const [messages, setMessages] = useState([])
  // state для input
  const [input, setInput] = useState([])
  // функция отправки сообщения
  const sendMessage = async () => {
    await axios.post('http://localhost:5000/new-messages', {
      message: input,
      id: Date.now()
  })
  }

  return (
    <div className="App">
      <div className="container">
        <div className="control">
          <input type="text" className="message" value={input} onChange={e => setInput(e.target.value)} />
          <button className="send" onClick={sendMessage}>send</button>
        </div>
        <div className="chat">
          {messages.map(item => 
              <div className="message" key={item.id}>{item.message}</div>
            )}
        </div>
      </div>
    </div>
  );
}

export default App;
