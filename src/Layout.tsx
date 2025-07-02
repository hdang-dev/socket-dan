import { useEffect } from "react";
import { useStore } from "./store";
import { Outlet } from "react-router-dom";
import { Menu } from "./menu/index";

export function Layout() {
  const { theme, setThemeActive } = useStore();

  const toggleMenu = () => {
    setThemeActive(!theme.active);
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      document.documentElement.style.setProperty("--doc-height", `${window.innerHeight}px`);
    });
  }, []);

  return (
    <Background>
      {/* Room content */}
      <div className={`size-full transition-all duration-[1s] relative  ${theme.active ? "opacity-0" : "z-10"}`}>
        <Outlet />
        {/* {ready ? <Outlet /> : <div className="w-full h-full grid place-items-center">Connecting to server ...</div>} */}
      </div>

      {/* Menu content */}
      <div className={`absolute inset-0 transition-all duration-[1s] ${theme.active ? "z-10" : "opacity-0"}`}>
        <Menu />
      </div>

      {/* Menu button */}
      <button
        className="z-20 absolute top-0 left-1/2 -translate-x-1/2 w-[160px] h-[30px] rounded-b-[16px] bg-white shadow-md transition-all duration-100 text-black active:text-[var(--bg-color)] font-bold outline-none"
        onClick={() => toggleMenu()}>
        {theme.active ? "Return" : "Menu"}
      </button>
    </Background>
  );
}

const Background = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useStore();
  return (
    <div className="size-full overflow-hidden relative bg-black">
      {/* Background */}
      <div
        className={`size-full bg-cover bg-no-repeat transition-all duration-[1s] relative ${theme.active ? "scale-105 md:scale-110" : ""}`}
        style={{ backgroundImage: `url(${theme.background})` }}></div>

      {/* Planet */}
      <div className={`absolute transition-all duration-[1s] ${theme.active ? "top-[45%] left-1/2 scale-[175%]" : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"}`}>
        {theme.animation === "spin" && (
          <div className={`animate-spin animate-infinite animate-duration-[100s] w-max h-max`}>
            <img className={`w-[calc(100vw*0.9)] max-w-[600px] duration-[1s] ${theme.active ? "rotate-90" : ""}`} src={theme.planet} alt="Planet" />
          </div>
        )}
        {theme.animation === "shake" && (
          <div className="origin-bottom-left animate-[meteorBounce] animate-infinite animate-duration-[3s] animate-ease-in ">
            <div className={`origin-bottom-left animate-[meteor] animate-infinite animate-ease-linear animate-duration-[.7s]`}>
              <img className={`w-[calc(100vw*0.9)] max-w-[600px] duration-[1s] origin-center ${theme.active ? "" : ""}`} src={theme.planet} alt="Planet" />
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="absolute inset-0 mx-auto">{children}</div>
    </div>
  );
};
