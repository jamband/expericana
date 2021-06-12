import { LinkExternal } from "~/components/link-external";
import { Page } from "~/layouts/page";

export default function View() {
  const optOut = () => {
    //
  };

  return (
    <Page title="Privacy">
      <div className="row">
        <div className="col-md-10 col-lg-8 offset-md-1 offset-lg-2">
          <h1>Privacy Policy</h1>
          <p>
            This site uses Google Analytics. The Google Analytics tool collects
            internet log information and visitor behavior information in an
            anonymous form. About the information collected by Google Analytics,
            please see the following links.
          </p>
          <LinkExternal href="https://policies.google.com/privacy?hl=en">
            Google Privacy & Terms
          </LinkExternal>
          <h4 className="mt-5 mb-3">What is Google Analytics used for?</h4>
          <ul>
            <li>To know the traffic on this site and the use of web pages.</li>
            <li>To know where it was accessed.</li>
            <li>To know the type of OS and device.</li>
          </ul>
          Knowing them helps make this site better.
          <h4 className="mt-5 mb-3">
            How long is the retention period of data by Google Analytics?
          </h4>
          <p>
            Data retention period is <strong>26 months</strong>.
          </p>
          <h4 className="mt-5 mb-3">Google Analytics Opt-Out</h4>
          <p>
            If message related to Google Analytics is displayed at the bottom of
            the screen, it means that you have not consent to the privacy policy
            of this site yet. If you consent, please press the{" "}
            <strong>I ACCEPT</strong>.
          </p>
          <p>
            Ever after consenting, you can opt-out by pressing the following
            link:{" "}
            <button
              className="btn btn-link align-baseline m-0 p-0"
              onClick={optOut}
            >
              Opt-Out
            </button>
          </p>
        </div>
      </div>
    </Page>
  );
}
