/** @jest-environment jsdom */
import { render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import { useStoresTags } from "~/hooks/query";
import "~/utils/fontawesome-mock";
import { SearchStoresTags } from ".";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("~/hooks/query", () => ({
  useStoresTags: jest.fn(),
}));

const router = useRouter as jest.Mock;
const tags = useStoresTags as jest.Mock;

beforeEach(() => {
  router.mockReset();
  tags.mockReset();
});

test("loading", () => {
  router.mockReturnValue({
    pathname: "/foo",
    query: {},
  });

  tags.mockReturnValue({
    data: undefined,
    error: null,
    isLoading: true,
  });

  render(<SearchStoresTags />);
  expect(screen.getByRole("status")).toBeInTheDocument();
});

test("error", () => {
  router.mockReturnValue({
    pathname: "/foo",
    query: {},
  });

  tags.mockReturnValue({
    data: undefined,
    error: Error("Request failure"),
    isLoading: false,
  });

  render(<SearchStoresTags />);
  const listitem = screen.getByRole("listitem");
  expect(listitem).toHaveTextContent("Request failure");
});

test("data", () => {
  router.mockReturnValue({
    pathname: "/stores",
    query: {},
  });

  tags.mockReturnValue({
    data: ["Foo", "Bar", "Baz"],
    error: null,
    isLoading: false,
  });

  render(<SearchStoresTags />);
  const listitem = screen.getAllByRole("listitem");
  expect(listitem).toHaveLength(3);

  expect(listitem[0]).toHaveTextContent("Foo");
  expect(listitem[0]).toHaveAttribute("href", "/stores/tags/Foo");
  expect(listitem[1]).toHaveTextContent("Bar");
  expect(listitem[1]).toHaveAttribute("href", "/stores/tags/Bar");
  expect(listitem[2]).toHaveTextContent("Baz");
  expect(listitem[2]).toHaveAttribute("href", "/stores/tags/Baz");
});
