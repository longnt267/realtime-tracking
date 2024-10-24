const express = require('express');
const app = express();
const port = 3000;
const http = require('http');
const path = require('path');


const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server);


app.set("view engine", "ejs");
app.set(express.static(path.join(__dirname, 'public')));
io.on('connection', (socket) => {
  console.log('Một người dùng đã kết nối');

  socket.on('disconnect', () => {
    console.log('Người dùng đã ngắt kết nối');
  });
  // Xử lý các sự kiện khác từ client ở đây
});

app.get('/', (req, res) => {
  res.send('index');
});


server.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});