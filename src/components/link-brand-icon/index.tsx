import type { IconName } from "@fortawesome/fontawesome-common-types";
import type { IconProp } from "~/types/fontawesome";
import { Component } from "./component";
import type { Props } from "./types";

export const LinkBrandIcon: React.VFC<Props> = (props) => {
  const links = props.link.split("\n").filter((link) => link !== "");

  const icon = (link: string): IconProp => {
    const icons = {
      "bandcamp.com": "bandcamp",
      "facebook.com": "facebook-square",
      "instagram.com": "instagram",
      "last.fm": "lastfm-square",
      "mixcloud.com": "mixcloud",
      "pinterest.com": "pinterest-square",
      "soundcloud.com": "soundcloud",
      "spotify.com": "spotify",
      "twitter.com": "twitter-square",
      "tumblr.com": "tumblr-square",
      "vimeo.com": "vimeo-square",
      "youtube.com": "youtube-square",
      // for bandcamp
      "fikarecordings.com": "bandcamp",
      "mamabirdrecordingco.com": "bandcamp",
      "maybemars.org": "bandcamp",
      "souterraine.biz": "bandcamp",
    };

    for (const [key, value] of Object.entries(icons)) {
      if (link.includes(key)) {
        return ["fab", value as IconName];
      }
    }

    return ["fas", "external-link-alt"];
  };

  return <Component links={links} icon={icon} {...props} />;
};
