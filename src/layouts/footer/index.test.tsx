/** @jest-environment jsdom */
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import { APP_NAME } from "~/constants/app";
import { PlayerProvider } from "~/contexts/player";
import { usePlayerAction, usePlayerState } from "~/hooks/player";
import { initialState } from "~/reducers/player";
import "~/utils/fontawesome-mock";
import { Footer } from ".";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("~/hooks/player", () => ({
  usePlayerState: jest.fn(),
  usePlayerAction: jest.fn(),
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

test("title when no player is set", () => {
  router.mockReturnValue({ pathname: "/" });
  playerAction.mockReturnValue({ clear: () => null });
  playerState.mockReturnValue(initialState);

  render(
    <PlayerProvider>
      <Footer />
    </PlayerProvider>
  );

  expect(screen.getByText(APP_NAME)).toBeInTheDocument();
});

test("title when player is set", () => {
  router.mockReturnValue({ pathname: "/" });
  playerAction.mockReturnValue({ clear: () => null });
  playerState.mockReturnValue(player);

  render(
    <PlayerProvider>
      <Footer />
    </PlayerProvider>
  );

  expect(screen.getByRole("link")).toHaveTextContent(player.title);
});

test("title for each route", () => {
  (usePlayerAction as jest.Mock).mockReturnValue({ clear: () => null });
  (usePlayerState as jest.Mock).mockReturnValue(player);

  const data = [
    { pathname: "/tracks", title: player.title },
    { pathname: "/tracks/[id]", title: APP_NAME },
    { pathname: "/playlists", title: player.title },
    { pathname: "/playlists/[id]", title: APP_NAME },
    { pathname: "/labels", title: player.title },
    { pathname: "/labels/[id]", title: player.title },
  ];

  data.map(({ pathname, title }) => {
    (useRouter as jest.Mock).mockReturnValue({ pathname });
    render(<Footer />);
    expect(screen.getByText(title)).toBeInTheDocument();
    cleanup();
  });
});

test("player url when type is track", () => {
  router.mockReturnValue({ pathname: "/" });
  playerAction.mockReturnValue({ clear: () => null });
  playerState.mockReturnValue(player);

  render(
    <PlayerProvider>
      <Footer />
    </PlayerProvider>
  );

  expect(screen.getByRole("link")).toHaveAttribute(
    "href",
    `/tracks/${player.id}`
  );
});

test("player url when type is playlist", () => {
  router.mockReturnValue({ pathname: "/" });
  playerAction.mockReturnValue({ clear: () => null });

  player.type = "playlist";
  playerState.mockReturnValue(player);

  render(
    <PlayerProvider>
      <Footer />
    </PlayerProvider>
  );

  expect(screen.getByRole("link")).toHaveAttribute(
    "href",
    `/playlists/${player.id}`
  );
});

test("clear", () => {
  router.mockReturnValue({ pathname: "/" });
  playerAction.mockReturnValue({ clear: () => null });
  playerState.mockReturnValue(player);

  render(
    <PlayerProvider>
      <Footer />
    </PlayerProvider>
  );

  fireEvent.click(screen.getByRole("button"));
  expect(playerAction).toBeCalledTimes(1);
});
