import { useContext, useEffect, useState } from "react";
import { Context } from "../context";
import { Menu } from "../menu";
import { Outlet } from "react-router-dom";
import { emitEvent, onEvent } from "../socket";
import { AppBackground, RoomBackground, MenuBackground } from "./SubComponents";

export function AppLayout() {
  const { state, dispatch } = useContext(Context);
  const menuVisible = state.display.menuVisible;
  const roomType = state.room.type;
  const menuButtonName = (() => {
    if (!roomType) return "";
    return roomType[0].toLocaleUpperCase() + roomType.slice(1) + " Room";
  })();
  const [socketReady, setSocketReady] = useState(false);

  useEffect(() => {
    const calculateDocHeight = () => {
      document.documentElement.style.setProperty("--doc-height", `${window.innerHeight - 1}px`);
    };

    calculateDocHeight();
    window.addEventListener("resize", () => calculateDocHeight());

    emitEvent("SOCKET_ID");
    onEvent("SOCKET_ID", (socketId) => {
      dispatch({ type: "INIT_USER", user: { name: "User #" + socketId.slice(0, 6), id: socketId } });
      setTimeout(() =>
        setSocketReady(true)
        , 1000);
    });
  }, []);

  return (
    <AppBackground>
      {/* Room content */}
      <div className={`w-full h-full transition-all duration-[1s] relative  ${menuVisible ? "opacity-0 -translate-x-full" : ""}`}>
        <RoomBackground>
          {socketReady && <Outlet />}
        </RoomBackground>
      </div>

      {/* Menu */}
      <div className={`absolute inset-0 transition-all duration-[1s] ${menuVisible ? "" : "opacity-0 translate-x-full"}`}>
        <MenuBackground>
          <Menu />
        </MenuBackground>
      </div>

      {/* Menu button */}
      {socketReady &&
        <button
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[160px] h-[30px] rounded-b-[16px] bg-white shadow-md transition-all duration-100 text-black active:text-[var(--bg-color)] font-bold outline-none"
          onClick={() => dispatch({ type: "TOGGLE_MENU" })}>
          {menuVisible ? "Back to Room" : menuButtonName}
        </button>
      }
    </AppBackground>
  );
}
