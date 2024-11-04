import { Dispatch } from "react";
import { Room, User } from "./common";

export type AppContext = {
  state: AppState;
  dispatch: Dispatch<AppAction>;
};

export type AppState = {
  you: User | null;
  room: Room | null;
  display: {
    menuVisible: boolean;
    menuButtonName: string;
  };
};

type InitUserAction = {
  type: "INIT_USER";
  you: User;
};

type ChangeUserNameAction = {
  type: "CHANGE_USER_NAME";
  name: string;
};

type ChangeRoomAction = {
  type: "CHANGE_ROOM";
  room: Room;
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
  user: User;
};

export type AppAction = InitUserAction | ChangeUserNameAction | ChangeRoomAction | ToggleMenuAction | AddUserAction | RemoveUserAction;
