// импортируем библиотеки
const express = require('express');
const cors = require('cors')
const events = require('events')
// указываем на каком порту будем разворачивать сервер
const PORT = 5000
// создаем imitter lka работы с событиями
const emitter = new events.EventEmitter();
// слоздаем экземпляр express
const app = express()
// передаем cors
app.use(cors())

app.use(express.json())
// // создаем эндпоинты для отправки и получения сообщений
app.get('/get-message', (req, res) => {
    // уведомляем всех пользователей который к нам подключились
    emitter.once('newMessage', (message) => {
        // всем пользователям у которых висит запрос 
        // передаем толькочто зарегистрированно есообщение
        res.json(message)
    })
    
})
app.post('/new-messages', ((req, res) => {
    const message = req.body;
    emitter.emit('newMessage', message)
    res.json({
        status: 200
    })
}))


// запускаем express
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))


