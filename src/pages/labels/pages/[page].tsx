import type { GetStaticPaths } from "next";
import View, { getStaticProps } from "~/pages/labels";
import type { Pagination } from "~/types/pagination";
import { http } from "~/utils/http";

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await http({
    url: "/labels",
  });

  const { _meta }: { _meta: Pagination } = await response.json();

  return {
    paths: [...Array(_meta.pageCount)].map((_, i) => ({
      params: { page: `${i + 1}` },
    })),
    fallback: false,
  };
};

export { getStaticProps };

export default View;
