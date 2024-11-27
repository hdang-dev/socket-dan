import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_SERVER_URL);

enum SocketEvent {
  JOIN_APP = "JOIN_APP",
  USER_DISCONNECT = "USER_DISCONNECT",
  JOIN_ROOM = "JOIN_ROOM",
  LEAVE_ROOM = "LEAVE_ROOM",
  DATA = "DATA",
}

export const socketService = {
  joinApp(handler: (userId: string) => void) {
    socket.emit(SocketEvent.JOIN_APP);
    socket.on(SocketEvent.JOIN_APP, handler);
  },

  userDisconnect(handler: (userId: string) => void) {
    socket.on(SocketEvent.USER_DISCONNECT, handler);
  },

  joinRoom(roomId: string) {
    socket.emit(SocketEvent.JOIN_ROOM, roomId);
  },

  leaveRoom() {
    socket.emit(SocketEvent.LEAVE_ROOM);
  },

  sendData<T>(id: string, key: string, data: T) {
    socket.emit(SocketEvent.DATA, id, key, data);
  },

  receiveData<T>(key: string, handler: (data: T) => void) {
    socket.on(SocketEvent.DATA, (onKey, data) => {
      if (onKey === key) handler(data);
    });
    socket.
  },
};
