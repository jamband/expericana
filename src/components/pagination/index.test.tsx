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
  router.mockReturnValue({
    pathname: "/foo",
  });
});

afterEach(() => {
  router.mockReset();
});

test("current page: first", () => {
  render(<Pagination currentPage={1} total={10} />);
  const [first, previous, next, last] = screen.getAllByRole("link");
  expect(first).toHaveClass("disabled");
  expect(previous).toHaveClass("disabled");
  expect(next).not.toHaveClass("disabled");
  expect(last).not.toHaveClass("disabled");
  expect(first).toHaveAttribute("href", "/foo?page=1");
  expect(previous).toHaveAttribute("href", "/foo?page=0");
  expect(next).toHaveAttribute("href", "/foo?page=2");
  expect(last).toHaveAttribute("href", "/foo?page=10");
  expect(screen.getByText("1/10")).toBeInTheDocument();
});

test("current page: second", () => {
  render(<Pagination currentPage={2} total={10} />);
  const [first, previous, next, last] = screen.getAllByRole("link");

  expect(first).not.toHaveClass("disabled");
  expect(previous).not.toHaveClass("disabled");
  expect(next).not.toHaveClass("disabled");
  expect(last).not.toHaveClass("disabled");

  expect(first).toHaveAttribute("href", "/foo?page=1");
  expect(previous).toHaveAttribute("href", "/foo?page=1");
  expect(next).toHaveAttribute("href", "/foo?page=3");
  expect(last).toHaveAttribute("href", "/foo?page=10");

  expect(screen.getByText("2/10")).toBeInTheDocument();
});

test("current page: last", () => {
  render(<Pagination currentPage={10} total={10} />);
  const [first, previous, next, last] = screen.getAllByRole("link");

  expect(first).not.toHaveClass("disabled");
  expect(previous).not.toHaveClass("disabled");
  expect(next).toHaveClass("disabled");
  expect(last).toHaveClass("disabled");

  expect(first).toHaveAttribute("href", "/foo?page=1");
  expect(previous).toHaveAttribute("href", "/foo?page=9");
  expect(next).toHaveAttribute("href", "/foo?page=11");
  expect(last).toHaveAttribute("href", "/foo?page=10");

  expect(screen.getByText("10/10")).toBeInTheDocument();
});
