import { io } from "socket.io-client";
import { User } from "../interfaces";

const socket = io(import.meta.env.VITE_SERVER_URL);

enum SocketEvent {
  CONNECT = "SK_CONNECT",
  JOIN_ROOM = "SK_JOIN_ROOM",
  LEAVE_ROOM = "SK_LEAVE_ROOM",
  GET_USERS = "SK_GET_USERS",
  USER_JOIN = "SK_USER_JOIN",
  USER_LEAVE = "SK_USER_LEAVE",
  CHANGE_NAME = "SK_CHANGE_NAME",
}

const socketService = {
  connect(userName: string, handler: (userId: string) => void) {
    socket.emit(SocketEvent.CONNECT, userName);
    socket.on(SocketEvent.CONNECT, (userId: string) => {
      handler(userId);
      socket.off(SocketEvent.CONNECT);
    });
  },

  joinRoom(roomType: string, roomId: string, handler: (status: boolean) => void) {
    socket.emit(SocketEvent.JOIN_ROOM, roomType, roomId);
    socket.on(SocketEvent.JOIN_ROOM, (status: boolean) => {
      handler(status);
      socket.off(SocketEvent.JOIN_ROOM);
    });
  },

  leaveRoom(roomId: string) {
    socket.emit(SocketEvent.LEAVE_ROOM, roomId);
  },

  getUsers(roomId: string, handler: (users: User[]) => void) {
    socket.emit(SocketEvent.GET_USERS, roomId);
    socket.on(SocketEvent.GET_USERS, (users: User[]) => {
      handler(users);
      socket.off(SocketEvent.GET_USERS);
    });
  },

  onUserJoin(handler: (user: User) => void) {
    socket.on(SocketEvent.USER_JOIN, handler);
    return () => socket.off(SocketEvent.USER_JOIN);
  },

  onUserLeave(handler: (userId: string) => void) {
    socket.on(SocketEvent.USER_LEAVE, handler);
    return () => socket.off(SocketEvent.USER_LEAVE);
  },

  changeName(name: string) {
    socket.emit(SocketEvent.CHANGE_NAME, name);
  },

  onChangeName(handler: (user: User) => void) {
    socket.on(SocketEvent.CHANGE_NAME, handler);
    return () => socket.off(SocketEvent.CHANGE_NAME);
  },

  sendData<T>(event: string, data: T) {
    socket.emit(event, data);
  },

  onReceiveData<T>(event: string, handler: (data: T) => void) {
    socket.on(event, handler);
    return () => socket.off(event);
  },
};

export { socketService as socket };
