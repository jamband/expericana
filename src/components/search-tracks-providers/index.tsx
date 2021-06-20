import { useRouter } from "next/router";
import { Component } from "./component";

export const SearchTracksProviders: React.VFC = () => {
  const { query } = useRouter();
  const label = query.provider?.toString() || "Providers";

  return <Component label={label} />;
};
