import type { IconProp } from "~/types/fontawesome";

jest.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon({ icon }: { icon: IconProp }) {
    return <svg data-prefix={icon[0]} data-icon={icon[1]} role="img" />;
  },
}));

export {};
