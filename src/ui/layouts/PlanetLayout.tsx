import earthLogo from "/earth.svg";

interface PlanetLayoutProps {
  children: JSX.Element;
}

export function PlanetLayout({ children }: PlanetLayoutProps) {
  return (
    <div className="w-full h-full grid place-items-center bg-[var(--primary)] relative">
      {/* Background */}
      <div className="relative w-[80%] max-w-[450px] opacity-80 md:opacity-100">
        <img className="animate-spin animate-infinite animate-duration-[100s]" src={earthLogo} alt="Earth Logo" />
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-white w-max text-5xl md:text-6xl">Socket Dan</span>
      </div>

      {/* Content */}
      <div className="absolute inset-0">{children}</div>
    </div>
  );
}
