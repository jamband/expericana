import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { Component } from "./component";

export const SearchLabelsTags: React.VFC = () => {
  const { query } = useRouter();
  const label = query.tag?.toString() || "Tags";

  const { data, error, isLoading } = useQuery<string[], Error>("/labels/tags", {
    staleTime: Infinity,
  });

  return (
    <Component label={label} data={data} error={error} isLoading={isLoading} />
  );
};
