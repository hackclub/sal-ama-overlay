import express from "express";
import path from "path";
import dotenv from "dotenv";
import http from "http";
import { Server as SocketIoServer } from "socket.io";

const streamState = {
  name: " ",
};

dotenv.config();
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const PORT = process.env.PORT ?? 3005;

const app = express();
const server = http.createServer(app);
const io = new SocketIoServer(server);

app.use(express.static("public"));

app.get("/api/name", (req, res) => {
  res.header("type", "text/plain");
  res.send(streamState.name);
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("nameChange", ({ newName }) => {
    streamState.name = newName;
    console.log("Name change:", newName);
    io.emit("nameChange", { newName });
  });
});

server.listen(PORT, () => {
  console.log("Listening on *:" + PORT);
});
