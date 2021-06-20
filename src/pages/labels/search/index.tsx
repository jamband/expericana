import type { GetServerSideProps } from "next";
import View from "~/pages/labels";
import type { Label } from "~/types/label";
import type { Pagination } from "~/types/pagination";
import { http } from "~/utils/http";

type Props = {
  labels: Label[];
  pagination: Pagination;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const response = await http({
    url: "/labels/search?expand=tags",
    params: query,
  });

  const labels = await response.json();

  return {
    props: {
      labels: labels.items,
      pagination: labels._meta,
    },
  };
};

export default View;
