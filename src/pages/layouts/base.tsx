import { liveReloadScript } from "@/lib/liveReloadScript";
import { env } from "@/env";

const safeLiveReloadScript =
  env.NODE_ENV === "development" ? liveReloadScript() : "";

type Children =
  | number
  | string
  | Promise<string>
  | boolean
  | null
  | undefined
  | Children[];

type Props<T = {}> = {
  children?: Children;
} & T;

export default function BaseHtml({ children }: Props) {
  return (
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title> Beth Stack 🦊</title>
        <script
          src="https://unpkg.com/htmx.org@1.9.7"
          integrity="sha384-EAzY246d6BpbWR7sQ8+WEm40J8c3dHFsqC58IgPlh4kMbRRI6P6WA+LA/qGAyAu8"
          crossorigin="anonymous"
        ></script>
        <script>htmx.config.globalViewTransitions = true;</script>
        <script src="https://unpkg.com/htmx.org/dist/ext/response-targets.js"></script>
        <script src="https://unpkg.com/htmx.org/dist/ext/loading-states.js"></script>
        {/* <style>
        {`
          [data-loading] {
            display: none;
          }
        `}
        </style> */}
        <link rel="icon" type="image/x-icon" href="/public/favicon.png" />
        <link rel="stylesheet" href="/public/global.css" />
        <style>{`
          @keyframes fade-in {
            from { opacity: 0; }
          }

          @keyframes fade-out {
            to { opacity: 0; }
          }

          @keyframes slide-from-right {
            from { transform: translateX(90px); }
          }

          @keyframes slide-to-left {
            to { transform: translateX(-90px); }
          }

          .slide-it {
            view-transition-name: slide-it;
          }

          ::view-transition-old(slide-it) {
            animation: 180ms cubic-bezier(0.4, 0, 1, 1) both fade-out,
            600ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-left;
          }
          ::view-transition-new(slide-it) {
            animation: 420ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in,
            600ms cubic-bezier(0.4, 0, 0.2, 1) both slide-from-right;
          }
        `}</style>
        <script>{safeLiveReloadScript}</script>
      </head>
      <body hx-boost="true" hx-ext="loading-states">
        <main id="root">{children}</main>
      </body>
    </html>
  );
}
