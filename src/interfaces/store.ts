import { Dispatch } from "react";
import { Room, User } from "./common";

export type AppContext = {
  state: AppState;
  dispatch: Dispatch<AppAction>;
};

export type AppState = {
  you: User | null;
  room: Room | null;
  menuVisible: boolean;
  theme: {
    type: "spin" | "shake";
    background: string;
    planet: string;
  };
};

type InitUserAction = {
  type: "INIT_USER";
  you: User;
};

type ChangeNameAction = {
  type: "CHANGE_NAME";
  user: User;
};

type JoinRoomAction = {
  type: "JOIN_ROOM";
  roomType: string;
  roomId: string;
};

type ToggleMenuAction = {
  type: "TOGGLE_MENU";
};

type AddUserAction = {
  type: "ADD_USER";
  user: User;
};

type RemoveUserAction = {
  type: "REMOVE_USER";
  userId: string;
};

export type AppAction = InitUserAction | ChangeNameAction | JoinRoomAction | ToggleMenuAction | AddUserAction | RemoveUserAction;
