import { useCallback, useContext } from "react";
import { StateContext, DispatchContext } from "~/contexts/player";
import type { Player } from "~/types/player";

export const usePlayerState = () => {
  return useContext(StateContext);
};

export const usePlayerAction = () => {
  const dispatch = useContext(DispatchContext);

  const play = (player: Player) =>
    dispatch({
      type: "play",
      payload: player,
    });

  const loading = (loading: boolean) =>
    dispatch({
      type: "loading",
      payload: loading,
    });

  const clear = () =>
    dispatch({
      type: "clear",
    });

  return {
    play: useCallback(play, [dispatch]),
    loading: useCallback(loading, [dispatch]),
    clear: useCallback(clear, [dispatch]),
  } as const;
};
