import type { GetStaticPaths } from "next";
import View, { getStaticProps } from "~/pages/labels";
import { http } from "~/utils/http";

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await http({ url: "/labels/tags" });
  const tags = await response.json();

  return {
    paths: tags.map((tag: string) => ({
      params: { tag },
    })),
    fallback: false,
  };
};

export { getStaticProps };

export default View;
