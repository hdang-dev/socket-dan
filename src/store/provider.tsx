import { createContext, useReducer } from "react";
import { TStoreContext, TStoreState } from "../types";
import { storeReducer } from "./reducer";

const initialStoreState: TStoreState = {
  user: null,
  room: null,
  theme: {
    background: "/backgrounds/background3.svg",
    planet: "/planets/c.earth.svg",
    animation: "spin",
    zoom: false,
  },
};

export const StoreContext = createContext<TStoreContext>({
  state: initialStoreState,
  dispatch: () => {},
});

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(storeReducer, initialStoreState);
  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>;
}
