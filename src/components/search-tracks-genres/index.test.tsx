/** @jest-environment jsdom */
import { render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import { useTracksGenres } from "~/hooks/query";
import "~/utils/fontawesome-mock";
import { SearchTracksGenres } from ".";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("~/hooks/query", () => ({
  useTracksGenres: jest.fn(),
}));

const router = useRouter as jest.Mock;
const genres = useTracksGenres as jest.Mock;

beforeEach(() => {
  router.mockReset();
  genres.mockReset();
});

test("loading", () => {
  router.mockReturnValue({
    pathname: "/foo",
    query: {},
  });

  genres.mockReturnValue({
    data: undefined,
    error: null,
    isLoading: true,
  });

  render(<SearchTracksGenres />);
  expect(screen.getByRole("status")).toBeInTheDocument();
});

test("error", () => {
  router.mockReturnValue({
    pathname: "/foo",
    query: {},
  });

  genres.mockReturnValue({
    data: undefined,
    error: Error("Request failure"),
    isLoading: false,
  });

  render(<SearchTracksGenres />);
  const listitem = screen.getAllByRole("listitem");
  expect(listitem).toHaveLength(2);
  expect(listitem[1]).toHaveTextContent("Request failure");
});

test("data", () => {
  router.mockReturnValue({
    pathname: "/tracks",
    query: {},
  });

  genres.mockReturnValue({
    data: ["Foo", "Bar", "Baz"],
    error: null,
    isLoading: false,
  });

  render(<SearchTracksGenres />);
  const listitem = screen.getAllByRole("listitem");
  expect(listitem).toHaveLength(4);

  expect(listitem[1]).toHaveTextContent("Foo");
  expect(listitem[1]).toHaveAttribute("href", "/tracks?genre=Foo");
  expect(listitem[2]).toHaveTextContent("Bar");
  expect(listitem[2]).toHaveAttribute("href", "/tracks?genre=Bar");
  expect(listitem[3]).toHaveTextContent("Baz");
  expect(listitem[3]).toHaveAttribute("href", "/tracks?genre=Baz");
});
