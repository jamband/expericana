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
  const listitem = screen.getByRole("listitem");
  expect(listitem).toHaveTextContent("Request failure");
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
  expect(listitem).toHaveLength(3);

  expect(listitem[0]).toHaveTextContent("Foo");
  expect(listitem[0]).toHaveAttribute("href", "/stores/countries/Foo/pages/1");
  expect(listitem[1]).toHaveTextContent("Bar");
  expect(listitem[1]).toHaveAttribute("href", "/stores/countries/Bar/pages/1");
  expect(listitem[2]).toHaveTextContent("Baz");
  expect(listitem[2]).toHaveAttribute("href", "/stores/countries/Baz/pages/1");
});
