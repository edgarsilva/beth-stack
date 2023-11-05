#!/usr/bin/env bun
import { Elysia } from "elysia";
import type { ElysiaWS } from "@elysiajs/websocket";
import { env } from "@/env";

const wsConnections = new Set<ElysiaWS>();

function dispatchLiveReload() {
  wsConnections.forEach((connection) => {
    console.log("sending live-reload refresh");
    connection.send("refresh");
  });
}

const app = new Elysia()
  .ws("/ws", {
    open(ws) {
      console.log("🟢 open live-reload session");
      wsConnections.add(ws);
    },
    close(ws) {
      console.log("🔴 closed live-reload session");
      wsConnections.delete(ws);
    },
  })
  .get("/restart", () => {
    console.log("🏎️ Live Reload - Reloading clients!", wsConnections.size);

    dispatchLiveReload();
  })
  .listen(env.LIVE_RELOAD_PORT);

console.log(
  `🔥 Live reload running ${app.server?.hostname}:${app.server?.port}`,
);
