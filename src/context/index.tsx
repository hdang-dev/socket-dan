import { createContext, useReducer } from "react";
import { AppContext, AppState } from "../interfaces";
import { appReducer } from "./reducer";

const initialState: AppState = {
  you: null,
  room: null,
  menuVisible: false,
  theme: {
    type:'spin',
    background: "/backgrounds/background3.svg",
    planet: "/planets/c.earth.svg",
  },
};

export const Context = createContext<AppContext>({
  state: initialState,
  dispatch: () => {},
});

export default function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
}
