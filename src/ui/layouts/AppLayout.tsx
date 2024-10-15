import { useContext } from "react";
import { AppContext } from "../../context";

interface AppLayoutProps {
    children: JSX.Element;
}

export function AppLayout({ children }: AppLayoutProps) {
    const { dialogVisible, updateDialogVisible } = useContext(AppContext);
    return (
        <div className="w-full h-full overflow-hidden relative">
            <button
                className={`absolute top-0 left-1/2 -translate-x-1/2 w-[100px] h-[30px] bg-white shadow-md rounded-[24px] transition-all duration-500 ${dialogVisible ? "-translate-y-full" : "-translate-y-1/3"}`}
                onClick={() => updateDialogVisible(true)}>
            </button>

            {children}
        </div >
    );
}