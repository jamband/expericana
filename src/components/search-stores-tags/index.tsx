import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { Component } from "./component";

export const SearchStoresTags: React.VFC = () => {
  const { query } = useRouter();
  const label = query.tag?.toString() || "Tags";

  const { data, error, isLoading } = useQuery<string[], Error>("/stores/tags", {
    staleTime: Infinity,
  });

  return (
    <Component label={label} data={data} error={error} isLoading={isLoading} />
  );
};
