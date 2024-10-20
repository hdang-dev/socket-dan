import { ROOM_LIST } from "./data";
import { ConfirmedInput, RoomCard, Section, SubTitle } from "./SubComponent";

interface RoomMenuProps {
  id: string;
  onJoinRoom: (link: string) => void;
  onCreateRoom: (name: string) => void;
}

export function RoomMenu({ id, onJoinRoom, onCreateRoom }: RoomMenuProps) {
  return (
    <Section id={id} title="Rooms">
      <>
        {/* Join room */}
        <SubTitle text="Join a room" />
        <ConfirmedInput placeholder="# Enter your link here" value="" buttonLabel="Join" onConfirm={(link) => onJoinRoom(link)} />

        {/* Create room */}
        <SubTitle text="Create new room" />
        <div className="flex-1 w-screen overflow-x-auto snap-x snap-mandatory scrollbar-none ml-[-20px] md:ml-[-60px] px-[20px] md:px-[60px]">
          <div className="h-full min-w-max flex flex-col flex-wrap gap-[20px] ">
            {ROOM_LIST.map((room, index) => (
              <div className="snap-center" onClick={() => onCreateRoom(room.name)}>
                <RoomCard key={index} name={room.name} imageUrl={room.imageUrl} />
              </div>
            ))}
          </div>
        </div>
      </>
    </Section>
  );
}
