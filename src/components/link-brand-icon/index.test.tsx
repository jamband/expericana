/** @jest-environment jsdom */
import { render, screen } from "@testing-library/react";
import "~/utils/fontawesome-mock";
import { LinkBrandIcon } from ".";

test("not brand icon links", () => {
  const links = ["https://foo.com", "https://bar.com"];
  render(<LinkBrandIcon link={links.join("\n")} />);

  const link = screen.getAllByRole("link");
  expect(link).toHaveLength(links.length);
  expect(link[0]).toHaveAttribute("href", "https://foo.com");
  expect(link[1]).toHaveAttribute("href", "https://bar.com");

  const img = screen.getAllByRole("img");
  expect(img).toHaveLength(links.length);
  expect(img[0]).toHaveAttribute("data-icon", "external-link-alt");
  expect(img[1]).toHaveAttribute("data-icon", "external-link-alt");
});

test("brand icon links", () => {
  const links = [
    "https://bandcamp.com/foo",
    "https://facebook.com/foo",
    "https://instagram.com/foo",
    "https://last.fm/foo",
    "https://mixcloud.com/foo",
    "https://pinterest.com/foo",
    "https://soundcloud.com/foo",
    "https://spotify.com/foo",
    "https://twitter.com/foo",
    "https://tumblr.com/foo",
    "https://vimeo.com/foo",
    "https://youtube.com/foo",
  ];

  render(<LinkBrandIcon link={links.join("\n")} />);

  const link = screen.getAllByRole("link");
  const img = screen.getAllByRole("img");

  expect(link).toHaveLength(links.length);
  expect(img).toHaveLength(links.length);

  for (const i in links) {
    expect(link[i]).toHaveAttribute("href", links[i]);
    expect(img[i]).toHaveAttribute("data-prefix", "fab");
  }

  const icons = [
    "bandcamp",
    "facebook-square",
    "instagram",
    "lastfm-square",
    "mixcloud",
    "pinterest-square",
    "soundcloud",
    "spotify",
    "twitter-square",
    "tumblr-square",
    "vimeo-square",
    "youtube-square",
  ];

  for (const i in icons) {
    expect(img[i]).toHaveAttribute("data-icon", icons[i]);
  }
});

test("custom domain for Bandcamp", () => {
  const links = [
    "https://fikarecordings.com/foo",
    "https://mamabirdrecordingco.com/foo",
    "https://maybemars.org/foo",
    "https://souterraine.biz/foo",
  ];

  render(<LinkBrandIcon link={links.join("\n")} />);

  const link = screen.getAllByRole("link");
  const img = screen.getAllByRole("img");
  expect(link).toHaveLength(links.length);
  expect(img).toHaveLength(links.length);

  for (const i in links) {
    expect(link[i]).toHaveAttribute("href", links[i]);
    expect(img[i]).toHaveAttribute("data-prefix", "fab");
    expect(img[i]).toHaveAttribute("data-icon", "bandcamp");
  }
});
