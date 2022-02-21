import type { IconName, IconPrefix } from "@fortawesome/fontawesome-svg-core";

jest.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon({ icon }: { icon: [IconPrefix, IconName] }) {
    return <svg data-prefix={icon[0]} data-icon={icon[1]} role="img" />;
  },
}));

export {};
