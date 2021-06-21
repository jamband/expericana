/** @jest-environment jsdom */
import { render, screen } from "@testing-library/react";
import { DropdownHeader } from ".";

test("", () => {
  render(<DropdownHeader>Foo</DropdownHeader>);
  expect(screen.getByRole("heading")).toHaveClass("dropdown-header");
  expect(screen.getByRole("heading")).toHaveTextContent("Foo");
});
