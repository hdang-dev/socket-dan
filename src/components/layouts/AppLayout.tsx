import { useContext, useEffect } from "react";
import { AppContext } from "../../context";
import { MainMenu } from "../../components";
import { Outlet } from "react-router-dom";

export function AppLayout() {
  const { dialogVisible, roomName, updateDialogVisible } = useContext(AppContext);
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
        <div className={`w-full h-full transition-all duration-[1s]  ${dialogVisible ? "opacity-0 -translate-x-full" : ""}`}>
          <Outlet />
        </div>
        <div className={`absolute inset-0 transition-all duration-[1s] ${dialogVisible ? "" : "opacity-0 translate-x-full"}`}>
          <MainMenu />
        </div>
        <button
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-[160px] h-[30px] rounded-b-[16px] bg-white shadow-md transition-all duration-100 text-black active:text-[var(--bg-color)] font-bold`}
          onClick={() => updateDialogVisible(!dialogVisible)}>
          {dialogVisible ? "Back to Room" : roomName}
        </button>
      </div>
    </div>
  );
}
