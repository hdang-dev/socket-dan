import { useState } from "react";
import { PlanetBackground } from "../backgrounds";

const Row = ({ children, style }: { children: JSX.Element, style?: string; }) => {
  return <div className={`px-[20px] md:px-[60px] ${style ?? ''}`}>{children}</div>;
};

const Title = ({ text }: { text: string; }) => {
  return <h1 className="pb-[30px] text-lg text-center font-bold md:text-left md:text-2xl">{text}</h1>;
};

const RoomCard = ({ text }: { text: string; }) => {
  return (
    <div className="cursor-pointer overflow-hidden rounded-[24px] border-[3px] border-white shadow-lg">
      <div className="w-[250px] md:w-[300px] aspect-[4/3] bg-[url('/room.png')] transition-all duration-300 hover:scale-110 active:scale-110 active:text-[var(--secondary)] grid place-items-center">
        <span className="text-inherit">{text}</span>
      </div>
    </div>
  );
};

export function Menu() {
  const rooms = [
    { name: 'Global Room', path: '/' },
    { name: 'Chat Room', path: '/chat' },
    { name: 'Call Room', path: '/call' },
    { name: 'Call Room', path: '/call' },
    { name: 'Call Room', path: '/call' },
    { name: 'Call Room', path: '/call' },
    { name: 'Call Room', path: '/call' },
    { name: 'Call Room', path: '/call' },
    { name: 'Call Room', path: '/call' },
    { name: 'Call Room', path: '/call' },
    { name: 'Call Room', path: '/call' }
  ];
  const [link, setLink] = useState('');
  const joinRoom = () => {
    console.log('join link: ', link);
  };
  return (
    <PlanetBackground type="corner">
      <div className="w-full h-full pt-[80px] pb-[40px]">
        {/* Arrow buttons */}
        <button className="fixed right-[20px] bottom-[20px]">To Settings</button>

        {/* Room section */}
        <section className="w-full h-full flex flex-col">
          {/* Join room */}
          <Row><Title text="Join a room" /></Row>
          <Row style="flex gap-[20px] flex-col items-center md:flex-row">
            <>
              <input type="text" placeholder="# Enter your link here"
                className="w-full h-full max-w-[600px] bg-transparent border-b border-gray-500 outline-none text-center py-[5px] md:placeholder:text-center placeholder:text-gray-500 placeholder:zitalic"
                onChange={(e) => setLink(e.target.value)}
              />
              <button className={`font-bold w-[150px] shadow-lg py-[5px] rounded-[24px] border-[3px] border-white transition-all duration-500 ${link.trim() === '' ? 'opacity-0 translate-y-full md:translate-y-0 md:-translate-x-full pointer-events-none' : ''}`} onClick={() => joinRoom()}>Join</button>
            </>
          </Row>


          {/* Create room */}
          <Row style="mt-[60px]" ><Title text="Create new room" /></Row>
          <div className="px-[20px] md:px-[60px] flex-1 w-fit max-w-full flex flex-col flex-wrap gap-[20px] overflow-x-auto snap-x snap-mandatory scrollbar-none">
            {rooms.map((room, index) => (
              <div className="snap-center">
                <RoomCard key={index} text={room.name} />
              </div>
            ))}
          </div>
        </section>

        {/* Settings section */}
        {/*  */}
      </div >
    </PlanetBackground >
  );
}
