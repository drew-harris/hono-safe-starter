import { Hono, type Context, type Input, type ValidationTargets } from "hono";
import { githubRouter } from "./apiRoutes/github";
import { ResultAsync } from "neverthrow";
import type { JSONValue } from "hono/utils/types";
import type { ZodSchema, z } from "zod";

export type ApiType = typeof api;
type InputType = "json";

export const safeRoute = <
  T extends JSONValue,
  M extends string,
  Z extends ZodSchema,
>(
  handler: (
    c: Context<
      any,
      M,
      {
        out: {
          json: z.infer<Z>;
        };
        in: {
          json: z.infer<Z>;
        };
      }
    >,
  ) => ResultAsync<T, Error>,
  _schema?: Z,
  _inputMethod?: keyof ValidationTargets,
) => {
  return async (
    c: Context<
      any,
      M,
      {
        out: {
          json: z.infer<Z>;
        };
        in: {
          json: z.infer<Z>;
        };
      }
    >,
  ) => {
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
