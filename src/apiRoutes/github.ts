import { Hono } from "hono";
import { safeRoute } from "../api";
import { ok, okAsync } from "neverthrow";

export const githubRouter = new Hono().get(
  "/",
  safeRoute((c) => {
    return okAsync({ water: "mellon" as const });
  }),
);
