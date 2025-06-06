import "./styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";
import { RepoPage } from "./pages/RepoPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Speed up development
      retry: false,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <RepoPage />,
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
