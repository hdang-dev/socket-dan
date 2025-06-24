import { Socket } from "socket.io-client";
import { TSocketContext } from "../types";
import { createContext, useState } from "react";

// export class SocketService implements SocketServiceInterface {
//   private socket: Socket;

//   constructor(socket: Socket) {
//     this.socket = socket;
//   }

//   public connect(userName: string, handler: (userId: string) => void): void {
//     this.socket.emit(SocketEvent.CONNECT, userName);
//     this.socket.on(SocketEvent.CONNECT, (userId: string) => {
//       handler(userId);
//       this.socket.off(SocketEvent.CONNECT);
//     });
//   }

//   public joinRoom(roomType: string, roomId: string, handler: (status: boolean) => void): void {
//     this.socket.emit(SocketEvent.JOIN_ROOM, roomType, roomId);
//     this.socket.on(SocketEvent.JOIN_ROOM, (status: boolean) => {
//       handler(status);
//       this.socket.off(SocketEvent.JOIN_ROOM);
//     });
//   }

//   public leaveRoom(roomId: string): void {
//     this.socket.emit(SocketEvent.LEAVE_ROOM, roomId);
//   }

//   public getUsers(roomId: string, handler: (users: User[]) => void): void {
//     this.socket.emit(SocketEvent.GET_USERS, roomId);
//     this.socket.on(SocketEvent.GET_USERS, (users: User[]) => {
//       handler(users);
//       this.socket.off(SocketEvent.GET_USERS);
//     });
//   }

//   public onUserJoin(handler: (user: User) => void): () => void {
//     this.socket.on(SocketEvent.USER_JOIN, handler);
//     return () => this.socket.off(SocketEvent.USER_JOIN);
//   }

//   public onUserLeave(handler: (userId: string) => void): () => void {
//     this.socket.on(SocketEvent.USER_LEAVE, handler);
//     return () => this.socket.off(SocketEvent.USER_LEAVE);
//   }

//   public changeYourName(name: string): void {
//     this.socket.emit(SocketEvent.CHANGE_YOUR_NAME, name);
//   }

//   public onChangeOtherName(handler: (user: User) => void): () => void {
//     this.socket.on(SocketEvent.CHANGE_OTHER_NAME, handler);
//     return () => this.socket.off(SocketEvent.CHANGE_OTHER_NAME);
//   }

//   public sendData<T>(event: string, data: T): void {
//     this.socket.emit(event, data);
//   }

//   public onReceiveData<T>(event: string, handler: (data: T) => void): () => void {
//     this.socket.on(event, handler);
//     return () => this.socket.off(event);
//   }
// }

export const SocketContext = createContext<TSocketContext>({
  socket: null,
  setSocket: () => {},
});

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  // const connectSocket = (fake: boolean) => {
  //   setSocket(io(import.meta.env.VITE_SERVER_URL));
  // }

  // useEffect(() => {
  //   const newSocket = io(import.meta.env.VITE_SERVER_URL, { autoConnect: false });

  //   const handleConnect = () => {
  //     console.log("Socket connected", newSocket.id);

  //     setSocket(newSocket);
  //     setIsConnected(true);
  //     setIsLoading(false);
  //   };

  //   const handleDisconnect = () => {
  //     console.log("Socket disconnected");

  //     setIsConnected(false);
  //     setIsLoading(false);
  //   };

  //   const handleConnectError = (error: Error) => {
  //     console.error("Socket connection error", error);

  //     setIsLoading(false);
  //   };

  //   newSocket.on("connect", handleConnect);
  //   newSocket.on("disconnect", handleDisconnect);
  //   newSocket.on("connect_error", handleConnectError);
  //   newSocket.connect();

  //   return () => {
  //     newSocket.off("connect", handleConnect);
  //     newSocket.off("disconnect", handleDisconnect);
  //     newSocket.off("connect_error", handleConnectError);
  //     newSocket.disconnect();
  //   };
  // }, []);

  return <SocketContext.Provider value={{ socket, setSocket }}>{children}</SocketContext.Provider>;
}
