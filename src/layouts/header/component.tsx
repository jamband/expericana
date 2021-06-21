import Link from "next/link";
import { Dropdown } from "~/components/dropdown";
import { DropdownHeader } from "~/components/dropdown-header";
import { DropdownLink } from "~/components/dropdown-link";
import { SearchForm } from "~/components/search-form";
import { APP_NAME } from "~/constants/app";
import type { _Props } from "./types";

export const Component: React.VFC<_Props> = (props) => (
  <header>
    <nav
      className="navbar navbar-expand-md navbar-dark bg-dark"
      aria-label="Header navigation"
    >
      <div className="container">
        <Link href="/">
          <a className="navbar-brand">{APP_NAME}</a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar"
          aria-controls="collapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          ref={props.collapseRef}
          id="navbar"
          className="collapse navbar-collapse"
        >
          <div
            className="d-md-none navbar-nav"
            onClick={props.hideNavigation}
            role="presentation"
          >
            {props.links.map((link, index) => (
              <Link key={index} href={link.href}>
                <a className={props.linkClass(link.href)}>{link.text}</a>
              </Link>
            ))}
            {props.moreLinks.map((link, index) => (
              <Link key={index} href={link.href}>
                <a className={props.linkClass(link.href)}>{link.text}</a>
              </Link>
            ))}
          </div>
          <div className="d-none d-md-flex navbar-nav">
            {props.links.map((link, index) => (
              <Link key={index} href={link.href}>
                <a className={props.linkClass(link.href)}>{link.text}</a>
              </Link>
            ))}
            <Dropdown id="headerMoreLinks" nav>
              <DropdownHeader>More Links</DropdownHeader>
              {props.moreLinks.map((link, index) => (
                <DropdownLink key={index} href={link.href}>
                  {link.text}
                </DropdownLink>
              ))}
            </Dropdown>
          </div>
        </div>
        <SearchForm className="ms-auto d-none d-md-flex" />
      </div>
    </nav>
  </header>
);
