import { Hono } from "hono";
import { okAsync } from "neverthrow";
import z from "zod";
import { safeRoute } from "../safeRoute";

const testSchema = z.object({
  user: z.string(),
});

export const githubRouter = new Hono().get(
  "/",
  safeRoute(
    (_, input) => {
      return okAsync({ message: "Hello " + input.user });
    },
    testSchema,
    "query",
  ),
);
