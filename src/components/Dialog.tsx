import { useContext } from "react";
import { AppContext } from "../context";

interface DialogProps {
    children: JSX.Element;
}

export default function Dialog({ children }: DialogProps) {
    const { isShowed, setIsShowed } = useContext(AppContext).dialog;
    return (
        <div
            className={`absolute inset-0 transition-all duration-500 grid place-items-center ${isShowed ? "backdrop-blur-md" : "-translate-y-full"}`}
            onClick={() => setIsShowed(false)}>
            <div className="w-full grid place-items-center" onClick={(e) => e.stopPropagation()}>
                <div className="w-[90%] max-w-[600px] rounded-[24px] bg-white overflow-hidden">
                    {children}
                </div>
            </div>
        </div >
    );
}