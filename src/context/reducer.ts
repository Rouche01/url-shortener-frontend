import { Action, ActionType, State } from "./types";

export const dataReducer = (state: State, action: Action) => {
  const { payload, type } = action;
  switch (type) {
    case ActionType.Shorten:
      return { ...state, shortUrl: payload };
    case ActionType.GetTopUrl:
      return { ...state, topUrls: [...payload] };
    case ActionType.SetLoading:
      return { ...state, loading: payload };
    case ActionType.SetError:
      return { ...state, error: payload };
    default:
      return state;
  }
};
