import { Hono } from "hono";
import { err, okAsync } from "neverthrow";
import z from "zod";
import { safeRoute } from "../safeRoute";

const testSchema = z.object({
  messageUser: z.string(),
});

export const githubRouter = new Hono().get(
  "/",
  safeRoute((c) => {
    return okAsync({ message: "Hello" }).mapErr(() => {
      return new Error("Failed to get message");
    });
  }),
);
