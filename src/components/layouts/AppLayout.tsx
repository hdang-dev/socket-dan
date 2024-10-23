import { useContext, useEffect } from "react";
import { AppContext } from "../../context";
import { MainMenu } from "../../components";
import { Outlet } from "react-router-dom";

export function AppLayout() {
  const { dialogVisible, roomName, updateDialogVisible } = useContext(AppContext);
  useEffect(() => {
    const calculateDocHeight = () => {
      document.body.style.setProperty('--doc-height', `${window.innerHeight}px`);
    };

    calculateDocHeight();
    window.addEventListener('resize', () => calculateDocHeight());
  });

  return (
    <div className="w-full h-full overflow-hidden bg-[var(--primary)]">
      <div className="w-full h-full max-w-[1400px] mx-auto relative">
        <div className={`w-full h-full transition-all duration-[1s]  ${dialogVisible ? "opacity-0 -translate-x-full" : ""}`}><Outlet /></div>
        <div className={`absolute inset-0 transition-all duration-[1s] ${dialogVisible ? "" : "opacity-0 translate-x-full"}`}><MainMenu /></div>
        <button
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-[160px] h-[30px] rounded-b-[16px] bg-white shadow-md transition-all duration-100 active:text-[var(--secondary)] font-bold`}
          onClick={() => updateDialogVisible(!dialogVisible)}>
          {dialogVisible ? "Back to Room" : roomName}
        </button>
      </div>
    </div>
  );
}
