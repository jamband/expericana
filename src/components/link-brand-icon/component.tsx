import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LinkExternal } from "~/components/link-external";
import type { _Props } from "./types";

export const Component: React.VFC<_Props> = (props) => (
  <>
    {props.links.map((link, index) => (
      <LinkExternal key={index} href={link} className="tag" aria-label={link}>
        <FontAwesomeIcon icon={props.icon(link)} size="lg" />{" "}
      </LinkExternal>
    ))}
  </>
);
