import { Dropdown } from "~/components/dropdown";
import { DropdownDivider } from "~/components/dropdown-divider";
import { DropdownLink } from "~/components/dropdown-link";
import { DropdownText } from "~/components/dropdown-text";
import { Loading } from "~/components/loading";
import type { _Props } from "./types";

export const Component: React.VFC<_Props> = (props) => (
  <Dropdown
    id="dropdownLabelsTags"
    className="d-inline-block"
    label={props.label}
  >
    <DropdownLink href={props.resetLink}>Reset</DropdownLink>
    <DropdownDivider />
    {props.isLoading && (
      <DropdownText>
        <Loading />
      </DropdownText>
    )}
    {props.error && <DropdownText>{props.error.message}</DropdownText>}
    {props.data &&
      props.data.map((tag, index) => (
        <DropdownLink key={index} href={props.itemLink(tag)}>
          {tag}
        </DropdownLink>
      ))}
  </Dropdown>
);
