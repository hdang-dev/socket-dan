import { useNavigate } from "react-router-dom";
import { ROOM_LIST } from "./data";
import { ConfirmedInput, RoomCard, Section, SubTitle, SwipeView } from "./SubComponent";
import { useContext } from "react";
import { Context } from "../../store";

interface RoomsMenuProps {
  order: number;
}

export function RoomsMenu({ order }: RoomsMenuProps) {
  const navigate = useNavigate();
  const { dispatch } = useContext(Context);
  const joinRoom = (link: string) => {
    window.location.href = link;
  };
  const createRoom = (name: string) => {
    console.log("to room: ", name);
    switch (name) {
      case "Chat Room":
        navigate("chat/123321");
        break;
      default:
        navigate("/");
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
