import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_SERVER_URL);

enum SocketEvent {
  GET_ID = "GET_ID",
  USER_DISCONNECT = "USER_DISCONNECT",
  JOIN_ROOM = "JOIN_ROOM",
  LEAVE_ROOM = "LEAVE_ROOM",
  DATA = "DATA",
}

export const socketService = {
  getId(handler: (id: string) => void) {
    socket.emit(SocketEvent.GET_ID);
    socket.on(SocketEvent.GET_ID, handler);
  },

  userDisconnect(handler: (userId: string) => void) {
    socket.on(SocketEvent.USER_DISCONNECT, handler);
  },

  joinRoom(roomId: string) {
    socket.emit(SocketEvent.JOIN_ROOM, roomId);
  },

  leaveRoom(roomId: string) {
    socket.emit(SocketEvent.LEAVE_ROOM, roomId);
  },

  sendData<T>(id: string, key: string, data: T) {
    socket.emit(SocketEvent.DATA, id, key, data);
  },

  receiveData<T>(key: string, handler: (data: T) => void) {
    socket.on(SocketEvent.DATA, (onKey, data) => {
      if (onKey === key) handler(data);
    });
  },
};
