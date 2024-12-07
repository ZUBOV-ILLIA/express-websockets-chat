// const express = require("express");
// const app = express();
// const port = 3005;

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.listen(port, () => {
//   console.log(`http://localhost:${port}`);
// });

const ws = require("ws");
const wsServer = new ws.Server({ port: 3010 }, () =>
  console.log("WS Server started")
);

wsServer.on("connection", (ws) => {
  // ws.send("Hello Client");

  ws.on("message", (message) => {
    message = JSON.parse(message);

    switch (message.event) {
      case "message":
        broadcastMessage(message);
        break;
      case "connection":
        broadcastMessage(message);
        break;
    }
  });
});

function broadcastMessage(message) {
  console.log(">>>", message);

  wsServer.clients.forEach((client) => {
    client.send(JSON.stringify(message));
  });
}
