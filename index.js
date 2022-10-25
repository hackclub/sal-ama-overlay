import express from 'express';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const PORT = process.env.PORT ?? 3005;

const app = express();

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

app.listen(PORT, () => {
    console.log('Listening on *:' + PORT);
});