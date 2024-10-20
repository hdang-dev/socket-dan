import { useContext } from "react";
import { AppContext } from "../../context";
import { MainMenu } from "../../components";

interface AppLayoutProps {
  children: JSX.Element;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { dialogVisible, updateDialogVisible } = useContext(AppContext);

  return (
    <div className="w-full h-full overflow-hidden relative bg-[var(--primary)]">
      <div className={`w-full h-full transition-all duration-[1s]  ${dialogVisible ? "opacity-0 -translate-x-full" : ""}`}>{children}</div>

      <div className={`fixed inset-0 transition-all duration-[1s] ${dialogVisible ? "" : "opacity-0 translate-x-full"}`}>
        <MainMenu />
      </div>

      <button
        className={`absolute top-0 left-1/2 -translate-x-1/2 w-[160px] h-[30px] rounded-b-[16px] bg-white shadow-md transition-all duration-100 active:text-[var(--secondary)] font-bold`}
        onClick={() => updateDialogVisible(!dialogVisible)}>
        {dialogVisible ? "Back to Room" : "Global Room"}
      </button>
    </div>
  );
}
