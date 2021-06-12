/** @jest-environment jsdom */
import { render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import { useStoresCountries } from "~/hooks/query";
import "~/utils/fontawesome-mock";
import { SearchStoresCountries } from ".";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("~/hooks/query", () => ({
  useStoresCountries: jest.fn(),
}));

const router = useRouter as jest.Mock;
const countries = useStoresCountries as jest.Mock;

beforeEach(() => {
  router.mockReset();
  countries.mockReset();
});

test("loading", () => {
  router.mockReturnValue({
    pathname: "/foo",
    query: {},
  });

  countries.mockReturnValue({
    data: undefined,
    error: null,
    isLoading: true,
  });

  render(<SearchStoresCountries />);
  expect(screen.getByRole("status")).toBeInTheDocument();
});

test("error", () => {
  router.mockReturnValue({
    pathname: "/foo",
    query: {},
  });

  countries.mockReturnValue({
    data: undefined,
    error: Error("Request failure"),
    isLoading: false,
  });

  render(<SearchStoresCountries />);
  const listitem = screen.getAllByRole("listitem");
  expect(listitem).toHaveLength(2);
  expect(listitem[1]).toHaveTextContent("Request failure");
});

test("data", () => {
  router.mockReturnValue({
    pathname: "/stores",
    query: {},
  });

  countries.mockReturnValue({
    data: ["Foo", "Bar", "Baz"],
    error: null,
    isLoading: false,
  });

  render(<SearchStoresCountries />);
  const listitem = screen.getAllByRole("listitem");
  expect(listitem).toHaveLength(4);

  expect(listitem[1]).toHaveTextContent("Foo");
  expect(listitem[1]).toHaveAttribute("href", "/stores?country=Foo");
  expect(listitem[2]).toHaveTextContent("Bar");
  expect(listitem[2]).toHaveAttribute("href", "/stores?country=Bar");
  expect(listitem[3]).toHaveTextContent("Baz");
  expect(listitem[3]).toHaveAttribute("href", "/stores?country=Baz");
});
