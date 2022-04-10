import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { Component } from "./component";

export const SearchLabelsCountries: React.VFC = () => {
  const { query } = useRouter();
  const label = query.country?.toString() || "Countries";

  const { data, error, isLoading } = useQuery<string[], Error>(
    "/labels/countries",
    { staleTime: Infinity }
  );

  return (
    <Component label={label} data={data} error={error} isLoading={isLoading} />
  );
};
