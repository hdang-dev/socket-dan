import { useContext, useEffect } from "react";
import { Context } from "../../store";
import { MainMenu } from "../../components";
import { Outlet } from "react-router-dom";

export function AppLayout() {
  const { state, dispatch } = useContext(Context);
  const menuVisible = state.display.menuVisible;
  const roomType = state.room.type;
  const menuButtonName = (() => {
    if (!roomType) return "";
    return roomType[0].toLocaleUpperCase() + roomType.slice(1) + " Room";
  })();

  useEffect(() => {
    const calculateDocHeight = () => {
      document.documentElement.style.setProperty("--doc-height", `${window.innerHeight - 1}px`);
    };

    calculateDocHeight();
    window.addEventListener("resize", () => calculateDocHeight());
  });

  return (
    <div className="w-full h-full overflow-hidden bg-[var(--bg-color)]">
      <div className="w-full h-full mx-auto relative">
        <div className={`w-full h-full transition-all duration-[1s]  ${menuVisible ? "opacity-0 -translate-x-full" : ""}`}>
          <Outlet />
        </div>
        <div className={`absolute inset-0 transition-all duration-[1s] ${menuVisible ? "" : "opacity-0 translate-x-full"}`}>
          <MainMenu />
        </div>
        <button
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-[160px] h-[30px] rounded-b-[16px] bg-white shadow-md transition-all duration-100 text-black active:text-[var(--bg-color)] font-bold`}
          onClick={() => dispatch({ type: "TOGGLE_MENU" })}>
          {menuVisible ? "Back to Room" : menuButtonName}
        </button>
      </div>
    </div>
  );
}
