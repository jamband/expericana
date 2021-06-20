/** @jest-environment jsdom */
import { render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import "~/utils/fontawesome-mock";
import { Pagination } from ".";

Object.defineProperty(window, "matchMedia", {
  value: jest.fn().mockReturnValue({
    matches: false,
  }),
});

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

const router = useRouter as jest.Mock;

beforeEach(() => {
  router.mockReset();
});

test("current page: first", () => {
  router.mockReturnValue({
    pathname: "/foo",
    query: {},
  });

  render(<Pagination currentPage={1} total={10} />);
  const [first, previous, next, last] = screen.getAllByRole("link");

  expect(first).toHaveClass("disabled");
  expect(previous).toHaveClass("disabled");
  expect(next).not.toHaveClass("disabled");
  expect(last).not.toHaveClass("disabled");
  expect(first).toHaveAttribute("href", "/foo/pages/1");
  expect(previous).toHaveAttribute("href", "/foo/pages/1");
  expect(next).toHaveAttribute("href", "/foo/pages/2");
  expect(last).toHaveAttribute("href", "/foo/pages/10");
  expect(screen.getByText("1/10")).toBeInTheDocument();
});

test("current page: second", () => {
  router.mockReturnValue({
    pathname: "/foo/pages/[page]",
    query: { page: 2 },
  });

  render(<Pagination currentPage={2} total={10} />);
  const [first, previous, next, last] = screen.getAllByRole("link");

  expect(first).not.toHaveClass("disabled");
  expect(previous).not.toHaveClass("disabled");
  expect(next).not.toHaveClass("disabled");
  expect(last).not.toHaveClass("disabled");

  expect(first).toHaveAttribute("href", "/foo/pages/1");
  expect(previous).toHaveAttribute("href", "/foo/pages/1");
  expect(next).toHaveAttribute("href", "/foo/pages/3");
  expect(last).toHaveAttribute("href", "/foo/pages/10");

  expect(screen.getByText("2/10")).toBeInTheDocument();
});

test("current page: last", () => {
  router.mockReturnValue({
    pathname: "/foo/pages/[page]",
    query: { page: 10 },
  });
  render(<Pagination currentPage={10} total={10} />);
  const [first, previous, next, last] = screen.getAllByRole("link");

  expect(first).not.toHaveClass("disabled");
  expect(previous).not.toHaveClass("disabled");
  expect(next).toHaveClass("disabled");
  expect(last).toHaveClass("disabled");

  expect(first).toHaveAttribute("href", "/foo/pages/1");
  expect(previous).toHaveAttribute("href", "/foo/pages/9");
  expect(next).toHaveAttribute("href", "/foo/pages/10");
  expect(last).toHaveAttribute("href", "/foo/pages/10");

  expect(screen.getByText("10/10")).toBeInTheDocument();
});
