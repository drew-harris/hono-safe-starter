import { ResultAsync } from "neverthrow";
import type { JSONValue } from "hono/utils/types";
import type { ZodSchema, z } from "zod";
import type { Context } from "hono";
export const safeRoute = <
  T extends JSONValue,
  M extends string,
  Z extends ZodSchema,
  W extends string = "json",
>(
  handler: (
    c: Context<
      any,
      M,
      {
        out: {
          [type in W]: z.infer<Z>;
        };
        in: {
          [type in W]: z.infer<Z>;
        };
      }
    >,
  ) => ResultAsync<T, Error>,
  _schema?: Z,
  _inputMethod?: W,
) => {
  return async (
    c: Context<
      any,
      M,
      {
        out: {
          [type in W]: z.infer<Z>;
        };
        in: {
          [type in W]: z.infer<Z>;
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
