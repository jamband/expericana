/** @jest-environment jsdom */
import { cleanup, render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import "~/utils/fontawesome-mock";
import { Header } from ".";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

const router = useRouter as jest.Mock;

jest.mock("~/components/search-form", () => ({
  SearchForm: jest.fn(() => null),
}));

const links = [
  { pathname: "/tracks", text: "Tracks" },
  { pathname: "/tracks/[id]", text: "Tracks" },
  { pathname: "/playlists", text: "Playlists" },
  { pathname: "/playlists/[id]", text: "Playlists" },
  { pathname: "/labels", text: "Labels" },
  { pathname: "/stores", text: "Stores" },
  { pathname: "/bookmarks", text: "Bookmarks" },
];

const moreLinks = [
  { pathname: "/about", text: "About" },
  { pathname: "/contact", text: "Contact" },
];

afterEach(() => {
  router.mockReset();
});

test("have an active selector", () => {
  links.map(({ pathname, text }) => {
    router.mockReturnValue({ pathname });

    render(<Header />);
    const link = screen.getAllByRole("link", { name: text });

    expect(link).toHaveLength(2);
    expect(link[0]).toHaveClass("active");
    expect(link[1]).toHaveClass("active");

    cleanup();
  });

  moreLinks.map(({ pathname, text }) => {
    router.mockReturnValue({ pathname });

    render(<Header />);
    const link = screen.getByRole("link", { name: text });

    expect(link).toHaveClass("active");
    cleanup();
  });
});

test("not have an active selector", () => {
  links.map(({ text }) => {
    router.mockReturnValue({
      pathname: "/foo",
    });

    render(<Header />);
    const link = screen.getAllByRole("link", { name: text });

    expect(link[0]).not.toHaveClass("active");
    expect(link[1]).not.toHaveClass("active");
    cleanup();
  });

  moreLinks.map(({ text }) => {
    router.mockReturnValue({
      pathname: "/foo",
    });

    render(<Header />);
    const link = screen.getByRole("link", { name: text });

    expect(link).not.toHaveClass("active");
    cleanup();
  });
});
