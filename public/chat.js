let url = window.location.href;
let socket = io.connect(url); //Conectarse

console.log('Connected to ' + url);

let message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output');

handle.value = sessionStorage.getItem('handle') || '';

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
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});