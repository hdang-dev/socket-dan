import { ROOM_LIST } from "./data";
import { ConfirmedInput, RoomCard, Section, SubTitle, SwipeView } from "./SubComponent";

interface RoomsMenuProps {
  order: number;
  onJoinRoom: (link: string) => void;
  onCreateRoom: (name: string) => void;
}

export function RoomsMenu({ order, onJoinRoom, onCreateRoom }: RoomsMenuProps) {
  return (
    <Section order={order}>
      {/* Join room */}
      <SubTitle text="Join A Room" />
      <ConfirmedInput placeholder="# Enter your link here" value="" buttonLabel="Join" onConfirm={(link) => onJoinRoom(link)} />

      {/* Create room */}
      <SubTitle text="Create New Room" />
      <SwipeView>
        {ROOM_LIST.map((room, index) => (
          <div key={index} className="snap-center" onClick={() => onCreateRoom(room.name)}>
            <RoomCard name={room.name} imageUrl={room.imageUrl} />
          </div>
        ))}
      </SwipeView>
    </Section>
  );
}
