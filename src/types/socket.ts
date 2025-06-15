import { Socket } from "socket.io-client";
import { User } from "./common";

export enum SocketEvent {
    CONNECT = "SK_CONNECT",
    JOIN_ROOM = "SK_JOIN_ROOM",
    LEAVE_ROOM = "SK_LEAVE_ROOM",
    GET_USERS = "SK_GET_USERS",
    USER_JOIN = "SK_USER_JOIN",
    USER_LEAVE = "SK_USER_LEAVE",
    CHANGE_YOUR_NAME = "SK_CHANGE_YOUR_NAME",
    CHANGE_OTHER_NAME = "SK_CHANGE_OTHER_NAME",
}

type offEventCallback = () => void;

export type SocketServiceInterface = {
    connect(userName: string, handler: (userId: string) => void): void,
    joinRoom(roomType: string, roomId: string, handler: (status: boolean) => void): void;
    leaveRoom(roomId: string): void;
    getUsers(roomId: string, handler: (users: User[]) => void): void,
    onUserJoin(handler: (user: User) => void): offEventCallback,
    onUserLeave(handler: (userId: string) => void): offEventCallback,
    changeYourName(name: string): void;
    onChangeOtherName(handler: (user: User) => void): offEventCallback,
    sendData<T>(event: string, data: T): void,
    onReceiveData<T>(event: string, handler: (data: T) => void): offEventCallback;
};


export type SocketContextType = {
  socket: Socket | null;
  isConnected: boolean;
  isLoading: boolean;
};