/** @jest-environment jsdom */
import { render, screen } from "@testing-library/react";
import { DropdownText } from ".";

test("", () => {
  render(<DropdownText>Foo</DropdownText>);
  expect(screen.getByRole("listitem")).toHaveClass("dropdown-item");
  expect(screen.getByRole("listitem")).toHaveTextContent("Foo");
});
