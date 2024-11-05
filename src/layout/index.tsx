import { useContext, useEffect, useState } from "react";
import { Context } from "../context";
import { Menu } from "../menu";
import { Outlet, useLocation } from "react-router-dom";
import { socketService as socket } from "../socket";
import { AppBackground } from "./SubComponents";
import { User } from "../interfaces";
import { roomTypeToName } from "../utils";

export function AppLayout() {
  const { state, dispatch } = useContext(Context);
  const { you, room, display } = state;
  const [prevRoom, setPrevRoom] = useState<string | null>(null);
  const location = useLocation();


  useEffect(() => {
    const [roomType, roomId] = location.pathname === "/" ? ["global", "global"] : location.pathname.split("/").slice(1);
    socket.getId((socketId) => {
      dispatch({ type: "INIT_USER", you: { id: socketId, name: "User #" + socketId.slice(0, 6) } });
      dispatch({ type: "JOIN_ROOM", roomType, roomId });
    });
  }, []);

  useEffect(() => {
    if (you?.id) {
      socket.receiveData<User>("new-user", (user) => {
        dispatch({ type: "ADD_USER", user });
        socket.sendData(user.id, "old-user", you);
      });

      socket.receiveData<User>("old-user", (user) => {
        dispatch({ type: "ADD_USER", user });
      });

      socket.receiveData<User>("user-leave", (user) => {
        dispatch({ type: "REMOVE_USER", userId: user.id });
      });

      socket.userDisconnect(userId => {
        dispatch({ type: "REMOVE_USER", userId });
      });
    }
  }, [you?.id]);

  useEffect(() => {
    if (room?.id && you) {
      if (prevRoom) {
        socket.sendData(prevRoom, 'user-leave', you);
        socket.leaveRoom(prevRoom);
      }

      dispatch({ type: 'ADD_USER', user: you });
      socket.joinRoom(room.id);
      socket.sendData(room.id, "new-user", you);
      setPrevRoom(room.id);
    }
  }, [room?.id]);

  return (
    <AppBackground>
      {/* Room content */}
      <div className={`w-full h-full transition-all duration-[1s] relative  ${display.menuVisible ? "opacity-0 translate-x-full" : ""}`}>
        {you && <Outlet />}
      </div>

      {/* Menu */}
      <div className={`absolute inset-0 transition-all duration-[1s] ${display.menuVisible ? "" : "opacity-0 -translate-y-full"}`}>
        {you && room && <Menu />}
      </div>

      {/* Menu button */}
      {you && (
        <button
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[160px] h-[30px] rounded-b-[16px] bg-white shadow-md transition-all duration-100 text-black active:text-[var(--bg-color)] font-bold outline-none"
          onClick={() => dispatch({ type: "TOGGLE_MENU" })}>
          {display.menuVisible ? "Back to Room" : roomTypeToName(room!.type)}
        </button>
      )}
    </AppBackground>
  );
}
