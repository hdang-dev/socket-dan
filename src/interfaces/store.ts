import { Dispatch } from "react";
import { Room, User } from "./common";

export type AppContext = {
  state: AppState;
  dispatch: Dispatch<AppAction>;
};

export type AppState = {
  you: User;
  room: Room | null;
  menu: {
    visible: boolean;
    name: string;
  };
  theme: {
    background: string;
    planet: string;
    animation: string;
  };
};

type ConnectAction = {
  type: "CONNECT";
  id: string;
};

type ChangeYourNameAction = {
  type: "CHANGE_YOUR_NAME";
  name: string;
};

type ChangeOtherNameAction = {
  type: "CHANGE_OTHER_NAME";
  user: User;
};

type JoinRoomAction = {
  type: "JOIN_ROOM";
  roomType: string;
  roomId: string;
};

type LeaveRoomAction = {
  type: "LEAVE_ROOM";
};

type ToggleMenuAction = {
  type: "TOGGLE_MENU";
};

type ChangeMenuName = {
  type: "CHANGE_MENU_NAME";
  name: string;
};

type AddUsersAction = {
  type: "ADD_USERS";
  users: User[];
};

type RemoveUserAction = {
  type: "REMOVE_USER";
  userId: string;
};

type ChangeBackground = {
  type: "CHANGE_BACKGROUND";
  background: string;
};

type ChangePlanet = {
  type: "CHANGE_PLANET";
  planet: string;
  animation: string;
};

export type AppAction =
  | ConnectAction
  | JoinRoomAction
  | LeaveRoomAction
  | ChangeYourNameAction
  | ChangeOtherNameAction
  | ChangeMenuName
  | ToggleMenuAction
  | AddUsersAction
  | RemoveUserAction
  | ChangeBackground
  | ChangePlanet;
