/* eslint-disable @typescript-eslint/no-explicit-any */
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_SERVER_URL, { autoConnect: false });

// =======================================================================================================
// Emitting events
// =======================================================================================================

// Declaration
export function emitEvent(event: "JOIN_ROOM", roomId: string): void;
export function emitEvent(event: "LEAVE_ROOM", roomId: string): void;
export function emitEvent(event: "SEND_MESSAGE", message: string, roomId: string): void;

// Implementation
export function emitEvent(event: string, ...params: any[]): void {
  socket.emit(event, params);
}

// =======================================================================================================
// Received events
// =======================================================================================================

// Declaration
export function onEvent(event: "GET_YOUR_ID", listener: (yourId: string) => void): void;
export function onEvent(event: "USER_JOIN", listener: (userId: string) => void): void;
export function onEvent(event: "USER_LEAVE", listener: (userId: string) => void): void;
export function onEvent(event: "RECEIVE_MESSAGE", listener: (message: string, senderId: string) => void): void;

// Implementation
export function onEvent(event: string, listener: (...args: any[]) => void): void {
  socket.on(event, listener);
};