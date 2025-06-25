import { useContext, useState } from "react";
import { SocketContext } from "./provider";
import { io } from "socket.io-client";
import { handler } from "tailwindcss-animated";

const a = new WebSocket('');


a.addEventListener('sk-connect', () => {

});

const useSocket = () => {
  const { socket, setSocket } = useContext(SocketContext);
  const [roomId, setRoomId] = useState<string | null>(null);
  const isSocketConnected = false;
  // const isSocketConnected = isFake ? true : socket !== null;

  const connectSocket = (handler: () => void, isFake?: boolean) => {

    if (isFake) {
      console.log("FakeSocket::connect");
      setSocket(a);
    } else {
      console.log("Socket::connect");
      const newSocket = io(import.meta.env.VITE_SERVER_URL);
      setSocket(newSocket);

    }




    // const newSocket = io(import.meta.env.VITE_SERVER_URL);
    // setSocket(newSocket);
    // newSocket.on('sk-connect', handler);
    // newSocket.emit('sk-connect');
    // newSocket.off('sk-connect');
  };

  // const connectSocket = async (isFake?: boolean): Promise<void> =>
  //   new Promise((res) => {
  //     if (isFake) {
  //       setTimeout(() => {
  //         setIsFake(true);
  //         console.log("FakeSocket::connect");
  //         res();
  //       }, 2_000);
  //       return;
  //     }

  //     setSocket(io(import.meta.env.VITE_SERVER_URL));
  //     res();
  //   });

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

  return { isSocketConnected, roomId, setFakeSocket, connectSocket, joinSocketRoom };
};

export { useSocket };
