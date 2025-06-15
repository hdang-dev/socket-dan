import { useTheme } from "../store/hooks";

export function Background({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  return (
    <div className="w-full h-full overflow-hidden relative bg-black">
      {/* Background */}
      <div
        className={`w-full h-full bg-cover bg-no-repeat transition-all duration-[1s] relative ${theme.zoom ? "scale-105 md:scale-110" : ""}`}
        style={{ backgroundImage: `url(${theme.background})` }}></div>

      {/* Planet */}
      <div className={`absolute transition-all duration-[1s] ${theme.zoom ? "top-[45%] left-1/2 scale-[175%]" : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"}`}>
        {theme.animation === "spin" && (
          <div className={`animate-spin animate-infinite animate-duration-[100s] w-max h-max`}>
            <img className={`w-[calc(100vw*0.9)] max-w-[600px] duration-[1s] ${theme.zoom ? "rotate-90" : ""}`} src={theme.planet} alt="Planet" />
          </div>
        )}
        {theme.animation === "shake" && (
          <div className="origin-bottom-left animate-[meteorBounce] animate-infinite animate-duration-[3s] animate-ease-in ">
            <div className={`origin-bottom-left animate-[meteor] animate-infinite animate-ease-linear animate-duration-[.7s]`}>
              <img className={`w-[calc(100vw*0.9)] max-w-[600px] duration-[1s] origin-center ${theme.zoom ? "" : ""}`} src={theme.planet} alt="Planet" />
            </div>
          </div>
          // </div>
        )}
      </div>

      {/* Content */}
      <div className="absolute inset-0 mx-auto">{children}</div>
    </div>
  );
}
