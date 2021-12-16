// импортируем библиотеки
import express from 'express'
import cors from 'cors'
import events from 'events'

// указываем на каком порту будем разворачивать сервер
const PORT = 5000
// создаем imitter для работы с событиями
const emitter = new events.EventEmitter();
// слоздаем экземпляр express
const app = express()
// передаем cors что бы отправлять запросы в браузере
app.use(cors())
// прописываем JSON что бы в response можно было отправлять данные
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
    // получаем сообщение из тела запроса
    const message = req.body;
    // создаем событие и передаем в него сообщение
    emitter.emit('newMessage', message)
    // возращаем статус 200
    res.json({
        status: 200
    })
}))
// запускаем express
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))


