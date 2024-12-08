const ws = require("ws");

const wsServer = new ws.Server({ port: 3010 }, () =>
  console.log("===== WS Server started =====")
);

wsServer.on("connection", (ws) => {
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
});

function broadcastMessage(message) {
  wsServer.clients.forEach((client) => {
    client.send(JSON.stringify(message));
  });
}
