import { useNavigate } from "react-router-dom";
import { ROOM_LIST } from "./data";
import { ConfirmedInput, RoomCard, Section, SubTitle, SwipeView } from "./SubComponent";
import { useContext } from "react";
import { AppContext } from "../../context";

interface RoomsMenuProps {
  order: number;
  onJoinRoom: (link: string) => void;
}

export function RoomsMenu({ order, onJoinRoom }: RoomsMenuProps) {
  const navigate = useNavigate();
  const { updateDialogVisible } = useContext(AppContext);
  const createRoom = (name: string) => {
    console.log('to room: ', name);
    switch (name) {
      case 'Chat Room':
        navigate('chat/123321');
        break;
      default:
        navigate('/');
    }
    updateDialogVisible(false);
  };

  return (
    <Section order={order}>
      {/* Join room */}
      <SubTitle text="Join A Room" />
      <ConfirmedInput placeholder="# Enter your link here" value="" buttonLabel="Join" onConfirm={(link) => onJoinRoom(link)} />

      {/* Create room */}
      <SubTitle text="Create New Room" />
      <SwipeView>
        {ROOM_LIST.map((room, index) => (
          <div key={index} className="snap-center" onClick={() => createRoom(room.name)}>
            <RoomCard name={room.name} imageUrl={room.imageUrl} />
          </div>
        ))}
      </SwipeView>
    </Section>
  );
}
