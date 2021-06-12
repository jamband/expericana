/** @jest-environment jsdom */
import { render, screen } from "@testing-library/react";
import "~/utils/fontawesome-mock";
import { Dropdown } from ".";

test("id: foo", () => {
  render(<Dropdown id="foo">bar</Dropdown>);

  const button = screen.getByRole("button");
  expect(button).toHaveAttribute("id", "foo");
  expect(button).toHaveClass("tag");
  expect(button).toHaveTextContent("");

  expect(screen.getByRole("img")).toHaveAttribute("data-icon", "ellipsis-h");
  expect(screen.getByRole("list")).toHaveTextContent("bar");
});

test("id: foo, label: bar", () => {
  render(
    <Dropdown id="foo" label="bar">
      baz
    </Dropdown>
  );

  const button = screen.getByRole("button");
  expect(button).toHaveAttribute("id", "foo");
  expect(button).toHaveClass("tag");
  expect(button).toHaveTextContent("bar");

  expect(screen.getByRole("img")).toHaveAttribute("data-icon", "angle-down");
  expect(screen.getByRole("list")).toHaveTextContent("baz");
});

test("id: foo, nav: true", () => {
  render(
    <Dropdown id="foo" nav>
      bar
    </Dropdown>
  );

  const button = screen.getByRole("button");
  expect(button).toHaveAttribute("id", "foo");
  expect(button).toHaveClass("nav-link");
  expect(button).toHaveTextContent("");

  expect(screen.getByRole("img")).toHaveAttribute("data-icon", "ellipsis-h");
  expect(screen.getByRole("list")).toHaveTextContent("bar");
});
