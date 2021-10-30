/** @jest-environment jsdom */
import { cleanup, render, screen } from "@testing-library/react";
import { usePlayerState } from "~/hooks/player";
import type { Provider } from "~/types/provider";
import "~/utils/fontawesome-mock";
import { TrackCard } from ".";

const props = {
  id: "",
  title: "",
  image: "",
  footer: "",
};

jest.mock("~/hooks/player", () => ({
  usePlayerState: jest.fn(),
}));

const playerState = usePlayerState as jest.Mock;

afterEach(() => {
  playerState.mockReset();
});

test("ratio: Bandcamp, SoundCloud", () => {
  ["Bandcamp", "SoundCloud"].map((provider) => {
    playerState.mockReturnValue({ id: "foo" });

    render(
      <TrackCard {...props} provider={provider as Provider}>
        ...
      </TrackCard>
    );

    const link = screen.getByRole("link");
    expect(link).toHaveClass("ratio-1x1");

    cleanup();
  });
});

test("ratio: Vimeo, YouTube", () => {
  ["Vimeo", "YouTube"].map((provider) => {
    playerState.mockReturnValue({ id: "foo" });

    render(
      <TrackCard {...props} provider={provider as Provider}>
        ...
      </TrackCard>
    );

    const link = screen.getByRole("link");
    expect(link).toHaveClass("ratio-16x9");

    cleanup();
  });
});

test("audio status icon: play", () => {
  playerState.mockReturnValue({ id: "foo" });

  render(
    <TrackCard {...props} id="bar" provider="Bandcamp">
      ...
    </TrackCard>
  );

  const icon = screen.getAllByRole("img")[1];
  expect(icon).toHaveAttribute("data-icon", "play-circle");
});

test("audio status icon: pause", () => {
  playerState.mockReturnValue({ id: "foo" });

  render(
    <TrackCard {...props} id="foo" provider="Bandcamp">
      ...
    </TrackCard>
  );

  const icon = screen.getAllByRole("img")[1];
  expect(icon).toHaveAttribute("data-icon", "pause-circle");
});
