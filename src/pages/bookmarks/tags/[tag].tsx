import type { GetStaticPaths } from "next";
import View, { getStaticProps } from "~/pages/bookmarks";
import { http } from "~/utils/http";

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await http({ url: "/bookmarks/tags" });
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
