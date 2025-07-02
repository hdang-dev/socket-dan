import { Socket } from "socket.io-client";

export type TSocketContext = {
  socket: Socket | null;
  setSocket: (socket: Socket | null) => void;
};
