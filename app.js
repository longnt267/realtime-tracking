const express = require("express");
const app = express();
const port = 3000;
const http = require("http");
const path = require("path");

const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server);

app.set("view engine", "ejs");
app.use(express.static(__dirname));
io.on("connection", function (socket) {
  socket.on("send-location", (data) => {
    io.emit("receive-location", { id: socket.id, ...data });
  });

  socket.on("disconnect", function () {
    io.emit("user-disconnected", socket.id);
  });
});

app.get("/", (req, res) => {
  res.render("index");
});

server.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
