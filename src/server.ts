import app from "./app.ts";

import { load } from "std/dotenv/mod.ts";

// first try to load .env file if fails try to load from process env
const env = await load();
let port = env["PORT"];
if (!port) port = Deno.env.get("PORT") || "8080";

console.log(`Listening on port ${port}...`);

await app.listen({
  hostname: "0.0.0.0",
  port: +port,
});
