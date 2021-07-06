import { useRouter } from "next/router";
import { useHasTouchScreen } from "~/hooks/screen";
import { Component } from "./component";
import type { Props, Part } from "./types";
import styles from "./style.module.scss";

export const Pagination: React.VFC<Props> = (props) => {
  const router = useRouter();
  const { hasTouchScreen } = useHasTouchScreen();
  const { currentPage, total } = props;

  let className = "text-center";
  if (props.className) {
    className += ` ${props.className}`;
  }

  const disabled = (part: Part) => {
    return ["first", "previous"].includes(part)
      ? currentPage < 2
      : currentPage >= total;
  };

  const itemClass = (part: Part) => {
    let selector = "page-item flex-fill";
    if (disabled(part)) {
      selector += " disabled";
    }
    return selector;
  };

  const link = (part: Part) => {
    let page = 1;

    if (part === "previous" && currentPage > 1) {
      page = currentPage - 1;
    } else if (part === "next") {
      page = currentPage === total ? total : currentPage + 1;
    } else if (part === "last") {
      page = total;
    }

    if (router.pathname.split("/")[2] === "search" || router.query.page) {
      return {
        pathname: router.pathname,
        query: { ...router.query, page },
      };
    }

    return {
      pathname: `${router.pathname}/pages/${page}`,
      query: router.query,
    };
  };

  const linkClass = () => {
    let selector = `page-link ${styles.link}`;
    if (!hasTouchScreen) {
      selector += ` ${styles.clickable}`;
    }
    return selector;
  };

  const blur = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.currentTarget.blur();
  };

  return (
    <Component
      {...props}
      className={className}
      itemClass={itemClass}
      link={link}
      linkClass={linkClass}
      disabled={disabled}
      blur={blur}
    />
  );
};
