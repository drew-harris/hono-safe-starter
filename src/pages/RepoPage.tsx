import { useQuery } from "@tanstack/react-query";
import { useLoaderData } from "react-router";
import { client } from "../fetch";

export const RepoPage = () => {
  const { data, error } = useQuery({
    queryKey: ["repo"],
    queryFn: async () => {
      return client.api.github
        .$get({
          query: { user: "drew" },
        })
        .then((res) => res.json());
    },
  });
  return (
    <div>
      <div>message: {data?.message || "no message"}</div>
      <div>error: {error?.message || "no error"}</div>
    </div>
  );
};
