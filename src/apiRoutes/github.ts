import { Hono } from "hono";
import { safeRoute } from "../api";
import { ok, okAsync } from "neverthrow";
import { zValidator } from "@hono/zod-validator";
import z from "zod";

const testSchema = z.object({
  messageUser: z.string(),
});

export const githubRouter = new Hono().get(
  "/",
  zValidator("json", testSchema),
  safeRoute((c) => {
    console.log(c.req.valid("json"));
    return okAsync({ message: "Hello" });
  }),
);
