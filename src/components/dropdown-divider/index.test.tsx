/** @jest-environment jsdom */
import { render, screen } from "@testing-library/react";
import { DropdownDivider } from ".";

test("", () => {
  render(<DropdownDivider />);
  expect(screen.getByRole("separator")).toHaveClass("dropdown-divider");
});
