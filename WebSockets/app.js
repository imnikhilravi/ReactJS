const redisConnection = require('./redis-connection');
const express = require("express");
const app = express();
const http = require("http").Server(app);

const io = require("socket.io")(http);
require("./worker");  
const picsearchSocket = io.of("/picsearch"); 


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

redisConnection.on("pic-search-response", async (data, channel) => {
  try {
    picsearchSocket.emit('post-results', data);
  } catch (error) {
    console.log(error);
  }
});


picsearchSocket.on("connection", socket => {

  socket.on("pixabay-search", data => {
    redisConnection.emit("pic-search-request", data);
  });

});

http.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
