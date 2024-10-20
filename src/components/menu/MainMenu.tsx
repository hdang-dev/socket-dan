import { useEffect, useRef, useState } from "react";
import { PlanetBackground } from "..";
import { ArrowDown, ArrowUp } from "..";
import { RoomMenu } from "./RoomMenu";
import { DisplayMenu } from "./DisplayMenu";
import { InfoMenu } from "./InfoMenu";

export function MainMenu() {
  const joinRoom = (link: string) => {
    console.log("join link: ", link);
  };
  const changeName = (name: string) => {
    console.log("name changing: ", name);
  };
  const sectionViewRef = useRef<HTMLDivElement>(null);

  const [section, setSection] = useState(1);

  const slideMenu = (newSection: number) => {
    if (sectionViewRef.current) {
      setSection(newSection);
      sectionViewRef.current.scrollTo({
        top: sectionViewRef.current.clientHeight * newSection,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {}, [section]);

  return (
    <PlanetBackground type="corner">
      <div ref={sectionViewRef} className={`w-full h-full overflow-y-hidden flex flex-col transition-all duration-500 scroll-smooth`}>
        <RoomMenu id="new-room-menu" onJoinRoom={(link) => joinRoom(link)} onCreateRoom={() => {}} />
        <DisplayMenu id="display-menu" onChangeName={(name) => changeName(name)} />
        <InfoMenu id="info-menu" roomLink="http://socket-dan.com" />

        {/* Arrow buttons */}
        <a href="#new-room-menu" className="fixed left-[20px] bottom-[20px] flex items-center gap-[10px] transition-all duration-100 active:text-[var(--secondary)]" onClick={() => {}}>
          <ArrowUp />
          <span className="font-bold text-xl">New Room</span>
        </a>
        <a href="#display-menu" className="fixed left-1/2 bottom-[20px] flex items-center gap-[10px] transition-all duration-100 active:text-[var(--secondary)]" onClick={() => {}}>
          <ArrowUp />
          <span className="font-bold text-xl">Display</span>
        </a>
        <a href="#info-menu" className="fixed right-[20px] bottom-[20px] flex items-center gap-[10px] transition-all duration-100 active:text-[var(--secondary)]" onClick={() => {}}>
          <ArrowUp />
          <span className="font-bold text-xl">Information</span>
        </a>
      </div>
    </PlanetBackground>
  );
}
