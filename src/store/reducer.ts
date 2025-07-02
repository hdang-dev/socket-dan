// import { TStoreAction, TStoreState } from "../types";

// export const storeReducer = (state: TStoreState, action: TStoreAction): TStoreState => {
//   const { type } = action;
//   switch (type) {
//     case "UPDATE_USER":
//       return { ...state, user: action.user };

//     case "UPDATE_ROOM":
//       return { ...state, room: action.room };

//     // case "CHANGE_NAME": {
//     //   // Change other user name
//     //   if (user && inRoomInfo && action.user.id !== user.id) {
//     //     const userIndex = inRoomInfo.users.findIndex((user) => user.id === action.user.id);
//     //     return {
//     //       ...state,
//     //       inRoomInfo: {
//     //         ...inRoomInfo,
//     //         users: [...inRoomInfo.users.slice(0, userIndex), action.user, ...inRoomInfo.users.slice(userIndex + 1)],
//     //       },
//     //     };
//     //   }
//     //   // Change your name
//     //   return { ...state, user: action.user };
//     // }

//     // case "JOIN_ROOM":
//     //   return { ...state, inRoomInfo: action.inRoomInfo };

//     // case "ADD_USER":
//     //   return {
//     //     ...state,
//     //     inRoomInfo: {
//     //       ...inRoomInfo!,
//     //       users: [...inRoomInfo!.users, action.user],
//     //     },
//     //   };

//     // case "REMOVE_USER":
//     //   return {
//     //     ...state,
//     //     inRoomInfo: {
//     //       ...inRoomInfo!,
//     //       users: inRoomInfo!.users.filter((user) => user.id !== action.user.id),
//     //     },
//     //   };

//     // case "LEAVE_ROOM":
//     //   return { ...state, inRoomInfo: null };

//     case "UPDATE_THEME":
//       return { ...state, theme: action.theme };

//       case "UPDATE_SOCKET":
//       return { ...state, socket: action.socket };

//     default:
//       return state;
//   }
// };
