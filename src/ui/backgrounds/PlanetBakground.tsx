import earthLogo from "/earth.svg";

interface PlanetBackgroundProps {
  title?: string;
  children: JSX.Element;
}

export function PlanetBackground({ title, children }: PlanetBackgroundProps) {
  return (
    <div className="w-full h-full bg-[var(--primary)] relative">
      {/* Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-70 md:opacity-100">
        <img className="w-screen max-w-[600px] animate-spin animate-infinite animate-duration-[100s]" src={earthLogo} alt="Planet" />
        {title && (
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-white w-max text-5xl md:text-6xl">{title}</span>
        )}
      </div>

      {/* Content */}
      <div className="relative w-full h-full">
        {children}
      </div>
    </div>
  );
}
