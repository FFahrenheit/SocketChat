let url = window.location.href;
let socket = io.connect(url); //Conectarse

console.log('Connected to ' + url);