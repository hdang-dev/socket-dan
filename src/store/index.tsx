import { createContext, useReducer } from "react";
import { AppContext, AppState } from "../interfaces";
import { appReducer } from "./reducer";

const initialState: AppState = {
  user: { name: "User", id: "" },
  room: { type: null, id: "" },
  display: {
    menuButtonName: "",
    // menuVisible: false,
    menuVisible: true,
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
