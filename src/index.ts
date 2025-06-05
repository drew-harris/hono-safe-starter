import indexHtml from "../public/index.html";
import { serve } from "bun";
import type { Message, MessageType } from "./types";
import { api } from "./api";

const wsClients: Bun.ServerWebSocket<unknown>[] = [];

serve({
  websocket: {
    open(ws) {
      wsClients.push(ws);
      console.info(`Client connected`);
    },
    close(ws, code, reason) {
      wsClients.splice(wsClients.indexOf(ws), 1);
      console.log(`Client disconnected: ${code} ${reason}`);
    },
    async message(ws, message) {
      // Handle message
      if (typeof message !== "string") {
        return;
      }
      const parsedJson = JSON.parse(message) as Message<any>;
      console.log("Parsed JSON:", parsedJson);

      const type = parsedJson.type as MessageType;

      // handle message here
    },
  },
  routes: {
    "/": indexHtml,
    "/ws": (req, server) => {
      const success = server.upgrade(req);
      if (success) {
        return undefined;
      }
      // handle HTTP request normally
      return new Response("Hello world!");
    },
    "/api/**": async (req) => {
      return await api.fetch(req);
    },
    "/api": async (req) => {
      return await api.fetch(req);
    },
    "/hello": async () => {},
  },
  port: 3000,
  development: process.env.NODE_ENV !== "production",
});

console.log("Server started on port 3000");
