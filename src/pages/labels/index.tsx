import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { GetStaticProps } from "next";
import Link from "next/link";
import { LinkBrandIcon } from "~/components/link-brand-icon";
import { LinkExternal } from "~/components/link-external";
import { Pagination } from "~/components/pagination";
import { SearchForm } from "~/components/search-form";
import { SearchLabelsCountries } from "~/components/search-labels-countries";
import { SearchLabelsTags } from "~/components/search-labels-tags";
import { TotalCount } from "~/components/total-count";
import { Page } from "~/layouts/page";
import type { Label } from "~/types/label";
import type { Pagination as PaginationProp } from "~/types/pagination";
import { http } from "~/utils/http";

type Props = {
  labels: Label[];
  pagination: PaginationProp;
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const response = await http({
    url: "/labels?expand=tags",
    params,
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
          <SearchForm className="d-md-none mt-3" />
        </div>
        <div className="col-lg-8 mt-3 mt-lg-0">
          <div className="row">
            {props.labels.map((label, index) => (
              <article key={index} className="col-lg-6 mb-3">
                <section className="mb-1">
                  <LinkExternal href={label.url}>
                    <FontAwesomeIcon icon={["fas", "external-link-alt"]} />{" "}
                    <strong>{label.name}</strong>
                  </LinkExternal>
                </section>
                <section className="mb-1">
                  <span className="me-2 text-light">Country:</span>
                  <Link href={`/labels/countries/${label.country}/pages/1`}>
                    <a className="tag">{label.country}</a>
                  </Link>
                </section>
                <section className="mb-1">
                  <span className="me-2 text-light">Links:</span>
                  <LinkBrandIcon link={label.link} />
                </section>
                <section>
                  <span className="me-2 text-light">Tags:</span>
                  {label.tags.map((tag, index) => (
                    <Link key={index} href={`/labels/tags/${tag.name}/pages/1`}>
                      <a className="tag">{tag.name}</a>
                    </Link>
                  ))}
                </section>
                <hr />
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
