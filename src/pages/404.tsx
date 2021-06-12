import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Page } from "~/layouts/page";

export default function View() {
  return (
    <Page title="Not Found">
      <div className="row">
        <div className="col-md-10 col-lg-8 offset-md-1 offset-lg-2">
          <h1>Not Found</h1>
          <p>
            <FontAwesomeIcon icon={["fas", "info-circle"]} size="sm" /> Page not
            found.
          </p>
          <p className="text-center mt-5">
            <Link href="/">
              <a>
                <FontAwesomeIcon
                  icon={["fas", "angle-left"]}
                  size="sm"
                  fixedWidth
                />{" "}
                Back to Home
              </a>
            </Link>
          </p>
        </div>
      </div>
    </Page>
  );
}
