import { Dispatch } from "react";
import { TInRoomInfo, TUser } from "./common";

export type TTheme = {
  background: string;
  planet: string;
  animation: string;
  active: boolean;
};

export type TStoreState = {
  user: TUser | null;
  inRoomInfo: TInRoomInfo | null;
  theme: TTheme;
};

type TInitUser = {
  type: "INIT_USER";
  user: TUser;
};

type TChangeName = {
  type: "CHANGE_NAME";
  user: TUser;
};

type TJoinRoom = {
  type: "JOIN_ROOM";
  room: TInRoomInfo;
};

type TAddUser = {
  type: "ADD_USER";
  user: TUser;
};

type TRemoveUser = {
  type: "REMOVE_USER";
  user: TUser;
};

type TLeavenRoom = {
  type: "LEAVE_ROOM";
  roomId: string;
};

type TChangeTheme = {
  type: "CHANGE_THEME";
  theme: TTheme;
};

export type TStoreAction = TInitUser | TChangeName | TJoinRoom | TAddUser | TRemoveUser | TLeavenRoom | TChangeTheme;

export type TStoreContext = {
  state: TStoreState;
  dispatch: Dispatch<TStoreAction>;
};

// type ConnectAction = {
//   type: "CONNECT";
//   id: string;
// };

// type ChangeYourNameAction = {
//   type: "CHANGE_YOUR_NAME";
//   name: string;
// };

// type ChangeOtherNameAction = {
//   type: "CHANGE_OTHER_NAME";
//   user: User;
// };

// type JoinRoomAction = {
//   type: "JOIN_ROOM";
//   roomType: string;
//   roomId: string;
// };

// type LeaveRoomAction = {
//   type: "LEAVE_ROOM";
// };

// type ToggleMenuAction = {
//   type: "TOGGLE_MENU";
// };

// type ChangeMenuName = {
//   type: "CHANGE_MENU_NAME";
//   name: string;
// };

// type AddUsersAction = {
//   type: "ADD_USERS";
//   users: User[];
// };

// type RemoveUserAction = {
//   type: "REMOVE_USER";
//   userId: string;
// };

// type ChangeBackground = {
//   type: "CHANGE_BACKGROUND";
//   background: string;
// };

// type ChangePlanet = {
//   type: "CHANGE_PLANET";
//   planet: string;
//   animation: string;
// };

// export type StoreActionType =
//   | ConnectAction
//   | JoinRoomAction
//   | LeaveRoomAction
//   | ChangeYourNameAction
//   | ChangeOtherNameAction
//   | ChangeMenuName
//   | ToggleMenuAction
//   | AddUsersAction
//   | RemoveUserAction
//   | ChangeBackground
//   | ChangePlanet;
