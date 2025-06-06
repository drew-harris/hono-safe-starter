import { Hono } from "hono";
import { githubRouter } from "./apiRoutes/github";

export type ApiType = typeof api;

export const api = new Hono()
  .basePath("/api")
  .onError((err, c) => {
    console.error(err);
    if (err instanceof Error) {
      return c.json({ error: err.message }, 500);
    } else {
      return c.json({ error: "Unknown error" }, 500);
    }
  })
  .get("/", async (c) => {
    return c.json({ message: "Hello" });
  })
  .route("/github", githubRouter);
