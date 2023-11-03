// Elysia.js & Plugins
import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";

// Pages
import BaseHtml from "./pages/layouts/base";

// Components
import Hero from "./components/Hero";

const app = new Elysia()
  .use(staticPlugin())
  .use(html())
  .get("/", () => "Hello Elysia")
  .get("/hero", ({ html }) => {
    return html(
      <BaseHtml>
        <div class="h-screen w-screen bg-gray-900">
          <Hero />
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
