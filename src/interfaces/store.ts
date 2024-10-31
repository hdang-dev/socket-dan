import { Dispatch } from "react";
import { Room, User } from "./common";

export type AppContext = {
  state: AppState;
  dispatch: Dispatch<AppAction>;
};

export type AppState = {
  you: User;
  room: Room;
  display: {
    menuVisible: boolean;
    menuButtonName: string;
  };
};

type InitUserAction = {
  type: "INIT_USER";
  user: User;
};

type ChangeUserNameAction = {
  type: "CHANGE_USER_NAME";
  name: string;
};

type JoinRoomAction = {
  type: "JOIN_ROOM";
  room: Room;
};

type ToggleMenuAction = {
  type: "TOGGLE_MENU";
};

export type AppAction = InitUserAction | ChangeUserNameAction | JoinRoomAction | ToggleMenuAction;
