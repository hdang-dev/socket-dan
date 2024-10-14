import earthLogo from "/earth.svg";

interface MenuLayoutProps {
  children: JSX.Element;
}

export function MenuLayout({ children }: MenuLayoutProps) {
  return (
    <div className="w-full h-full bg-[var(--primary)] relative">
      {/* Background */}
      <div className="absolute left-[10%] bottom-[-5%] md:bottom-auto md:top-[10%]">
        <img className="w-screen min-w-[500px] max-w-[1200px] animate-spin animate-infinite animate-duration-[200s] md:animate-duration-[500s] opacity-60" src={earthLogo} alt="Planet" />
      </div>

      {/* Content */}
      {children}
    </div>
  );
}
