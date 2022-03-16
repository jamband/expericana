/** @jest-environment jsdom */
import { render, screen } from "@testing-library/react";
import { TotalCount } from ".";

test("total: 0", () => {
  render(<TotalCount total={0} />);
  expect(screen.getByText("No results found")).toBeInTheDocument();
});

test("total: 10", () => {
  render(<TotalCount total={10} />);
  expect(screen.getByText("10 results")).toBeInTheDocument();
});

test("total: 1000", () => {
  render(<TotalCount total={1000} />);
  expect(screen.getByText("1,000 results")).toBeInTheDocument();
});
