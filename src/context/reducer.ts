import { AppAction, AppState } from "../interfaces";

export const appReducer = (state: AppState, action: AppAction): AppState => {
  const { type } = action;
  switch (type) {
    case "INIT_USER":
      return {
        ...state,
        you: action.user,
      };
    case "TOGGLE_MENU":
      return {
        ...state,
        display: {
          ...state.display,
          menuVisible: !state.display.menuVisible,
        },
      };
    case "CHANGE_USER_NAME": {
      const { you, room } = state;
      const newYou = { ...you, name: action.name };
      return {
        ...state,
        you: {
          ...newYou
        },
        room: {
          ...room,
          users: [
            ...state.room.users.filter(user => user.id !== state.you.id),
            { ...newYou }
          ]
        }
      };
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
