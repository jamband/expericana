import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LinkExternal } from "~/components/link-external";
import { Page } from "~/layouts/page";

export default function View() {
  return (
    <Page title="Contact">
      <div className="row">
        <div className="col-md-10 col-lg-8 offset-md-1 offset-lg-2">
          <h1>
            Contact <small className="text-muted">for bugs and questions</small>
          </h1>
          Please to the message via{" "}
          <LinkExternal href="https://twitter.com/livejam_db">
            <FontAwesomeIcon icon={["fab", "twitter"]} fixedWidth />
            Twitter
          </LinkExternal>{" "}
          or{" "}
          <LinkExternal href="https://github.com/jamband/expericana/issues">
            <FontAwesomeIcon icon={["fab", "github"]} fixedWidth />
            GitHub
          </LinkExternal>{" "}
          Issues. Thank you.
        </div>
      </div>
    </Page>
  );
}
