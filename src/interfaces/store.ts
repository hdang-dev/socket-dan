import { Dispatch } from "react";
import { Room, User } from "./common";

export type AppContext = {
  state: AppState;
  dispatch: Dispatch<AppAction>;
};

export type AppState = {
  you: User | null;
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

type AddUserAction = {
  type: "ADD_USER";
  user: User;
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

export type AppAction = InitUserAction | ChangeNameAction | JoinRoomAction | LeaveRoomAction | ToggleMenuAction | ChangeMenuName | AddUserAction | RemoveUserAction | ChangeBackground | ChangePlanet;
