import { Hono } from "hono";
import { safeRoute } from "../api";
import { ok, okAsync } from "neverthrow";
import { zValidator } from "@hono/zod-validator";
import z from "zod";

const testSchema = z.object({
  messageUser: z.string(),
});

export const githubRouter = new Hono().post(
  "/",
  zValidator("json", testSchema),
  safeRoute((c) => {
    console.log(c.req.valid("json").messageUser);
    return okAsync({ message: "Hello" });
  }, testSchema),
);
