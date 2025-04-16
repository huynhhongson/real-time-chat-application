const express = require('express')
const path = require('path')
const app = express()
const PORT =  process.env.PORT || 3000
const sever = app.listen(PORT, () => console.log(`server on port ${PORT}`))

const io = require('socket.io')(sever)

app.use(express.static(path.join(__dirname, 'public')))

let socketConnected = new Set()

io.on('connection', onConnected)

function onConnected(socket){
    console.log(socket.id)
    socketConnected.add(socket.id)

    io.emit('client-total', socketConnected.size)

    socket.on('disconnect', () =>{
        console.log('Socket disconnected', socket.id)
        socketConnected.delete(socket.id)
        io.emit('client-total', socketConnected.size)

    })

    socket.on('message', (data) => {
        console.log(data)
        socket.broadcast.emit('chat-message', data)
    })
}