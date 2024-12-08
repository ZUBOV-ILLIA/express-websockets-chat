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
const wss = new WebSocket.Server({ server });

// Handle WebSocket connections
wss.on("connection", (ws) => {
  console.log("A new client connected.");

  // Send a welcome message
  ws.send("Welcome to the WebSocket server!");

  // Handle incoming messages
  ws.on("message", (message) => {
    console.log(`Received: ${message}`);

    // Broadcast the message to all connected clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(`Broadcast: ${message}`);
      }
    });
  });

  // Handle client disconnect
  ws.on("close", () => {
    console.log("A client disconnected.");
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
