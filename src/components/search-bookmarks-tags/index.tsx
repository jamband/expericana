import { useRouter } from "next/router";
import { Component } from "./component";
import { useBookmarksTags } from "~/hooks/query";

export const SearchBookmarksTags: React.VFC = () => {
  const { query } = useRouter();
  const label = query.tag?.toString() || "Tags";

  const { data, error, isLoading } = useBookmarksTags();

  return (
    <Component label={label} data={data} error={error} isLoading={isLoading} />
  );
};
