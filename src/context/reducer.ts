import { AppAction, AppState } from "../interfaces";

export const appReducer = (state: AppState, action: AppAction): AppState => {
  const { you, room, display } = state;
  const { type } = action;
  switch (type) {
    case "INIT_USER":
      return {
        ...state,
        you: action.you,
      };

    case "TOGGLE_MENU":
      return {
        ...state,
        display: {
          ...display,
          menuVisible: !display.menuVisible,
        },
      };

    case "CHANGE_USER_NAME": {
      const newYou = { ...you!, name: action.name };
      return {
        ...state,
        you: newYou,
        room: {
          ...room!,
          users: [...room!.users.filter((user) => user.id !== you!.id), { ...newYou }],
        },
      };
    }

    case "CHANGE_ROOM":
      return {
        ...state,
        room: action.room,
      };

    case "ADD_USER":
      return {
        ...state,
        room: {
          ...room!,
          users: [...room!.users, action.user],
        },
      };

    case "REMOVE_USER":
      return {
        ...state,
        room: {
          ...room!,
          users: room!.users.filter((user) => user.id !== action.user.id),
        },
      };

    default:
      return state;
  }
};
