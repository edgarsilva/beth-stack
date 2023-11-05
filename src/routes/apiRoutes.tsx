// App
import { html } from "@elysiajs/html";
import { type Elysia, t } from "elysia";
import { type AppContext } from "@/app";

// utils
import { nanoid } from "nanoid";

// Components
import Todo from "@/components/Todo";

export function apiRouter(app: Elysia, { prisma }: AppContext) {
  app
    .use(html())
    .patch(
      "/api/todos/:id/toggle",
      async ({ query, params, html }) => {
        const todo = await prisma.todo.update({
          where: {
            id: +params.id,
          },
          data: {
            completed: query.completed === "true" ? false : true,
          },
        });

        return html(<Todo todo={todo} />);
      },
      {
        params: t.Object({
          id: t.String(),
        }),
        query: t.Object({
          completed: t.String(),
        }),
      },
    )
    .delete("/api/todos/:id", async ({ params, html }) => {
      await prisma.todo.delete({
        where: {
          id: +params.id,
        },
      });
      return;
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

      return html(<Todo todo={todo} />);
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
}

export default apiRouter;
