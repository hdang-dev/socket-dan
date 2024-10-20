import earthLogo from "/earth.svg";

interface PlanetBackgroundProps {
  title?: string;
  type?: "center" | "corner";
  children: JSX.Element;
}

export function PlanetBackground({ title, type = "center", children }: PlanetBackgroundProps) {
  const spinDurationBySec = type === "center" ? 100 : 200;
  console.log(spinDurationBySec);

  return (
    <div className="w-full h-full bg-[var(--primary)] relative">
      {/* Planet */}
      <div
        className={`absolute
        ${type === "center" ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" : ""}
        ${type === "corner" ? "top-[45%] left-[50%]" : ""}
      `}>
        <div className={`animate-spin animate-infinite ${type === "center" ? "animate-duration-[100s]" : "animate-duration-[200s]"}`}>
          <img className={`w-[calc(100vw*0.9)] max-w-[600px] opacity-60 ${type === "corner" ? "scale-[150%] md:scale-[200%]" : ""}`} src={earthLogo} alt="Planet" />
        </div>
        {title && <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-white w-max text-5xl md:text-6xl">{title}</span>}
      </div>

      {/* Content */}
      <div className="relative w-full h-full">{children}</div>
    </div>
  );
}
