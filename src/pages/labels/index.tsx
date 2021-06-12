import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { SearchLabelsCountries } from "~/components/search-labels-countries";
import { SearchLabelsTags } from "~/components/search-labels-tags";
import { LinkBrandIcon } from "~/components/link-brand-icon";
import { Pagination } from "~/components/pagination";
import { TotalCount } from "~/components/total-count";
import { Page } from "~/layouts/page";
import type { Label } from "~/types/label";
import type { Pagination as PaginationProp } from "~/types/pagination";
import { http } from "~/utils/http";
import { SearchForm } from "~/components/search-form";

type Props = {
  labels: Label[];
  pagination: PaginationProp;
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const response = await http({
    url: context.query.q ? "/labels/search?expand=tags" : "/labels?expand=tags",
    params: context.query,
  });

  const labels = await response.json();

  return {
    props: {
      labels: labels.items,
      pagination: labels._meta,
    },
  };
};

export default function View(props: Props) {
  return (
    <Page title="Labels">
      <div className="row">
        <div className="col-lg-4">
          <h1 className="mt-0 mb-3">Labels</h1>
          <Link href="/labels">
            <a className="tag">
              <FontAwesomeIcon icon={["fas", "redo-alt"]} size="sm" /> Reset All
            </a>
          </Link>
          <TotalCount className="me-3" total={props.pagination.totalCount} />
          <br className="d-md-none d-lg-block" />
          <SearchLabelsCountries />
          <SearchLabelsTags />
          <SearchForm className="d-md-none my-2" />
        </div>
        <div className="col-lg-8 mt-md-3 mt-lg-0">
          <div className="row">
            {props.labels.map((label, index) => (
              <article key={index} className="col-lg-6 mb-3">
                <section className="mb-1">
                  <a href={label.url}>
                    <FontAwesomeIcon icon={["fas", "external-link-alt"]} />{" "}
                    <strong>{label.name}</strong>
                  </a>
                </section>
                <section className="mb-1">
                  <span className="me-2">Country:</span>
                  {label.country}
                </section>
                <section className="mb-1">
                  <span className="me-2">Links:</span>
                  <LinkBrandIcon link={label.link} />
                </section>
                <section>
                  <span className="me-2">Tags:</span>
                  {label.tags.map((tag, index) => (
                    <Link
                      key={index}
                      href={{
                        pathname: "/labels",
                        query: { tag: tag.name },
                      }}
                    >
                      <a className="tag">{tag.name}</a>
                    </Link>
                  ))}
                </section>
                <hr className="text-muted" />
              </article>
            ))}
          </div>
          <Pagination
            className="mt-2 mt-sm-4"
            currentPage={props.pagination.currentPage}
            total={props.pagination.pageCount}
          />
        </div>
      </div>
    </Page>
  );
}
