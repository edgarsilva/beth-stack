// App
import { type Elysia } from "elysia";
import { html } from "@elysiajs/html";
import { type AppContext } from "@/app";

// Components
import BaseHtml from "@/pages/layouts/base";
// import PostList from "@/components/PostList";

export const pageRoutes = (app: Elysia, { prisma }: AppContext) =>
  app.use(html()).get("/todos", async ({ html }) => {
    // const people = await prisma.user.findMany({ take: 10 });

    return html(
      <BaseHtml>
        <div class="flex h-screen w-screen items-center justify-center bg-purple-300">
          <div class="flex w-full max-w-3xl flex-col items-center justify-center rounded-3xl bg-white/50 p-4 shadow-lg backdrop-blur-sm">
            <h1 class="mb-4  p-4 text-lg  font-semibold ">HTMX V1.0</h1>
            <button
              class="max-w-sm rounded-xl bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
              hx-post="/api/todos"
              hx-target="#todos"
              hx-swap="beforeend"
            >
              Add todo
            </button>
          </div>
          <div id="todos" class="flex gap-4 "></div>
        </div>
      </BaseHtml>,
    );
  });

export default pageRoutes;
