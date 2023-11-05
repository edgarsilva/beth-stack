export function liveReloadScript({
  debounceTime = 100,
  url = `ws://localhost:${process.env.LIVERELOAD_PORT || 8001}/ws`,
}: {
  url?: string;
  debounceTime?: number;
} = {}): string {
  return `
        let reloadTimeout;
        (function () {
          let socket = new WebSocket(\"${url}\");

          socket.onopen = function(e) {
            console.log("live-reload socket: connected")
          };


          socket.onmessage = function(event) {
            console.log("live-reload event", event.data)
            clearTimeout(reloadTimeout);

            reloadTimeout = setTimeout(() => {
              location.reload();
            }, ${debounceTime});
          };

          socket.onclose = function(event) {
            console.log("live-reload socket: closed");
          };

          socket.onerror = function(error) {
            console.log("live-reload socket: error - " + error.message);
          };
        })();
        `;
}
