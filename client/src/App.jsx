
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';

function App() {
  // создаем состояние в которм будем хранить сообщения
  const [messages, setMessages] = useState([])
  // state для input
  const [input, setInput] = useState([])
  // функция отправки сообщения
  const sendMessage = async () => {
    // отправляем POST запрос к нашему API и отправляем объект сообщения
    await axios.post('http://localhost:5000/new-messages', {
      message: input,
      id: Date.now()
    })
  }

  
  useEffect(() => {
    subscribe()
  }, [])

  // создаем функцию подписку
  const subscribe = async () => {
    // в блоке try мы отправляем GET запрос
    try{
      // и когда ответ придет, мы запишем его в переменную data с помощью 
      // диструктуризации
      const {data} = await axios.get('http://localhost:5000/get-message')
      // полученные данные записываем в state 
      // здесь обязательно записываем через callback
      setMessages(prev => [data, ...prev])
      // после чего снова возобновляем подписку
      await subscribe()
    } catch(e){
      // в блок catch мы момпадаем когда по истечении долгого времени мы так
      // ничего не получили и срок запроса истек
      setTimeout(() => {
         //здесь через 0.5 сек возобновляем подписку
        subscribe()
      }, 500)
    }
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
