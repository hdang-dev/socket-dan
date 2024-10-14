import { useContext } from "react";
import { AppContext } from "../../context";

interface DialogProps {
  children: JSX.Element;
}

export function Dialog({ children }: DialogProps) {
  const { dialogVisible, updateDialogVisible } = useContext(AppContext);
  return (
    <div className={`absolute inset-0 transition-all duration-500 grid place-items-center ${dialogVisible ? "backdrop-blur-md" : "-translate-y-full"}`} onClick={() => updateDialogVisible(false)}>
      <div className="w-full grid place-items-center" onClick={(e) => e.stopPropagation()}>
        <div className="w-[90%] max-w-[600px] rounded-[24px] bg-white overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
