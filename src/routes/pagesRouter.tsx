// App
import { type Elysia } from "elysia";
import { html } from "@elysiajs/html";
import { type AppContext } from "@/app";

// Components
import BaseHtml from "@/pages/layouts/base";
import Todo from "@/components/Todo";
// import PostList from "@/components/PostList";

export function pagesRouter(app: Elysia, { prisma }: AppContext) {
  app.use(html()).get("/todos", async ({ html }) => {
    const todos = await prisma.todo.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        completed: true,
      },
    });

    return html(
      <BaseHtml>
        <div class="flex h-screen w-screen flex-col items-center justify-center gap-8 bg-purple-300">
          <div class="flex w-full max-w-3xl items-center justify-center rounded-3xl bg-white/50 p-4 shadow-lg backdrop-blur-sm">
            <h1 class="mb-4 p-4 text-xl font-semibold ">HTMX Todo List</h1>
            <button
              class="max-w-sm rounded-xl bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
              hx-post="/api/todos"
              hx-target="#todos"
              hx-swap="beforeend"
            >
              Add todo
            </button>
          </div>
          <div class="flex w-full flex-col items-center gap-4" id="todos">
            {todos.map((todo) => (
              <Todo todo={todo} />
            ))}
          </div>
        </div>
      </BaseHtml>,
    );
  });
}

export default pagesRouter;
