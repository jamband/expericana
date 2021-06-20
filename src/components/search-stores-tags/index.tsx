import { useRouter } from "next/router";
import { Component } from "./component";
import { useStoresTags } from "~/hooks/query";

export const SearchStoresTags: React.VFC = () => {
  const { query } = useRouter();
  const label = query.tag?.toString() || "Tags";

  const { data, error, isLoading } = useStoresTags();

  return (
    <Component label={label} data={data} error={error} isLoading={isLoading} />
  );
};
