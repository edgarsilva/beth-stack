// Utils
import { cn } from "@/lib/cn";

type Todo = {
  id: number;
  title: string;
  content: string;
  completed: boolean;
};

function Toggle({ completed, id }: { id: number; completed: boolean }) {
  return (
    <div
      hx-trigger="click"
      hx-patch={`/api/todos/${id}/toggle?completed=${completed}`}
      hx-swap="outerHTML"
      hx-target={`#todo_${id}`}
      class={cn(
        completed ? "bg-indigo-600" : "bg-gray-400",
        "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-slate-400 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2",
      )}
    >
      <span class="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        class={cn(
          completed ? "translate-x-5" : "translate-x-0",
          "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
        )}
      />
    </div>
  );
}

export default async function PostList({ todo }: { todo: Todo }) {
  return (
    <div
      class="flex w-full max-w-3xl flex-col gap-4 rounded-3xl bg-white/50 p-4 shadow-lg backdrop-blur-sm"
      id={`todo_${todo.id}`}
    >
      <h2 class="flex items-center justify-end gap-4 text-xl font-bold">
        <span class="mr-auto">
          {todo.id} - {todo.title}
        </span>
        <Toggle id={todo.id} completed={todo.completed} />
        <button
          class="rounded-full bg-red-500 p-1 font-bold text-white hover:bg-blue-700"
          hx-delete={`/api/todos/${todo.id}`}
          hx-target={`#todo_${todo.id}`}
          hx-swap="outerHTML"
        >
          <svg
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </h2>
      <p>{todo.content}</p>
    </div>
  );
}
