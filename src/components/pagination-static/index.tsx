import { useRouter } from "next/router";
import { useHasTouchScreen } from "~/hooks/screen";
import { Component } from "./component";
import type { Props, Part } from "./types";

export const Pagination: React.VFC<Props> = (props) => {
  const router = useRouter();
  const { hasTouchScreen } = useHasTouchScreen();

  let className = "text-center";
  if (props.className) {
    className += ` ${props.className}`;
  }

  const blur = (event: React.MouseEvent<HTMLDivElement>) => {
    (event.target as HTMLDivElement).blur();
  };

  const disabled = (part: Part) => {
    return ["first", "previous"].includes(part)
      ? props.currentPage < 2
      : props.currentPage >= props.total;
  };

  const link = (page: number) => {
    return router.query.page
      ? {
          pathname: router.pathname,
          query: { ...router.query, page },
        }
      : {
          pathname: `${router.pathname}/pages/${page}`,
          query: router.query,
        };
  };

  return (
    <Component
      {...props}
      className={className}
      blur={blur}
      hasTouchScreen={hasTouchScreen}
      disabled={disabled}
      link={link}
    />
  );
};
