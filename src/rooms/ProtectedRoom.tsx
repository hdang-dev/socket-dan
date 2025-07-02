import { useParams } from "react-router-dom";
import { useStore } from "../store";
import { useSocket } from "../socket";
import { useEffect } from "react";
import { io } from "socket.io-client";

export function ProtectedRoom({ children, roomType }: { children: React.ReactNode; roomType: string }) {
  const roomId = useParams().roomId!;
  const { socket, connectSocket } = useSocket();
  const { profile, room, initProfile, joinRoom, leaveRoom, addUser, removeUser, updateUserName } = useStore();

  useEffect(() => {
    if (socket) {
      initProfile({ id: socket.id!, name: "User #" + socket.id!.slice(0, 6) });
    } else {
      connectSocket(io(import.meta.env.VITE_SERVER_URL));
    }
  }, [socket]);

  useEffect(() => {
    if (socket && profile && !room) {
      socket.once("join-room", joinRoom);
      socket.on("add-user", addUser);
      socket.on("remove-user", removeUser);
      socket.on("update-user-name", updateUserName);
      socket.emit("join-room", roomId, roomType, profile);

      return () => {
        socket.off("add-user", addUser);
        socket.off("remove-user", removeUser);
        socket.off("update-user-name", updateUserName);
        socket.emit("leave-room", roomId);
        leaveRoom();
      };
    }
  }, [socket, profile, room]);

  return (
    <>
      {room ? (
        children
      ) : (
        <div className="size-full grid place-items-center">
          <span className="loading loading-bars loading-xl"></span>
        </div>
      )}
    </>
  );
}
