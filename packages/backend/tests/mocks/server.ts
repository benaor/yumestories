import { setupServer } from "msw/node";
import { handlers } from "./handlers";

export const server = setupServer(...handlers);

server.events.on("request:start", ({ method, url }) => {
  console.info("MSW has intercepted", method, "Request on", url.href);
});
