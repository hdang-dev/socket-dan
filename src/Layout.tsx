import { useContext, useEffect } from "react";
import { Context } from "./context";
import { Menu } from "./menu";
import { Outlet } from "react-router-dom";
import { socket } from "./socket";
import { Background } from "./components";

export function Layout() {
  const { state, dispatch } = useContext(Context);
  const { you, menu } = state;

  useEffect(() => {
    socket.connect(you.name, (userId) => {
      dispatch({ type: "CONNECT", id: userId });
    });
  }, []);

  return (
    <Background>
      {/* Room content */}
      {you.id ? (
        <div className={`w-full h-full transition-all duration-[1s] relative  ${menu.visible ? "opacity-0 translate-y-full" : ""}`}>
          <Outlet />
        </div>
      ) : (
        <div className="w-full h-full p-[20px] text-center font-bold grid place-items-center">Connecting...</div>
      )}

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
