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

test("disabled when current page is first", () => {
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
});

test("disabled when current page is second", () => {
  router.mockReturnValue({
    pathname: "/foo",
    query: {},
  });

  render(<Pagination currentPage={2} total={10} />);
  const [first, previous, next, last] = screen.getAllByRole("link");

  expect(first).not.toHaveClass("disabled");
  expect(previous).not.toHaveClass("disabled");
  expect(next).not.toHaveClass("disabled");
  expect(last).not.toHaveClass("disabled");
});

test("disabled when current page is last", () => {
  router.mockReturnValue({
    pathname: "/foo",
    query: {},
  });

  render(<Pagination currentPage={10} total={10} />);
  const [first, previous, next, last] = screen.getAllByRole("link");

  expect(first).not.toHaveClass("disabled");
  expect(previous).not.toHaveClass("disabled");
  expect(next).toHaveClass("disabled");
  expect(last).toHaveClass("disabled");
});

test("link when current page is first", () => {
  router.mockReturnValue({
    pathname: "/foo",
    query: {},
  });

  render(<Pagination currentPage={1} total={10} />);
  const [first, previous, next, last] = screen.getAllByRole("link");

  expect(first).toHaveAttribute("href", "/foo/pages/1");
  expect(previous).toHaveAttribute("href", "/foo/pages/1");
  expect(next).toHaveAttribute("href", "/foo/pages/2");
  expect(last).toHaveAttribute("href", "/foo/pages/10");
});

test("link when current page is second", () => {
  router.mockReturnValue({
    pathname: "/foo",
    query: {},
  });

  render(<Pagination currentPage={2} total={10} />);
  const [first, previous, next, last] = screen.getAllByRole("link");

  expect(first).toHaveAttribute("href", "/foo/pages/1");
  expect(previous).toHaveAttribute("href", "/foo/pages/1");
  expect(next).toHaveAttribute("href", "/foo/pages/3");
  expect(last).toHaveAttribute("href", "/foo/pages/10");
});

test("link when current page is last", () => {
  router.mockReturnValue({
    pathname: "/foo",
    query: {},
  });

  render(<Pagination currentPage={10} total={10} />);
  const [first, previous, next, last] = screen.getAllByRole("link");

  expect(first).toHaveAttribute("href", "/foo/pages/1");
  expect(previous).toHaveAttribute("href", "/foo/pages/9");
  expect(next).toHaveAttribute("href", "/foo/pages/10");
  expect(last).toHaveAttribute("href", "/foo/pages/10");
});

test("link when pathname contains search", () => {
  router.mockReturnValue({
    pathname: "/foo/search",
    query: { q: "bar" },
  });

  render(<Pagination currentPage={1} total={10} />);
  const [first, previous, next, last] = screen.getAllByRole("link");

  expect(first).toHaveAttribute("href", "/foo/search?q=bar&page=1");
  expect(previous).toHaveAttribute("href", "/foo/search?q=bar&page=1");
  expect(next).toHaveAttribute("href", "/foo/search?q=bar&page=2");
  expect(last).toHaveAttribute("href", "/foo/search?q=bar&page=10");
});
