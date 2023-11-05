// App
import { html } from "@elysiajs/html";
import { type Elysia } from "elysia";
import { type AppContext } from "@/app";

// utils
import { nanoid } from "nanoid";

// Components
// import PostList from "@/components/PostList";

export const apiRoutes = (app: Elysia, { prisma }: AppContext) => {
  app
    .use(html())
    .patch("/api/todos/:id/toggle", async ({ html }) => {
      return html(
        <button
          class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          hx-get="/api/next-btn"
          hx-swap="outerHTML"
        >
          Prev button
        </button>,
      );
    })
    .delete("/api/todos/:id/delete", async ({ html }) => {
      return html(
        <button
          class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          hx-get="/api/prev-btn"
          hx-swap="outerHTML"
        >
          Next button
        </button>,
      );
    })
    .get("/api/todos/:id", () => {})
    .post("/api/todos", async ({ html }) => {
      const todo = await prisma.todo.create({
        select: {
          id: true,
          title: true,
          content: true,
          completed: true,
        },
        data: {
          title: `Buy milk ${nanoid(4)}`,
          content: "Buy a gallon of milk",
          completed: false,
          updatedAt: new Date(),
          createdAt: new Date(),
        },
      });

      return html(
        <div class="">
          <h1>Todo</h1>
          <p>{todo.title}</p>
          <p>{todo.content}</p>
          <p>{todo.completed}</p>
        </div>,
      );
    })
    .get("/api/todos", async () => {
      const users = await prisma.user.findMany({
        take: 10,
        include: {
          posts: true,
        },
      });
      return JSON.stringify(users, null, 2);
    });

  return app;
};

export default apiRoutes;
