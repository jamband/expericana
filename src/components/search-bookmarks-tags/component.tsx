import { Dropdown } from "~/components/dropdown";
import { DropdownLink } from "~/components/dropdown-link";
import { DropdownText } from "~/components/dropdown-text";
import { Loading } from "~/components/loading";
import type { _Props } from "./types";

export const Component: React.VFC<_Props> = (props) => (
  <Dropdown
    id="dropdownBookmarksTags"
    className="d-inline-block"
    label={props.label}
  >
    {props.isLoading && (
      <DropdownText>
        <Loading />
      </DropdownText>
    )}
    {props.error && <DropdownText>{props.error.message}</DropdownText>}
    {props.data &&
      props.data.map((tag, index) => (
        <DropdownLink key={index} href={`/bookmarks/tags/${tag}/pages/1`}>
          {tag}
        </DropdownLink>
      ))}
  </Dropdown>
);
