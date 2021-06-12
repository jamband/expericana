import { Player } from "~/types/player";

export type State = Player;

export const initialState: State = {
  id: "",
  title: "",
  provider: "",
  provider_key: "",
  type: "",
  loading: false,
};

export type Action =
  | { type: "play"; payload: Player }
  | { type: "loading"; payload: boolean }
  | { type: "clear" };

export type Dispatch = (action: Action) => void;

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "play":
      return action.payload;
    case "loading":
      return {
        ...state,
        loading: action.payload,
      };
    case "clear":
      return initialState;
    default:
      return state;
  }
};
