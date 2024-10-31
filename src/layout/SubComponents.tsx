export function AppBackground({ children }: { children: React.ReactNode; }) {
  // const background = "/backgrounds/background1.png";
  const background = "/backgrounds/background3.svg";
  return (
    <div className="w-full h-full overflow-hidden relative">
      <img src={background} className="min-h-full min-w-full object-cover" alt="app-background" />
      <div className="w-full h-full absolute inset-0">{children}</div>
    </div>
  );
}

export function RoomBackground({ title, children }: { title?: string; children: React.ReactNode; }) {
  const planet = "/planets/c.earth.svg";
  return (
    <div className="w-full h-full grid place-items-center relative">
      <div className="">
        <div className="animate-spin animate-infinite animate-duration-[100s]">
          <img className="w-[calc(100vw*0.9)] max-w-[600px]" src={planet} alt="Planet" />
        </div>
        {title && (
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-white opacity-90 tracking-tighter [word-spacing:-10px] w-max text-5xl md:text-6xl">{title}</span>
        )}
      </div>
      <div className="w-full h-full absolute inset-0">{children}</div>
    </div>
  );
}

export function MenuBackground({ children }: { children: React.ReactNode; }) {
  const planet = "/planets/c.earth.svg";
  return (
    <div className="w-full h-full relative">
      <div className="absolute top-[45%] left-[50%]">
        <div className="animate-spin animate-infinite animate-duration-[200s]">
          <img className="w-[calc(100vw*0.9)] max-w-[600px] scale-[150%] md:scale-[200%]" src={planet} alt="Planet" />
        </div>
      </div>
      <div className="w-full h-full">{children}</div>
    </div>
  );
}
