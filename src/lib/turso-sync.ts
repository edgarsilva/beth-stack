// Elysia.js & Plugins
import { Elysia } from "elysia";
import { cron } from "@elysiajs/cron";

// Prisma preload singleton
import { tursoSync } from "@/lib/prisma";

export const tursoSyncPlugin = new Elysia().use(
  cron({
    name: "tursosync.cron",
    pattern: "*/30 * * * * *",
    run() {
      // const now = performance.now();
      tursoSync().then(() => {
        // console.log(
        //   `Turso local replica synced in ${performance.now() - now}ms`,
        // );
      });
    },
  }),
);

export default tursoSyncPlugin;
