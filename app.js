const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socketIO = require('socket.io');
const {userJoin, getCurrentUser, userLeave, getRoomUsers} = require('./Util/users');
const formatMessage = require('./Util/messages');
const io = socketIO(server);
const PORT = 3000;
const BotName = "Server";
const chatRoute = require('./Route/chatRoute');
app.use('/', chatRoute);
const indexRoute = require('./Route/indexRoute');
app.use('/', indexRoute);
app.set("view engine", "ejs");
app.set("views", "View");
app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', socket => {
    socket.on('joinRoom', ({userName, room}) => {
        console.log(`new client name: ${userName} room:${room} connected`);
        const user = userJoin(socket.id, userName, room);
        socket.join(user.room);
        //run when new client conected
        socket.emit('message', formatMessage(BotName, `${user.username} connected`))
        //broadcast when a user connect
        socket.broadcast
            .to(user.room)
            .emit('message', formatMessage(BotName, `${userName} has join the chat !!`))

        //send user info to room
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        })
    })

    //listent chatMessage from client
    socket.on('chatMessage', message => {
        const user1 = getCurrentUser(socket.id);
        io.to(user1.room).emit('message', formatMessage(user1.username, message))
    })

    //run when client disconnect
    socket.on('disconnect', () => {
        const user2 = userLeave(socket.id);
        if (user2) {
            io.to(user2.room).emit('message', formatMessage(BotName, `${user2.username} has left the chat !!`))
        }
        io.emit('message',)
    })
})

server.listen(PORT, () => {
    console.log(`listening on port ${PORT}: http://localhost:${PORT}`)
})