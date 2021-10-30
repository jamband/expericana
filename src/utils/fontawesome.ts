/*!
 * Font Awesome Free 5.15.4 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 */
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleDown,
  faAngleLeft,
  faAngleRight,
  faAngleUp,
  faClock,
  faDatabase,
  faEllipsisH,
  faExternalLinkAlt,
  faInfoCircle,
  faLock,
  faPauseCircle,
  faPlayCircle,
  faRedoAlt,
  faTimes,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";

import {
  faBandcamp,
  faFacebookSquare,
  faGithub,
  faInstagram,
  faLastfmSquare,
  faMixcloud,
  faPinterestSquare,
  faSoundcloud,
  faSpotify,
  faTumblrSquare,
  faTwitter,
  faTwitterSquare,
  faVimeoSquare,
  faYoutubeSquare,
} from "@fortawesome/free-brands-svg-icons";

import { config, library } from "@fortawesome/fontawesome-svg-core";

export const RegisterFontAwesomeIcons = () => {
  config.autoAddCss = false;

  library.add(
    // free-solid
    faAngleDoubleLeft,
    faAngleDoubleRight,
    faAngleDown,
    faAngleLeft,
    faAngleRight,
    faAngleUp,
    faClock,
    faDatabase,
    faEllipsisH,
    faExternalLinkAlt,
    faInfoCircle,
    faLock,
    faPauseCircle,
    faPlayCircle,
    faRedoAlt,
    faTimes,
    faVolumeUp,

    // free-brands
    faBandcamp,
    faFacebookSquare,
    faGithub,
    faInstagram,
    faLastfmSquare,
    faMixcloud,
    faPinterestSquare,
    faSoundcloud,
    faSpotify,
    faTumblrSquare,
    faTwitter,
    faTwitterSquare,
    faVimeoSquare,
    faYoutubeSquare
  );
};
