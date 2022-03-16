import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleDown,
  faAngleLeft,
  faAngleRight,
  faAngleUp,
  faClock,
  faEllipsisH,
  faExternalLinkAlt,
  faInfoCircle,
  faLock,
  faPauseCircle,
  faPlayCircle,
  faRedoAlt,
  faTimes,
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
    faEllipsisH,
    faExternalLinkAlt,
    faInfoCircle,
    faLock,
    faPauseCircle,
    faPlayCircle,
    faRedoAlt,
    faTimes,

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
