import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_SERVER_URL);

// =======================================================================================================
// Emitting events
// =======================================================================================================

// Declaration
export function emitEvent(event: "JOIN_APP"): void;
export function emitEvent(event: "SEND_MESSAGE", message: string): void;

// Implementation
export function emitEvent<T>(event: string, param?: T): void {
  socket.emit(event, param);
}

// =======================================================================================================
// Received events
// =======================================================================================================

// Declaration
export function onEvent(event: "USER_ID", callback: (userId: string) => void): void;
export function onEvent(event: "RECEIVE_MESSAGE", callback: (message: string) => void): void;

// Implementation
export function onEvent<T>(event: string, callback: (value: T) => void): void {
  socket.on(event, callback);
}
