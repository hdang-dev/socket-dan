import React, { useContext } from "react";
import { io } from "socket.io-client";
import { Context } from "../context";

const socket = io(import.meta.env.VITE_SERVER_URL, { autoConnect: false });

enum SocketEvent {
  CONNECT = "CONNECT",
  DISCONNECT = "DISCONNECT",
  JOIN_ROOM = "JOIN_ROOM",
  LEAVE_ROOM = "LEAVE_ROOM",
  DATA = "DATA",
}

export const socketService = {
  connect(handler: (socketId: string) => void) {
    socket.connect();
    socket.on(SocketEvent.CONNECT, handler);
  },

  userDisconnect(handler: (socketId: string) => void) {
    socket.on("disconnect", handler);
  },

  joinRoom(roomId: string) {
    socket.emit(SocketEvent.JOIN_ROOM, roomId);
  },

  leaveRoom(roomId: string) {
    socket.emit(SocketEvent.LEAVE_ROOM, roomId);
  },

  sendData<T>(roomId: string, key: string, data: T) {
    socket.emit(SocketEvent.DATA, roomId, key, data);
  },

  receiveData<T>(key: string, handler: (data: T) => void) {
    socket.on(SocketEvent.DATA, (onKey, data) => {
      if (onKey === key) handler(data);
    });
  },
};
