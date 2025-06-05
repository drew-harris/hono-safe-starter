import { Hono, type Context } from "hono";
import { githubRouter } from "./apiRoutes/github";
import { ResultAsync } from "neverthrow";
import type { JSONValue } from "hono/utils/types";

export type ApiType = typeof api;

export const safeRoute = <T extends JSONValue>(
  handler: (c: Context) => ResultAsync<T, Error>,
) => {
  return async (c: Context) => {
    const result = await handler(c);
    if (result.isOk()) {
      return c.json(result.value);
    } else {
      throw result.error;
    }
  };
};

export const api = new Hono()
  .basePath("/api")
  .onError((err, c) => {
    if (err instanceof Error) {
      return c.json({ error: err.message });
    } else {
      return c.json({ error: "Unknown error" }, 500);
    }
  })
  .get("/", async (c) => {
    return c.json({ message: "Hello" });
  })
  .route("/github", githubRouter);
