import React, { createContext, useReducer } from "react";
import { dataReducer } from "./reducer";
import { ActionsFnType, State } from "./types";
import actions from "./actions";

const initialState: State = {
  shortUrl: "",
  topUrls: [],
  loading: false,
  error: null,
};

const AppContext = createContext<{
  state: State;
  actions: ActionsFnType;
}>({ state: initialState, actions: {} });

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  const boundActions: ActionsFnType = {};

  for (let key in actions) {
    boundActions[key] = actions[key](dispatch);
  }

  return (
    <AppContext.Provider value={{ state, actions: { ...boundActions } }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
