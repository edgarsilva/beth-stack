const safeScript = "";
//   config.env.NODE_ENV === "development" ? liveReloadScript() : "";

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
        <script src="https://unpkg.com/htmx.org@1.9.5"></script>
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
        <script>{safeScript}</script>
      </head>
      <body hx-boost="true" hx-ext="loading-states">
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
