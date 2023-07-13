require("dotenv").config();

const { port } = require("../config");
const app = require("../app");
const db = require("../db/models");
const http = require("http");
const WebSocket = require("ws");

const clients = new Map();

db.sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection success! Sequelize is ready to use...");

    const server = http.createServer(app);

    const wss = new WebSocket.Server({
      server,
      verifyClient: ({ req }) => {
        const { searchParams } = new URL(req.url, `http://${req.headers.host}`);
        req.username = searchParams.get("username");
        return true;
      },
    });

    wss.on("connection", (ws, req) => {
      const { username } = req;

      ws.username = username;
      ws.isAlive = true;

      if (!clients.has(username)) {
        clients.set(username, new Set());
      }

      clients.get(username).add(ws);

      ws.on("pong", () => {
        ws.isAlive = true;
      });

      ws.on("message", (message) => handleMessage(message, ws));

      ws.on("error", (error) => {});

      ws.on("close", () => {
        const { username } = ws;

        if (clients.has(username)) {
          clients.get(username).delete(ws);
          if (clients.get(username).size === 0) {
            clients.delete(username);
          }
        }

        db.User.update({ guid: null }, { where: { username } });
      });
    });

    setInterval(() => {
      wss.clients.forEach((ws) => {
        if (!ws.isAlive) return ws.terminate();
        ws.isAlive = false;
        ws.ping();
      });
    }, 30000);

    server.listen(port, () => console.log(`Listening on port ${port}...`));
  })
  .catch((err) => {
    console.log("Database connection failure.");
    console.error(err);
  });
