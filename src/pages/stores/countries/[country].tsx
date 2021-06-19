import type { GetStaticPaths } from "next";
import View, { getStaticProps } from "~/pages/stores";
import { http } from "~/utils/http";

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await http({
    url: "/stores/countries",
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
