/** @jest-environment jsdom */
import { cleanup, render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import { Player } from ".";
import { PlayerProvider } from "~/contexts/player";
import { usePlayerAction, usePlayerState } from "~/hooks/player";
import { initialState } from "~/reducers/player";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("~/hooks/player", () => ({
  usePlayerAction: jest.fn(),
  usePlayerState: jest.fn(),
}));

const router = useRouter as jest.Mock;
const playerAction = usePlayerAction as jest.Mock;
const playerState = usePlayerState as jest.Mock;

const player = {
  id: "id1",
  title: "title1",
  provider: "Bandcamp",
  provider_key: "key1",
  type: "track",
  loading: true,
};

beforeEach(() => {
  router.mockReset();
  playerAction.mockReset();
  playerState.mockReset();
});

test("null", () => {
  router.mockReturnValue({ pathname: "/" });
  playerAction.mockReturnValue({ loading: () => null });
  playerState.mockReturnValue(initialState);

  const { container } = render(<Player />);
  expect(container.outerHTML).toBe("<div></div>");
});

test("display", () => {
  const data = [
    { pathname: "/", style: "display: none" },
    { pathname: "/tracks", style: "display: none" },
    { pathname: "/tracks/[id]", style: "display: block" },
    { pathname: "/playlists", style: "display: none" },
    { pathname: "/playlists/[id]", style: "display: block" },
    { pathname: "/labels", style: "display: none" },
  ];

  data.map(({ pathname, style }) => {
    router.mockReturnValue({ pathname });
    playerAction.mockReturnValue({ loading: () => null });
    playerState.mockReturnValue(player);

    const { container } = render(
      <PlayerProvider>
        <Player />
      </PlayerProvider>
    );

    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).toHaveStyle(style);
    cleanup();
  });
});

test("ratio", () => {
  const data = [
    { provider: "Bandcamp", selector: "ratio-1x1" },
    { provider: "SoundCloud", selector: "ratio-1x1" },
    { provider: "Vimeo", selector: "ratio-16x9" },
    { provider: "YouTube", selector: "ratio-16x9" },
  ];

  data.map(({ provider, selector }) => {
    router.mockReturnValue({ pathname: "/" });
    playerAction.mockReturnValue({ loading: () => null });
    player.provider = provider;
    playerState.mockReturnValue(player);

    const { container } = render(
      <PlayerProvider>
        <Player />
      </PlayerProvider>
    );

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector(`.${selector}`)).toBeInTheDocument();
    cleanup();
  });
});

test("iframe.src", () => {
  const data = [
    {
      provider: "Bandcamp",
      type: "track",
      src: `https://bandcamp.com/EmbeddedPlayer/track=${player.provider_key}`,
    },
    {
      provider: "Bandcamp",
      type: "playlist",
      src: `https://bandcamp.com/EmbeddedPlayer/album=${player.provider_key}`,
    },
    {
      provider: "SoundCloud",
      type: "track",
      src: `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${player.provider_key}`,
    },
    {
      provider: "SoundCloud",
      type: "playlist",
      src: `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/${player.provider_key}`,
    },
    {
      provider: "Vimeo",
      type: "track",
      src: `https://player.vimeo.com/video/${player.provider_key}`,
    },
    {
      provider: "Vimeo",
      type: "playlist",
      src: `https://player.vimeo.com/video/${player.provider_key}`,
    },
    {
      provider: "YouTube",
      type: "track",
      src: `https://www.youtube.com/embed/${player.provider_key}?`,
    },
    {
      provider: "YouTube",
      type: "playlist",
      src: `https://www.youtube.com/embed/videoseries?list=${player.provider_key}&`,
    },
  ];

  data.map(({ provider, type, src }) => {
    router.mockReturnValue({ pathname: "/" });
    playerAction.mockReturnValue({ loading: () => null });

    player.provider = provider;
    player.type = type;
    playerState.mockReturnValue(player);

    render(
      <PlayerProvider>
        <Player />
      </PlayerProvider>
    );

    const iframe = screen.getByTitle(player.type);
    expect(iframe).toHaveAttribute("src", expect.stringContaining(src));
    cleanup();
  });
});

test("title and provider", () => {
  const data = [
    { title: "title1", provider: "Foo" },
    { title: "title2", provider: "Bar" },
  ];

  data.map(({ title, provider }) => {
    router.mockReturnValue({ pathname: "/tracks/[id]" });
    playerAction.mockReturnValue({ loading: () => null });

    player.title = title;
    player.provider = provider;
    playerState.mockReturnValue(player);

    render(
      <PlayerProvider>
        <Player />
      </PlayerProvider>
    );

    expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();
    expect(screen.getByText(`via ${provider}`)).toBeInTheDocument();
    cleanup();
  });
});

test("back to", () => {
  const data = [
    { type: "track", pathname: "/tracks", text: "Tracks" },
    { type: "playlist", pathname: "/playlists", text: "Playlists" },
  ];

  data.map(({ type, pathname, text }) => {
    router.mockReturnValue({ pathname: `${pathname}/[id]` });
    playerAction.mockReturnValue({ loading: () => null });

    player.type = type;
    playerState.mockReturnValue(player);

    render(
      <PlayerProvider>
        <Player />
      </PlayerProvider>
    );

    const link = screen.getByRole("link", { name: `Back to ${text}` });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", pathname);
    cleanup();
  });
});
