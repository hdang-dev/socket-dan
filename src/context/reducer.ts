import { AppAction, AppState } from "../interfaces";

export const appReducer = (state: AppState, action: AppAction): AppState => {
  const { you, room, menu, theme } = state;
  const { type } = action;
  switch (type) {
    case "CONNECT":
      return {
        ...state,
        you: {
          ...you,
          id: action.id,
        },
      };

    case "TOGGLE_MENU":
      return {
        ...state,
        menu: {
          ...menu,
          visible: !menu.visible,
        },
      };

    case "CHANGE_YOUR_NAME": {
      return {
        ...state,
        you: {
          ...you,
          name: action.name,
        },
      };
    }

    case "CHANGE_OTHER_NAME": {
      const index = room!.users.findIndex((user) => user.id === action.user.id);
      return {
        ...state,
        room: {
          ...room!,
          users: [...room!.users.slice(0, index), action.user, ...room!.users.slice(index + 1)],
        },
      };
    }

    case "JOIN_ROOM":
      return {
        ...state,
        room: {
          type: action.roomType,
          id: action.roomId,
          users: [you!],
        },
      };

    case "LEAVE_ROOM":
      return {
        ...state,
        room: null,
      };

    case "ADD_USERS":
      return {
        ...state,
        room: {
          ...room!,
          users: [...room!.users, ...action.users],
        },
      };

    case "REMOVE_USER":
      return {
        ...state,
        room: {
          ...room!,
          users: room!.users.filter((user) => user.id !== action.userId),
        },
      };

    case "CHANGE_BACKGROUND":
      return {
        ...state,
        theme: {
          ...theme,
          background: action.background,
        },
      };

    case "CHANGE_PLANET":
      return {
        ...state,
        theme: {
          ...theme,
          planet: action.planet,
          animation: action.animation,
        },
      };

    default:
      return state;
  }
};
