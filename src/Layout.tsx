/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { Context } from "./context";
import { Menu } from "./menu";
import { Outlet, useLocation } from "react-router-dom";
import { socket } from "./socket";
import { Background } from "./components";
import { User } from "./interfaces";
import { roomTypeToName } from "./utils";

export function Layout() {
  const { state, dispatch } = useContext(Context);
  const { you, room, menu } = state;
  // const [prevRoom, setPrevRoom] = useState<string | null>(null);
  // const location = useLocation();

  useEffect(() => {
    const name = "dan123";
    socket.connect(name, (userId) => {
      dispatch({ type: "INIT_USER", you: { id: userId, name } });
    });
  }, []);

  // useEffect(() => {
  //   if (you?.id) {
  //     socket.receiveData<User>("new-user", (user) => {
  //       dispatch({ type: "ADD_USER", user });
  //       socket.sendData(user.id, "old-user", you);
  //     });

  //     socket.receiveData<User>("old-user", (user) => {
  //       dispatch({ type: "ADD_USER", user });
  //     });

  //     socket.receiveData<User>("user-leave", (user) => {
  //       dispatch({ type: "REMOVE_USER", userId: user.id });
  //     });

  //     socket.userDisconnect((userId) => {
  //       dispatch({ type: "REMOVE_USER", userId });
  //     });
  //   }
  // }, [you?.id]);

  useEffect(() => {
    // if (room?.id && you) {
    //   if (prevRoom) {
    //     socket.sendData(prevRoom, "user-leave", you);
    //     socket.leaveRoom(prevRoom);
    //   }
    //   dispatch({ type: "ADD_USER", user: you });
    //   socket.joinRoom(room.id);
    //   socket.sendData(room.id, "new-user", you);
    //   setPrevRoom(room.id);
    // }
    // Are u sure ????????????????????????????????????????
    // socket.receiveData<User>("new-user", (user) => {
    //   dispatch({ type: "ADD_USER", user });
    //   socket.sendData(user.id, "old-user", you);
    // });
    // socket.receiveData<User>("old-user", (user) => {
    //   dispatch({ type: "ADD_USER", user });
    // });
    // socket.receiveData<User>("user-leave", (user) => {
    //   dispatch({ type: "REMOVE_USER", userId: user.id });
    // });
    // socket.userDisconnect((userId) => {
    //   dispatch({ type: "REMOVE_USER", userId });
    // });
  }, [room?.id]);

  console.log(room, you);

  return (
    <Background>
      {/* Room content */}
      <div className={`w-full h-full transition-all duration-[1s] relative  ${menu.visible ? "opacity-0 translate-y-full" : ""}`}>
        <Outlet />
      </div>

      {/* Menu */}
      <div className={`absolute inset-0 transition-all duration-[1s] ${menu.visible ? "" : "opacity-0 -translate-y-full"}`}>
        <Menu />
      </div>

      {/* Menu button */}
      <button
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[160px] h-[30px] rounded-b-[16px] bg-white shadow-md transition-all duration-100 text-black active:text-[var(--bg-color)] font-bold outline-none"
        onClick={() => dispatch({ type: "TOGGLE_MENU" })}>
        {/* {menu.visible ? "Back to Room" : roomTypeToName(room!.type)} */}
        Menu
      </button>
    </Background>
  );
}
