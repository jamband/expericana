/** @jest-environment jsdom */
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import { SearchForm } from ".";
import { disabledPaths } from "~/components/search-form";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

const router = useRouter as jest.Mock;

beforeEach(() => {
  router.mockReset();
});

test("disabled", () => {
  ["/tracks"].map((pathname) => {
    router.mockReturnValue({
      pathname,
      query: {},
    });

    render(<SearchForm />);
    expect(screen.getByRole("group")).toBeEnabled();
    cleanup();
  });

  disabledPaths.map((pathname) => {
    router.mockReturnValue({
      pathname,
      query: {},
    });

    render(<SearchForm />);
    expect(screen.getByRole("group")).toBeDisabled();
    cleanup();
  });
});

test("submit, change", () => {
  router.mockReturnValue({
    push: jest.fn(),
    pathname: "/tracks",
    query: {},
  });

  render(<SearchForm />);
  const input = screen.getByRole("searchbox");

  fireEvent.change(input, { target: { value: "foo" } });
  fireEvent.submit(input);

  expect(useRouter().push).toHaveBeenCalledWith({
    pathname: "/tracks/search",
    query: { q: "foo" },
  });

  expect(input).toHaveValue("foo");
});
