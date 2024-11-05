import { useContext, useEffect, useState } from "react";
import { Button, Section, SubTitle, SwipeView } from "./SubComponents";
import { Context } from "../context";
import { useLocation } from "react-router-dom";

interface InfoMenuProps {
  order: number;
}

export function InfoMenu({ order }: InfoMenuProps) {
  const location = useLocation();
  const [roomLink, setRoomLink] = useState<string>(window.location.href);
  const { state } = useContext(Context);
  const { you, room } = state;

  const copyLink = () => {
    navigator.clipboard.writeText(roomLink);
  };

  useEffect(() => {
    setRoomLink(window.location.href);
  }, [location]);

  return (
    <Section order={order}>
      <SubTitle text="Room Link" />
      <div className="flex gap-[10px] md:gap-[20px] flex-col md:flex-row items-center">
        <span className="text-center md:text-start italic py-[5px] min-w-[300px] max-w-full whitespace-nowrap overflow-scroll scrollbar-none">{roomLink}</span>
        <Button onClick={() => copyLink()}>Copy</Button>
      </div>

      <SubTitle text="Members" />
      <SwipeView style="max-h-[350px]">
        {room!.users.map((user, index) => (
          <Button key={index} isText style="w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
            {user.id === you!.id ? `You(${user.name})` : user.name}
          </Button>
        ))}
      </SwipeView>
    </Section>
  );
}
