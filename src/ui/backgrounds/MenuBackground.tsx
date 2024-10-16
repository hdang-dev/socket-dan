import { useContext } from "react";
import { AppContext } from "../../context";
import earthLogo from "/earth.svg";

interface MenuBackgroundProps {
  children: JSX.Element;
}

export function MenuBackground({ children }: MenuBackgroundProps) {
  const { dialogVisible } = useContext(AppContext);

  return (
    <div className="w-full h-full bg-[var(--primary)] relative">

      {/* Planet */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-[2s] ${dialogVisible ? 'top-[45%] left-[50%] translate-x-0 translate-y-0 rotate-180' : ''}`}>
        <div className="animate-spin animate-infinite animate-duration-[100s]">
          <img className={`transition-all duration-[2s] w-screen max-w-[600px] ${dialogVisible ? 'scale-[150%] md:scale-[200%]' : ''}`} src={earthLogo} alt="Planet" />
        </div>
      </div>

      {/* Content */}
      <div className="relative w-full h-full">
        {children}
      </div>
    </div>
  );
}

// animate-spin animate-infinite animate-duration-[100s]