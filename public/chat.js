let url = window.location.href;
let socket = io.connect(url); //Conectarse

console.log('Connected to ' + url);

let message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output');
    feedback = document.getElementById('feedback');

handle.value = sessionStorage.getItem('handle') || '';

message.addEventListener('keypress', () =>{
    socket.emit('typing', handle.value);
})

// Emit events
btn.addEventListener('click', () => {
    if (message.value.length > 0 && handle.value.length > 0) {
        socket.emit('chat', {
            message: message.value,
            handle: handle.value
        });
        message.value = '';
        sessionStorage.setItem('handle', handle.value);
    }
});

// Listen for events
socket.on('chat', data => {
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing', data =>{
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});