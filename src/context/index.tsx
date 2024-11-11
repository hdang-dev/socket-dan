import { createContext, useReducer } from "react";
import { AppContext, AppState } from "../interfaces";
import { appReducer } from "./reducer";

const initialState: AppState = {
  you: null,
  room: null,
  menu: {
    visible: false,
    name: ''
  },
  theme: {
    background: "/backgrounds/background3.svg",
    planet: "/planets/c.earth.svg",
    animation: 'spin',
  },
};

export const Context = createContext<AppContext>({
  state: initialState,
  dispatch: () => { },
});

export default function AppProvider({ children }: { children: React.ReactNode; }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
}
