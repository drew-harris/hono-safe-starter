import "./styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";
import { App } from "./App";
import { RepoPage } from "./pages/RepoPage";
import { hc } from "hono/client";
import type { ApiType } from "./api";

const queryClient = new QueryClient();

const client = hc<ApiType>("http://localhost:8787/", {
  fetch(input, requestInit, _) {
    return fetch(input, { ...requestInit });
  },
});

const result = await client.api.github.$post({
  json: {
    messageUser: "lsd",
  },
});

const result2 = await client.api.github.$post({
  json: {
    messageUser: "lsd",
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/:org/:repo",
    element: <RepoPage />,
    loader: async ({ params }) => {
      const { org, repo } = params;
      if (!org || !repo) {
        throw new Error("Invalid repo");
      }
      return { org, repo };
    },
  },
]);

document.addEventListener("DOMContentLoaded", () => {
  const root = createRoot(document.getElementById("root")!);
  root.render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
});
