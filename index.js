import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import http from 'http';
import { Server as SocketIoServer } from 'socket.io';

const streamState = {

};

dotenv.config();
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const PORT = process.env.PORT ?? 3005;

const app = express();
const server = http.createServer(app);
const io = new SocketIoServer(server);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'index.html'));
});

app.get('/stream', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'stream.html'));
});

app.get('/dev', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'dev.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'admin.html'));
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('nameChange', ({ newName }) => {
        streamState.name = newName;
        io.emit('nameChange', { newName });
    });
});  

server.listen(PORT, () => {
    console.log('Listening on *:' + PORT);
});