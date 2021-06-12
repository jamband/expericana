/** @jest-environment jsdom */
import { render, screen } from "@testing-library/react";
import { DropdownLink } from ".";

test("", () => {
  render(<DropdownLink href="/foo">Foo</DropdownLink>);

  const listitem = screen.getByRole("listitem");
  expect(listitem).toHaveAttribute("href", "/foo");
  expect(listitem).toHaveClass("dropdown-item");
  expect(listitem).toHaveTextContent("Foo");
});
