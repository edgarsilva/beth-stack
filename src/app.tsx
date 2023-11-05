// Elysia.js & Plugins
import { Elysia } from "elysia";
// import { html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";

// Env
import { env } from "@/env";

// Live Reload
import { liveReloadPlugin } from "@/lib/live-reload-plugin";

// Prisma, Turso & Local Replica Sync Cron
import { prisma } from "@/lib/prisma";
import { tursoSyncPlugin } from "@/lib/turso-sync";

// Routers
import { apiRouter } from "./routes/apiRoutes";
import { pagesRouter } from "./routes/pagesRouter";

// App Context
export const ctx = {
  prisma: prisma,
};
export type AppContext = typeof ctx;

// App Setup
const app = new Elysia().use(staticPlugin()).use(tursoSyncPlugin);

// Live Reload only in DEV
if (env.DEV) {
  liveReloadPlugin(app);
}

// Routers
pagesRouter(app, ctx);
apiRouter(app, ctx);

// .onError(({ code, error, request, log }) => {
// log.error(` ${request.method} ${request.url}`, code, error);
// console.error("request ->", request);
// console.error("code ->", code);
// console.error("DESCRIBE ERROR ->", error);
// })

app
  .onStart(() => {
    if (env.DEV) {
      void fetch(`http://localhost:${env.LIVE_RELOAD_PORT}/restart`);
      console.log("🖥️ Reloading clients...");
    }
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
