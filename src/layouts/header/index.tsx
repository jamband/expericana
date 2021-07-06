import { useRouter } from "next/router";
import { useRef } from "react";
import { Component } from "./component";

export const Header: React.VFC = () => {
  const router = useRouter();
  const collapseRef = useRef<HTMLDivElement>(null);

  const toggleNavigation = () => {
    import("bootstrap/js/dist/collapse").then((module) => {
      new module.default(collapseRef.current!).toggle();
    });
  };

  const links = [
    { href: "/tracks", text: "Tracks" },
    { href: "/playlists", text: "Playlists" },
    { href: "/labels", text: "Labels" },
    { href: "/stores", text: "Stores" },
    { href: "/bookmarks", text: "Bookmarks" },
  ];

  const moreLinks = [
    { href: "/about", text: "About" },
    { href: "/contact", text: "Contact" },
  ];

  const linkClass = (pathname: string) => {
    let className = "nav-link";
    const [first, second] = router.pathname.split("/", 2);
    if (`/${first}${second}` === pathname) {
      className += " active";
    }
    return className;
  };

  return (
    <Component
      collapseRef={collapseRef}
      toggleNavigation={toggleNavigation}
      links={links}
      moreLinks={moreLinks}
      linkClass={linkClass}
    />
  );
};
