import { useContext, useEffect, useState } from "react";
import { Context } from "./context";
import { Menu } from "./menu";
import { Outlet } from "react-router-dom";
import { Background } from "./components";
import { socket } from "./socket";

export function Layout() {
  const { state, dispatch } = useContext(Context);
  const { you, menu } = state;
  const [ready, setReady] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", () => {
      document.documentElement.style.setProperty("--doc-height", `${window.innerHeight}px`);
    });

    socket.connect(you.name, (yourId) => {
      dispatch({ type: "CONNECT", id: yourId });
      setReady(true);
    });
  }, []);

  return (
    <Background>
      {/* Room content */}
      <div className={`w-full h-full transition-all duration-[1s] relative  ${menu.visible ? "opacity-0 translate-x-full" : ""}`}>
        <Outlet />
        {/* {ready ? <Outlet /> : <div className="w-full h-full grid place-items-center">Connecting to server ...</div>} */}
      </div>

      {/* Menu content */}
      <div className={`absolute inset-0 transition-all duration-[1s] ${menu.visible ? "" : "opacity-0 -translate-x-full"}`}>
        <Menu />
      </div>

      {/* Menu button */}
      <button
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[160px] h-[30px] rounded-b-[16px] bg-white shadow-md transition-all duration-100 text-black active:text-[var(--bg-color)] font-bold outline-none"
        onClick={() => dispatch({ type: "TOGGLE_MENU" })}>
        Menu
      </button>
    </Background>
  );
}
