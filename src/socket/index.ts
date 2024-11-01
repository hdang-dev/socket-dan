/* eslint-disable @typescript-eslint/no-explicit-any */
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_SERVER_URL);

// =======================================================================================================
// Emitting events
// =======================================================================================================

// Declaration
export function emitEvent(event: "SOCKET_ID"): void;
export function emitEvent(event: "JOIN_ROOM", roomId: string): void;
export function emitEvent(event: "LEAVE_ROOM", roomId: string): void;
export function emitEvent<T>(event: "DATA", roomId: string, key: string, data: T,): void;

// Implementation
export function emitEvent(event: string, ...params: any[]): void {
  socket.emit(event, ...params);
}

// =======================================================================================================
// Received events
// =======================================================================================================

// Declaration
export function onEvent(event: "SOCKET_ID", listener: (socketId: string) => void): void;
export function onEvent<T>(event: "DATA", listener: (data: T) => void): void;

// Implementation
export function onEvent(event: string, key?: string, listener: (...args: any[]) => void): void {
  socket.on(event, args => {
    if (event === 'DATA' && key === args[0]) {
      listener(args);
    } else {
      listener(args);
    }
  });
}
