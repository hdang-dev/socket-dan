import { useContext } from "react";
import { Context } from "../context";

export function AppBackground({ children }: { children: React.ReactNode; }) {
  const { state } = useContext(Context);
  const { display } = state;
  const background = "/backgrounds/background3.svg";
  const planet = "/planets/c.earth.svg";

  return (
    <div className="w-full h-full overflow-hidden relative">
      {/* Background */}
      <div style={{ backgroundImage: `url(${background})` }} className={`w-full h-full bg-no-repeat absolute transition-all duration-[100ms] ${display.menuVisible ? 'top-[45%] left-1/2 scale-[150%] md:scale-[200%]' : 'bg-cover top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'}`}>
        {/* Planet */}
        <div className="animate-spin animate-infinite animate-duration-[100s] w-fit h-fit">
          <img className={`w-[calc(100vw*0.9)] max-w-[600px] transition-all duration-[1s]  ${display.menuVisible ? 'zscale-[150%] zmd:scale-[200%] rotate-180' : ''}`} src={planet} alt="Planet" />
        </div>
        {/* Text */}
        {/* <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-white opacity-90 tracking-tighter [word-spacing:-10px] w-max text-5xl md:text-6xl">{title}</span> */}
      </div>

      {/* Content */}
      <div className="w-full h-full absolute inset-0">{children}</div>
    </div>
  );
}

// export function RoomBackground({ title, children }: { title?: string; children: React.ReactNode; }) {
//   const planet = "/planets/c.earth.svg";
//   return (
//     <div className="w-full h-full grid place-items-center relative">
//       <div className="">
//         <div className="animate-spin animate-infinite animate-duration-[100s]">
//           <img className="w-[calc(100vw*0.9)] max-w-[600px]" src={planet} alt="Planet" />
//         </div>
//         {title && (
//           <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-white opacity-90 tracking-tighter [word-spacing:-10px] w-max text-5xl md:text-6xl">{title}</span>
//         )}
//       </div>
//       <div className="w-full h-full absolute inset-0">{children}</div>
//     </div>
//   );
// }

// export function MenuBackground({ children }: { children: React.ReactNode; }) {
//   const planet = "/planets/c.earth.svg";
//   return (
//     <div className="w-full h-full relative">
//       <div className="absolute top-[45%] left-[50%]">
//         <div className="animate-spin animate-infinite animate-duration-[200s]">
//           <img className="w-[calc(100vw*0.9)] max-w-[600px] scale-[150%] md:scale-[200%]" src={planet} alt="Planet" />
//         </div>
//       </div>
//       <div className="w-full h-full">{children}</div>
//     </div>
//   );
// }
