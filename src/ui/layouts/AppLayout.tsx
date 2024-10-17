/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context";
import { Menu } from "../components";

interface AppLayoutProps {
    children: JSX.Element;
}

export function AppLayout({ children }: AppLayoutProps) {
    const { dialogVisible, updateDialogVisible } = useContext(AppContext);
    const [a, setA] = useState(dialogVisible);
    let timeoutId: NodeJS.Timeout;

    useEffect(() => {
        if (dialogVisible) {
            setA(true);
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setA(false);
            }, 2100);
        }
    }, [dialogVisible]);

    return (
        <div className="w-full h-full overflow-hidden relative">
            <button
                className={`absolute top-0 left-1/2 -translate-x-1/2 w-[100px] h-[30px] bg-white shadow-md rounded-[24px] transition-all duration-500 -translate-y-1/3 z-[2] ${a ? "bg-red-500" : ""}`}
                onClick={() => updateDialogVisible(!dialogVisible)}> {dialogVisible + '' + a}
            </button>

            <div className={`absolute inset-0 w-full h-full ${a ? 'z-[1]' : 'zopacity-0'}`}>
                <Menu transitionDuration={2} />
            </div>

            <div className={`w-full h-full transition-all duration-[1s] ${a ? 'zopacity-0' : 'z-[1]'}`}>
                {children}
            </div>
        </div >
    );
}