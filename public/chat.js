let url = window.location.href;
let socket = io.connect(url); //Conectarse

console.log('Connected to ' + url);

let message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output');
    feedback = document.getElementById('feedback');
    chat = document.getElementById('chat-window');
    connected = document.getElementById('connected');

let audio = new Audio('assets/chat.mp3');

handle.value = sessionStorage.getItem('handle') || localStorage.getItem('handle') || '';

message.addEventListener('keypress', () => {
    socket.emit('typing', handle.value);
});

let handleMessage = () => {
    if (message.value.length > 0 && handle.value.length > 0) {
        socket.emit('chat', {
            message: message.value,
            handle: handle.value
        });
        message.value = '';
        sessionStorage.setItem('handle', handle.value);
        localStorage.setItem('handle', handle.value);
        message.focus();
    }
}

// Emit events
btn.addEventListener('click', handleMessage);

message.addEventListener('keypress', (e) => {
    if (e.key == 'Enter') {
        handleMessage();
    }
})

// Listen for events
socket.on('chat', data => {
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
    chat.scrollTop = chat.scrollHeight - chat.clientHeight;
    if (data.handle != handle.value) {
        audio.play();
    }
});

socket.on('typing', data => {
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
    chat.scrollTop = chat.scrollHeight - chat.clientHeight;
});

socket.on('connections', data => {
    connected.innerHTML = `&#9679; ${data} ${data == 1 ? 'user' : 'users' } connected`;
});