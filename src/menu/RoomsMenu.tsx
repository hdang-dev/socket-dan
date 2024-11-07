import { useNavigate } from "react-router-dom";
import { ROOM_LIST } from "./data";
import { ConfirmedInput, Section, SubTitle, SwipeView } from "./SubComponents";
import { useContext } from "react";
import { Context } from "../context";
import { generateRoomId, roomTypeToName } from "../utils";
import { Card } from "../components";

interface RoomsMenuProps {
  order: number;
}

export function RoomsMenu({ order }: RoomsMenuProps) {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Context);
  const { room } = state;

  const joinRoom = (link: string) => {
    window.location.href = link;
  };

  const createRoom = (roomType: string) => {
    if (roomType === 'global' && room?.type === 'global') {
      dispatch({ type: "TOGGLE_MENU" });
      return;
    }

    if (roomType === 'global') {
      navigate('/');
      dispatch({ type: 'JOIN_ROOM', roomType, roomId: 'global' });
    } else {
      const roomId = generateRoomId();
      navigate(`${roomType}/${roomId}`);
      dispatch({ type: 'JOIN_ROOM', roomType, roomId });
    }
    dispatch({ type: "TOGGLE_MENU" });
  };

  return (
    <Section order={order}>
      {/* Join room */}
      <SubTitle text="Join A Room" />
      <ConfirmedInput placeholder="# Enter your link here" value="" buttonLabel="Join" onConfirm={(link) => joinRoom(link)} />

      {/* Create room */}
      <SubTitle text="Create New Room" />
      <SwipeView style="flex-1">
        {ROOM_LIST.map((room, index) => (
          <Card key={index} imageUrl={room.imageUrl} onClick={() => createRoom(room.type)}>{roomTypeToName(room.type)}</Card>
        ))}
      </SwipeView>
    </Section>
  );
}
