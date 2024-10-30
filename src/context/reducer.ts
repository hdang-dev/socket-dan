import { AppAction, AppState } from "../interfaces";

export const appReducer = (state: AppState, action: AppAction): AppState => {
  const { type } = action;
  switch (type) {
    case "INIT_USER":
      return {
        ...state,
        user: action.user,
      };
    case "TOGGLE_MENU":
      return {
        ...state,
        display: {
          ...state.display,
          menuVisible: !state.display.menuVisible,
        },
      };
    case "CHANGE_USER_NAME":
      return {
        ...state,
        user: {
          ...state.user,
          name: action.name,
        },
      };
    case "JOIN_ROOM":
      return {
        ...state,
        room: action.room,
      };
    default:
      return state;
  }
};
