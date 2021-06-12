/** @jest-environment jsdom */
import { render, screen } from "@testing-library/react";
import { Layout } from ".";

jest.mock("~/layouts/header", () => ({
  Header: jest.fn(() => null),
}));

jest.mock("~/layouts/footer", () => ({
  Footer: jest.fn(() => null),
}));

test("", () => {
  render(<Layout>foo</Layout>);
  expect(screen.getByText("foo")).toBeInTheDocument();
});
