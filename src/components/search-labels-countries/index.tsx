import { useRouter } from "next/router";
import { Component } from "./component";
import { useLabelsCountries } from "~/hooks/query";

export const SearchLabelsCountries: React.VFC = () => {
  const { query } = useRouter();
  const label = query.country?.toString() || "Countries";

  const { data, error, isLoading } = useLabelsCountries();

  return (
    <Component label={label} data={data} error={error} isLoading={isLoading} />
  );
};
