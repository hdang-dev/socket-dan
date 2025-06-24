import { useContext, useState } from "react";
import { SocketContext } from "./provider";
import { io } from "socket.io-client";

const useSocket = () => {
  const { socket, setSocket } = useContext(SocketContext);
  const [isFake, setIsFake] = useState(false);
  const [roomId, setRoomId] = useState<string | null>(null);

  const isSocketConnected = isFake ? true : socket !== null;
  console.log("fake = ", isSocketConnected, socket);

  const connectSocket = async (isFake?: boolean): Promise<void> =>
    new Promise((res) => {
      if (isFake) {
        setTimeout(() => {
          setIsFake(true);
          console.log("FakeSocket::connect");
          res();
        }, 2_000);
        return;
      }

      setSocket(io(import.meta.env.VITE_SERVER_URL));
      res();
    });

  const joinSocketRoom = (handler: () => void) => {
    if (isFake) {
      console.log("xxxx  FakeSocket::joinRoom");
      setTimeout(() => {
        setRoomId("fake-room");
        console.log("FakeSocket::joinRoom");
      }, 500);
      return;
    }
    if (socket) {
      socket.emit("example-join", handler);
    }
  };

  return { isSocketConnected, roomId, connectSocket, joinSocketRoom };
};

export { useSocket };
