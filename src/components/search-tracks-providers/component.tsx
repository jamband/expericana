import { Dropdown } from "~/components/dropdown";
import { DropdownDivider } from "~/components/dropdown-divider";
import { DropdownLink } from "~/components/dropdown-link";
import { MUSIC_PROVIDERS } from "~/constants/music";
import { _Props } from "./types";

export const Component: React.VFC<_Props> = (props) => (
  <Dropdown
    id="searchTracksProviders"
    className="d-inline-block"
    label={props.label}
  >
    <DropdownLink href={props.resetLink}>Reset</DropdownLink>
    <DropdownDivider />
    {MUSIC_PROVIDERS.map((provider, index) => (
      <DropdownLink key={index} href={props.itemLink(provider)}>
        {provider}
      </DropdownLink>
    ))}
  </Dropdown>
);
