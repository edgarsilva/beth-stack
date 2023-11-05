#!/usr/bin/env bun
import { Elysia } from "elysia";
import { env } from "@/env";

export const liveReloadPlugin = new Elysia().onStart(() => {
  if (env.DEV) {
    void fetch(`http://localhost:${env.LIVE_RELOAD_PORT}/restart`);
    console.log("🖥️ Reloading clients...");
  }
});

export default liveReloadPlugin;
