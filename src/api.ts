import { Hono } from "hono";

export type ApiType = typeof api;

export const api = new Hono()
  .basePath("/api")
  .onError((err, c) => {
    if (err instanceof Error) {
      return c.json({ error: err.message });
    } else {
      return c.json({ error: "Unknown error" });
    }
  })
  .get("/", async (c) => {
    return c.json({ message: "Hello" });
  });
