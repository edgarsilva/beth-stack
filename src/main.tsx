// Elysia.js & Plugins
import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";
import { cron } from "@elysiajs/cron";

// Prisma preload singleton
import { prisma, tursoSync } from "@/lib/prisma";

// Pages
import BaseHtml from "./pages/layouts/base";

// Components
import PostList from "./components/PostList";
import Hero from "./components/Hero";

const app = new Elysia()
  .use(
    cron({
      name: "tursosync.cron",
      pattern: "*/30 * * * * *",
      run() {
        const now = performance.now();
        // console.log("Syncing database...");
        tursoSync().then(() => {
          console.log(
            `Turso local replica synced in ${performance.now() - now}ms`,
          );
        });
      },
    }),
  )
  .use(staticPlugin())
  .use(html())
  .get("/", () => "Hello Elysia")
  .get("/btnx", () => {
    return (
      <button
        type="button"
        className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
      >
        Button text
      </button>
    );
  })
  .get("/hero", ({ html }) => {
    return html(
      <BaseHtml>
        <div class="h-screen w-screen bg-gray-900">
          <Hero />
        </div>
        <div class="h-screen w-screen bg-gray-900">
          <PostList />
        </div>
      </BaseHtml>,
    );
  })
  .onStart(({ log }) => {
    if (process.env.NODE_ENV === "development") {
      // void fetch("http://localhost:3001/restart");
      // log.debug("🦊 Triggering Live Reload");
      console.log("🦊 Triggering Live Reload");
    }
  })
  .onError(({ code, error, request, log }) => {
    // log.error(` ${request.method} ${request.url}`, code, error);
    console.error("request ->", request);
    console.error("code ->", code);
    console.error("DESCRIBE ERROR ->", error);
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
