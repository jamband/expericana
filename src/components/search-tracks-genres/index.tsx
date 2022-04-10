import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { Component } from "./component";

export const SearchTracksGenres: React.VFC = () => {
  const { query } = useRouter();
  const label = query.genre?.toString() || "Genres";

  const { data, error, isLoading } = useQuery<string[], Error>(
    "/tracks/genres",
    { staleTime: Infinity }
  );

  return (
    <Component label={label} data={data} error={error} isLoading={isLoading} />
  );
};
