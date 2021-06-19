import type { GetStaticPaths } from "next";
import View, { getStaticProps } from "~/pages/bookmarks";
import { http } from "~/utils/http";

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await http({
    url: "/bookmarks/countries",
  });

  const countries = await response.json();

  return {
    paths: countries.map((country: string) => ({
      params: { country },
    })),
    fallback: false,
  };
};

export { getStaticProps };

export default View;
