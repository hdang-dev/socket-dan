import { useContext } from "react";
import { SocketContext } from "./provider";
import { Socket } from "socket.io-client";

const useSocket = () => {
  const { socket, setSocket } = useContext(SocketContext);

  const connectSocket = (newSocket: Socket) => {
    console.log("connect socket");
    setSocket(newSocket);
    // setSocket(io(import.meta.env.VITE_SERVER_URL));
  };

  return { socket, connectSocket };
};

export { useSocket };
