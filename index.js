// index.js
const express = require("express");
const http = require("http");
const WebSocket = require("ws");

// Create an instance of an Express app
const app = express();
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static("public"));

// Create an HTTP server
const server = http.createServer(app);

// Create a WebSocket server
const wss = new WebSocket.Server({ server }, () => {
  console.log(`ws://express-websockets-chat.onrender.com`);
});

// Handle WebSocket connections
wss.on("connection", (ws) => {
  console.log("New client connected <<<<<<<<<<<<<<<<==========");

  ws.on("message", (message) => {
    try {
      parsedMessage = JSON.parse(message);

      switch (parsedMessage.event) {
        case "message":
          broadcastMessage(parsedMessage);
          break;
        case "connection":
          broadcastMessage(parsedMessage);
          break;
      }
    } catch (err) {
      console.log(err);
    }
  });

  ws.on("close", () => {
    console.log("A client disconnected.");
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

function broadcastMessage(message) {
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(message));
  });
}
