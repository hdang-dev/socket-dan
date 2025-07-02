import { createContext, useState } from "react";
import { TStoreContext, TStoreState } from "../types";

const initialStoreState: TStoreState = {
  profile: null,
  room: null,
  theme: {
    background: "/backgrounds/background3.svg",
    planet: "/planets/c.earth.svg",
    animation: "spin",
    active: false,
  },
};

export const StoreContext = createContext<TStoreContext>({
  state: initialStoreState,
  setState: () => {},
});

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<TStoreState>(initialStoreState);
  return <StoreContext.Provider value={{ state, setState }}>{children}</StoreContext.Provider>;
}
