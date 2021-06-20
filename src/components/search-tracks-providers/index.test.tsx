/** @jest-environment jsdom */
import { render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import "~/utils/fontawesome-mock";
import { SearchTracksProviders } from ".";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

const router = useRouter as jest.Mock;

beforeEach(() => {
  router.mockReset();
});

test("data", () => {
  router.mockReturnValue({
    pathname: "/tracks",
    query: {},
  });

  render(<SearchTracksProviders />);
  const listitem = screen.getAllByRole("listitem");
  expect(listitem).toHaveLength(4);

  expect(listitem[0]).toHaveTextContent("Bandcamp");
  expect(listitem[0]).toHaveAttribute(
    "href",
    "/tracks/providers/Bandcamp/pages/1"
  );
  expect(listitem[1]).toHaveTextContent("SoundCloud");
  expect(listitem[1]).toHaveAttribute(
    "href",
    "/tracks/providers/SoundCloud/pages/1"
  );
  expect(listitem[2]).toHaveTextContent("Vimeo");
  expect(listitem[2]).toHaveAttribute(
    "href",
    "/tracks/providers/Vimeo/pages/1"
  );
  expect(listitem[3]).toHaveTextContent("YouTube");
  expect(listitem[3]).toHaveAttribute(
    "href",
    "/tracks/providers/YouTube/pages/1"
  );
});
