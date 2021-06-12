/** @jest-environment jsdom */
import { cleanup, render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import "~/utils/fontawesome-mock";
import { SearchTracksProviders } from ".";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

const router = useRouter as jest.Mock;

jest.mock("~/constants/music", () => ({
  MUSIC_PROVIDERS: ["Foo", "Bar", "Baz"],
}));

beforeEach(() => {
  router.mockReset();
});

test("label", () => {
  router.mockReturnValue({
    query: {},
  });

  render(<SearchTracksProviders />);
  expect(screen.getByRole("button")).toHaveTextContent("Providers");
  cleanup();

  router.mockReturnValue({
    query: { provider: "Foo" },
  });

  render(<SearchTracksProviders />);
  expect(screen.getByRole("button")).toHaveTextContent("Foo");
});

test("reset link", () => {
  router.mockReturnValue({
    pathname: "/tracks",
    query: { provider: "Foo", genre: "Bar", page: 10 },
  });

  render(<SearchTracksProviders />);
  expect(screen.getByText("Reset")).toHaveAttribute(
    "href",
    "/tracks?genre=Bar"
  );
});

test("item link: Foo on /tracks", () => {
  router.mockReturnValue({
    pathname: "/tracks",
    query: {},
  });

  render(<SearchTracksProviders />);
  const [, foo] = screen.getAllByRole("listitem");
  expect(foo).toHaveAttribute("href", "/tracks?provider=Foo");
  cleanup();
});

test("item link: Foo on /tracks?page=10", () => {
  router.mockReturnValue({
    pathname: "/tracks",
    query: { page: 10 },
  });

  render(<SearchTracksProviders />);
  const [, foo] = screen.getAllByRole("listitem");
  expect(foo).toHaveAttribute("href", "/tracks?provider=Foo");
});

test("item link: Bar on /tracks?genre=Foo", () => {
  router.mockReturnValue({
    pathname: "/tracks",
    query: { genre: "Foo" },
  });

  render(<SearchTracksProviders />);
  const [, , bar] = screen.getAllByRole("listitem");
  expect(bar).toHaveAttribute("href", "/tracks?genre=Foo&provider=Bar");
});
