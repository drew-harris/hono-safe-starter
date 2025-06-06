import { Hono, type Context, type Input } from "hono";
import { githubRouter } from "./apiRoutes/github";
import { ResultAsync } from "neverthrow";
import type { JSONValue } from "hono/utils/types";
import type { ZodSchema } from "zod";
import type { ResponseFormat } from "hono/types";

export type ApiType = typeof api;

export const safeRoute = <T extends JSONValue, I>(
  handler: (
    c: Context<
      any,
      any,
      {
        out: {
          [typeof inputType]: {
            body: I;
          };
        };
      }
    >,
  ) => ResultAsync<T, Error>,
  schema?: ZodSchema<I>,
  inputType?: ResponseFormat,
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
