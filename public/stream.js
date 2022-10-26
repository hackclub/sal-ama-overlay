let socket = io();

socket.on('nameChange', ({ newName }) => {
    document.getElementById('stateful-name').innerText = newName || ' ';
});

window.addEventListener("DOMContentLoaded", (event) => {
    // Add your JavaScript here!
});

