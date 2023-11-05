#!/usr/bin/env bun
import { type Elysia } from "elysia";
import { env } from "@/env";

export function liveReloadPlugin(app: Elysia) {
  app.onStart(() => {
    if (env.DEV) {
      void fetch(`http://localhost:${env.LIVE_RELOAD_PORT}/restart`);
      console.log("🚰 Reloading clients...");
    }
  });

  return app;
}

export default liveReloadPlugin;
