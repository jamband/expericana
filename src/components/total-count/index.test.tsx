/** @jest-environment jsdom */
import { render, screen } from "@testing-library/react";
import "~/utils/fontawesome-mock";
import { TotalCount } from ".";

test("total: 0", () => {
  render(<TotalCount total={0} />);
  expect(screen.getByText("No results found")).toBeInTheDocument();
});

test("total: 10", () => {
  render(<TotalCount total={10} />);
  expect(screen.getByText("10 results")).toBeInTheDocument();
});
