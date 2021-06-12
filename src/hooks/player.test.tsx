/** @jest-environment jsdom */
import { act, renderHook } from "@testing-library/react-hooks";
import { PlayerProvider } from "~/contexts/player";
import { initialState } from "~/reducers/player";
import { Player } from "~/types/player";
import { usePlayerAction, usePlayerState } from "./player";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <PlayerProvider>{children}</PlayerProvider>
);

const player: Player = {
  id: "id1",
  title: "title1",
  provider: "Bandcamp",
  provider_key: "key1",
  type: "track",
  loading: true,
};

test("initial state", () => {
  const { result } = renderHook(() => usePlayerState(), { wrapper });
  expect(result.current).toBe(initialState);
});

test("play", () => {
  const { result } = renderHook(
    () => {
      const state = usePlayerState();
      const { play } = usePlayerAction();
      return { state, play };
    },
    { wrapper }
  );
  expect(result.current.state).toBe(initialState);

  act(() => result.current.play(player));
  expect(result.current.state).toBe(player);
});

test("loading", () => {
  const { result } = renderHook(
    () => {
      const state = usePlayerState();
      const { loading } = usePlayerAction();
      return { state, loading };
    },
    { wrapper }
  );
  expect(result.current.state.loading).toBe(false);

  act(() => result.current.loading(true));
  expect(result.current.state.loading).toBe(true);
});

test("clear", () => {
  const { result } = renderHook(
    () => {
      const state = usePlayerState();
      const { clear, play } = usePlayerAction();
      return { state, clear, play };
    },
    { wrapper }
  );

  act(() => result.current.play(player));
  expect(result.current.state).toBe(player);

  act(result.current.clear);
  expect(result.current.state).toBe(initialState);
});
