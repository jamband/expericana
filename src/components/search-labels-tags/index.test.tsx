/** @jest-environment jsdom */
import { render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import { useLabelsTags } from "~/hooks/query";
import "~/utils/fontawesome-mock";
import { SearchLabelsTags } from ".";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("~/hooks/query", () => ({
  useLabelsTags: jest.fn(),
}));

const router = useRouter as jest.Mock;
const tags = useLabelsTags as jest.Mock;

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

  render(<SearchLabelsTags />);
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

  render(<SearchLabelsTags />);
  const listitem = screen.getAllByRole("listitem");
  expect(listitem).toHaveLength(2);
  expect(listitem[1]).toHaveTextContent("Request failure");
});

test("data", () => {
  router.mockReturnValue({
    pathname: "/labels",
    query: {},
  });

  tags.mockReturnValue({
    data: ["Foo", "Bar", "Baz"],
    error: null,
    isLoading: false,
  });

  render(<SearchLabelsTags />);
  const listitem = screen.getAllByRole("listitem");
  expect(listitem).toHaveLength(4);

  expect(listitem[1]).toHaveTextContent("Foo");
  expect(listitem[1]).toHaveAttribute("href", "/labels?tag=Foo");
  expect(listitem[2]).toHaveTextContent("Bar");
  expect(listitem[2]).toHaveAttribute("href", "/labels?tag=Bar");
  expect(listitem[3]).toHaveTextContent("Baz");
  expect(listitem[3]).toHaveAttribute("href", "/labels?tag=Baz");
});
