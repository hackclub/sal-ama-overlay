let socket = io();

socket.on('nameChange', ({ newName }) => {
    document.getElementById('stateful-name').innerText = newName || ' ';
});

window.addEventListener("DOMContentLoaded", (event) => {
    // Add your JavaScript here!
});

fetch('/api/name').then(resp => resp.text()).then(name => {
    document.getElementById('stateful-name').innerText = name;
});