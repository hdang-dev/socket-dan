import { useContext, useEffect, useState } from "react";
import { Context } from "../context";
import { socket } from "../socket";

interface RoomWrapperProps {
  roomType: string;
  roomId: string;
  children: React.ReactNode;
}

export function RoomWrapper({ roomType, roomId, children }: RoomWrapperProps) {
  const { state, dispatch } = useContext(Context);
  const { room } = state;
  const [message, setMessage] = useState("Connecting...");

  useEffect(() => {
    socket.joinRoom(roomType, roomId, (status) => {
      if (status) {
        dispatch({ type: "JOIN_ROOM", roomType, roomId });
        return () => {
          socket.leaveRoom(roomId);
          dispatch({ type: "LEAVE_ROOM" });
        };
      } else {
        setMessage("This room is at capacity. Please create or join another one.");
      }
    });
  }, []);

  return room ? <>{children}</> : <div className="w-full h-full p-[20px] text-center font-bold grid place-items-center">{message}</div>;
}
