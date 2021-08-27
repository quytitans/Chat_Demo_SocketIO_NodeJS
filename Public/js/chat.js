$().ready(function () {
    $('#chatForm').validate({
        rules: {
            "msg": {
                required: true,
            }
        },
        messages: {
            "msg": {
                required: "* message cannot be blank"
            }
        }
    });
    const chatForm = document.getElementById('chatForm');
    const messageSubmit = document.getElementById('msg');
    const chatmessage = document.querySelector('.msg_history');
// const messageFormatter = require('../../Util/messages')
    const userName = document.getElementById('username1').innerText;
    const roomNumber = document.getElementById('room1').innerText;
    const socket = io();

//Join ChatRoom
    socket.emit('sendRoomNo', roomNumber)
    socket.emit('joinRoom', userName);

//Message from server
    socket.on('message', message => {
        console.log(message);
        outputMessage(message);
        chatmessage.scrollTop = chatmessage.scrollHeight;
    })

//message submit
    chatForm.addEventListener('submit', event => {
        event.preventDefault();
        const message = messageSubmit.value;
        if (message !== '') {
            //emit message to server by socket
            socket.emit('chatMessage', message);
            //clear input
            messageSubmit.value = '';
            messageSubmit.focus();
        }
    });

// Get room and users
    socket.on('roomUsers', ({room, users}) => {
        outputRoomName(room);
        outputUsers(users);
    });

//send message to DOM
    function outputMessage(message) {
        const div = document.createElement('div');
        if (message.username === 'Server') {
            div.classList.add('server_received_withd_msg');
        } else if (message.username === userName) {
            div.classList.add('your_received_withd_msg');
        } else {
            div.classList.add('received_withd_msg');
        }
        div.innerHTML = `<h4>${message.username}</h4>
                      <p class="mt-2">${message.text}</p>
                      <span class="time_date">${message.time}</span>`
        document.querySelector('.msg_history').appendChild(div);
    }

// Add room name to DOM
    function outputRoomName(room) {
        const roomName = document.getElementById('roomName2')
        roomName.innerText = room;
    }

// Add users to DOM
    function outputUsers(users) {
        const usersList = document.getElementById('users');
        usersList.innerHTML = '';
        users.forEach((user) => {
            const li = document.createElement('li');
            li.innerText = user.username;
            usersList.appendChild(li);
        });
    }

//leave chat room
    document.getElementById('leaveRoom').addEventListener('click', () => {
        const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
        if (leaveRoom) {
            window.location = 'http://localhost:3000/index';
        } else {
        }
    });
});

