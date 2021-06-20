import { Dropdown } from "~/components/dropdown";
import { DropdownLink } from "~/components/dropdown-link";
import { MUSIC_PROVIDERS } from "~/constants/music";
import { _Props } from "./types";

export const Component: React.VFC<_Props> = (props) => (
  <Dropdown
    id="searchTracksProviders"
    className="d-inline-block"
    label={props.label}
  >
    {MUSIC_PROVIDERS.map((provider, index) => (
      <DropdownLink key={index} href={`/tracks/providers/${provider}/pages/1`}>
        {provider}
      </DropdownLink>
    ))}
  </Dropdown>
);
