import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_SERVER_URL);

// =======================================================================================================
// Emitting events
// =======================================================================================================

// Declaration
export function emitEvent(event: "JOIN_APP"): void;
export function emitEvent(event: "CREATE_ROOM"): void;
export function emitEvent(event: "JOIN_ROOM", roomId: string): void;
export function emitEvent(event: "LEAVE_ROOM", roomId: string): void;
export function emitEvent(event: "MESSAGE", message: string, roomId?: string): void;

// Implementation
export function emitEvent(event: string, ...params: unknown[]): void {
  socket.emit(event, params);
}

// =======================================================================================================
// Received events
// =======================================================================================================

// Declaration
export function onEvent(event: "JOIN_APP", listener: (userId: string) => void): void;
export function onEvent(event: "CREATE_ROOM", listener: (roomId: string) => void): void;
export function onEvent(event: "JOIN_ROOM", listener: (userId: string) => void): void;
export function onEvent(event: "LEAVE_ROOM", listener: (userId: string) => void): void;
export function onEvent(event: "MESSAGE", listener: (message: string, userId: string) => void): void;

// Implementation
export function onEvent(event: string, listener: (...params: string[]) => void): void {
  socket.on(event, listener);
}
