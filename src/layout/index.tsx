import { useContext, useEffect, useState } from "react";
import { Context } from "../context";
import { Menu } from "../menu";
import { Outlet, useLocation } from "react-router-dom";
import { socketService as socket } from "../socket";
import { AppBackground, RoomBackground, MenuBackground } from "./SubComponents";
import { User } from "../interfaces";

export function AppLayout() {
  const { state, dispatch } = useContext(Context);
  const { you, room, display } = state;
  const [socketReady, setSocketReady] = useState(false);
  const location = useLocation();

  const getRoomInfo = () => {
    const data = location.pathname === "/" ? ["global", "global"] : location.pathname.split("/").slice(1);
    const roomType = data[0];
    const roomId = data[1];
    return { roomType, roomId };
  };

  useEffect(() => {
    socket.onConnect(() => {
      socket.getSocketId((socketId) => {
        dispatch({ type: "INIT_USER", user: { name: "User #" + socketId.slice(0, 6), id: socketId } });
        setSocketReady(true);
      });
    });
  }, []);

  useEffect(() => {
    if (socketReady) {
      const [roomType, roomId] = location.pathname === "/" ? ["global", "global"] : location.pathname.split("/").slice(1);
      const systemUser = { name: "System", id: "system" };
      if (roomType !== room.type || roomId !== room.id) {
        if (roomType === "global") {
          dispatch({ type: "CHANGE_ROOM", room: { type: roomType, id: roomId, users: [systemUser, you] } });
        } else {
          dispatch({ type: "CHANGE_ROOM", room: { type: roomType, id: roomId, users: [you] } });
        }
      }
    }
  }, [location, socketReady]);

  useEffect(() => {
    if (room.id !== "") {
      // console.log(123321);

      // socket.joinRoom(room.id);
      // socket.sendData(room.id, "new-user-join", you);
      // socket.receiveData<User>("new-user-join", (user) => {
      //   dispatch({ type: "ADD_USER", user });
      //   socket.sendData(user.id, "existed-user", you);
      // });
      // socket.receiveData("test", (text) => console.log(text));

      // socket.onDisconnect(() => socket.sendData(room.id, "test", "i leave"));

      // socket.receiveData<User>("existed-user", (user) => dispatch({ type: "ADD_USER", user }));
      // socket.receiveData<User>("user-leave", (user) => dispatch({ type: "REMOVE_USER", user }));
      // socket.onDisconnect(() => socket.sendData(roomId, "user-leave", you));
      return () => {
        // socket.sendData(room.id, "user-leave", you);
        // socket.sendData(room.id, "test", "i leave");
      };
    }
  }, [room.id]);

  return (
    <AppBackground>
      {/* Room content */}
      <div className={`w-full h-full transition-all duration-[1s] relative  ${display.menuVisible ? "opacity-0 -translate-x-full" : ""}`}>
        <RoomBackground>{socketReady && <Outlet />}</RoomBackground>
      </div>

      {/* Menu */}
      <div className={`absolute inset-0 transition-all duration-[1s] ${display.menuVisible ? "" : "opacity-0 translate-x-full"}`}>
        <MenuBackground>
          <Menu />
        </MenuBackground>
      </div>

      {/* Menu button */}
      {socketReady && (
        <button
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[160px] h-[30px] rounded-b-[16px] bg-white shadow-md transition-all duration-100 text-black active:text-[var(--bg-color)] font-bold outline-none"
          onClick={() => dispatch({ type: "TOGGLE_MENU" })}>
          {display.menuVisible ? "Back to Room" : `${room.type[0]?.toUpperCase()}${room.type.slice(1)} Room`}
        </button>
      )}
    </AppBackground>
  );
}
