import { useRouter } from "next/router";
import { Component } from "./component";
import { useLabelsTags } from "~/hooks/query";

export const SearchLabelsTags: React.VFC = () => {
  const { query } = useRouter();
  const label = query.tag?.toString() || "Tags";

  const { data, error, isLoading } = useLabelsTags();

  return (
    <Component label={label} data={data} error={error} isLoading={isLoading} />
  );
};
