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

    case "CHANGE_NAME": {
      const index = room!.users.findIndex(user => user.id === action.user.id);
      if (action.user.id === you!.id) {
        return {
          ...state,
          you: action.user,
          room: {
            ...room!,
            users: [...room!.users.slice(0, index), action.user, ...room!.users.slice(index + 1)],
          },
        };
      }
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
          users: []
        }
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
          users: room!.users.filter((user) => user.id !== action.userId),
        },
      };

    default:
      return state;
  }
};
