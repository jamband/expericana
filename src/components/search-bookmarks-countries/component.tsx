import { Dropdown } from "~/components/dropdown";
import { DropdownLink } from "~/components/dropdown-link";
import { DropdownText } from "~/components/dropdown-text";
import { Loading } from "~/components/loading";
import type { _Props } from "./types";

export const Component: React.VFC<_Props> = (props) => (
  <Dropdown
    id="dropdownBookmarksCountries"
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
      props.data.map((country, index) => (
        <DropdownLink
          key={index}
          href={`/bookmarks/countries/${country}/pages/1`}
        >
          {country}
        </DropdownLink>
      ))}
  </Dropdown>
);
