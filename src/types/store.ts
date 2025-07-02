import { TUser, TRoom, TTheme } from "./common";

export type TStoreState = {
  profile: TUser | null;
  room: TRoom | null;
  theme: TTheme;
};

export type TStoreContext = {
  state: TStoreState;
  setState: (newState: TStoreState) => void;
};
