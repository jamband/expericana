import { LinkExternal } from "~/components/link-external";
import { Page } from "~/layouts/page";
import { APP_NAME } from "~/constants/app";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function View() {
  return (
    <Page title="About">
      <div className="row">
        <div className="col-md-10 col-lg-8 offset-md-1 offset-lg-2">
          <h1>About</h1>
          <p>
            {APP_NAME} is music archive website for everyday.
            <br />
            This website is an open source project.
          </p>
          <LinkExternal href="https://github.com/jamband/expericana">
            <FontAwesomeIcon icon={["fab", "github"]} size="sm" fixedWidth />{" "}
            jamband/expericana
          </LinkExternal>
        </div>
      </div>
    </Page>
  );
}
