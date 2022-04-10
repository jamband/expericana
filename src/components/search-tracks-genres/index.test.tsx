/** @jest-environment jsdom */
import { render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import "~/utils/fontawesome-mock";
import { SearchTracksGenres } from ".";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("react-query", () => ({
  useQuery: jest.fn(),
}));

const router = useRouter as jest.Mock;
const genres = useQuery as jest.Mock;

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
  const listitem = screen.getByRole("listitem");
  expect(listitem).toHaveTextContent("Request failure");
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
  expect(listitem).toHaveLength(3);

  expect(listitem[0]).toHaveTextContent("Foo");
  expect(listitem[0]).toHaveAttribute("href", "/tracks/genres/Foo/pages/1");
  expect(listitem[1]).toHaveTextContent("Bar");
  expect(listitem[1]).toHaveAttribute("href", "/tracks/genres/Bar/pages/1");
  expect(listitem[2]).toHaveTextContent("Baz");
  expect(listitem[2]).toHaveAttribute("href", "/tracks/genres/Baz/pages/1");
});
