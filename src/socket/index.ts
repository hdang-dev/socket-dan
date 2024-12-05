import { io } from "socket.io-client";
import { User } from "../interfaces";

const socket = io(import.meta.env.VITE_SERVER_URL);

enum SocketEvent {
  CONNECT = "SK_CONNECT",
  JOIN_ROOM = "SK_JOIN_ROOM",
  LEAVE_ROOM = "SK_LEAVE_ROOM",
  ADD_USER = "SK_ADD_USER",
  REMOVE_USER = "SK_REMOVE_USER",
  CHANGE_NAME = "SK_CHANGE_NAME",
  ON_CHANGE_NAME = "SK_ON_CHANGE_NAME",
}

const socketService = {
  connect(userName: string, handler: (userId: string) => void) {
    socket.emit(SocketEvent.CONNECT, userName);
    socket.on(SocketEvent.CONNECT, handler);
  },

  joinRoom(roomType: string, roomId: string, handler: (status: boolean) => void) {
    socket.emit(SocketEvent.JOIN_ROOM, roomType, roomId);
    socket.on(SocketEvent.JOIN_ROOM, handler);
  },

  leaveRoom(roomId: string) {
    socket.emit(SocketEvent.LEAVE_ROOM, roomId);
  },

  onAddUser(handler: (user: User) => void) {
    socket.on(SocketEvent.ADD_USER, handler);
  },

  onRemoveUser(handler: (userId: string) => void) {
    socket.on(SocketEvent.REMOVE_USER, handler);
  },

  changeName(name: string) {
    socket.emit(SocketEvent.CHANGE_NAME, name);
  },

  onChangeName(handler: (user: User) => void) {
    socket.on(SocketEvent.CHANGE_NAME, handler);
  },

  sendData<T>(event: string, data: T) {
    socket.emit(event, data);
  },

  onReceiveData<T>(event: string, handler: (data: T) => void) {
    socket.on(event, handler);
  },
};

export { socketService as socket };
