import express from 'express';
import { createServer } from 'node:http';
// import { fileURLToPath } from 'node:url';
// import { dirname, join } from 'node:path';
import { Server } from 'socket.io';

const port = 8181;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://localhost:5173"
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');
  console.log(socket.id);
});

server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
