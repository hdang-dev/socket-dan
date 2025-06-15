import { TStoreAction, TStoreState } from "../types";

export const storeReducer = (state: TStoreState, action: TStoreAction): TStoreState => {
  const { user, room } = state;
  const { type } = action;
  switch (type) {
    case "INIT_USER":
      return { ...state, user };

    case "CHANGE_NAME": {
      // Change other user name
      if (user && room && action.user.id !== user.id) {
        const userIndex = room.users.findIndex((user) => user.id === action.user.id);
        return {
          ...state,
          room: {
            ...room!,
            users: [...room!.users.slice(0, userIndex), action.user, ...room!.users.slice(userIndex + 1)],
          },
        };
      }
      // Change your name
      return { ...state, user: action.user };
    }

    case "JOIN_ROOM":
      return { ...state, room: action.room };

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

    case "LEAVE_ROOM":
      return { ...state, room: null };

    case "CHANGE_THEME":
      return { ...state, theme: action.theme };

    default:
      return state;
  }
};
