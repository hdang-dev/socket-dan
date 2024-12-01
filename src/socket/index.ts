import { io } from "socket.io-client";
import { User } from "../interfaces";

const socket = io(import.meta.env.VITE_SERVER_URL);

enum SocketEvent {
  CONNECT = "SK_CONNECT",
  GET_USERS = "SK_GET_USERS",
  ADD_USER = "SK_ADD_USER",
  REMOVE_USER = "SK_REMOVE_USER",
  JOIN_ROOM = "SK_JOIN_ROOM",
  LEAVE_ROOM = "SK_LEAVE_ROOM",
}

const socketService = {
  connect(userName?: string, handler: (userId: string) => void) {
    socket.emit(SocketEvent.CONNECT, userName);
    socket.on(SocketEvent.CONNECT, handler);
  },

  joinRoom(roomType: string, roomId: string, user: User, handler: (status: boolean) => void) {
    socket.emit(SocketEvent.JOIN_ROOM, roomType, roomId);
    socket.on(SocketEvent.JOIN_ROOM, handler);
  },

  leaveRoom(roomId: string) {
    socket.emit(SocketEvent.LEAVE_ROOM, roomId);
  },

  getUSers(handler: (userId: string) => void) {

  }
  userDisconnect(handler: (userId: string) => void) {
    socket.on(SocketEvent.USER_DISCONNECT, handler);
  },


  // sendData<T>(id: string, key: string, data: T) {
  //   socket.emit(SocketEvent.DATA, id, key, data);
  // },

  // receiveData<T>(key: string, handler: (data: T) => void) {
  //   socket.on(SocketEvent.DATA, (onKey, data) => {
  //     if (onKey === key) handler(data);
  //   });
  //   socket.
  // },
};

export { socketService as socket };
