import { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../components";
import { MenuSection, ConfirmedInput, Title, CardList } from "./SubComponents";
import { BACKGROUNDS, PLANETS, ROOM_LIST } from "./data";
import { randomId, roomTypeToName } from "../utils";
import { useRoom, useTheme, useUser } from "../store";
// import { StoreContext } from "../store";
// import { socket } from "../socket";

export function Menu() {
  const location = useLocation();
  // const { user } = useUser();
  const user = { id: "111", name: "ahaha" };
  const { room } = useRoom();
  const { theme } = useTheme();
  const navigate = useNavigate();
  // const menuRef = useRef<HTMLDivElement>(null);

  // const swipeLeft = () => {
  //   menuRef.current!.scrollLeft = menuRef.current!.scrollLeft - menuRef.current!.clientWidth;
  // };

  // const swipeRight = () => {
  //   menuRef.current!.scrollLeft = menuRef.current!.scrollLeft + menuRef.current!.clientWidth;
  // };

  const [roomLink, setRoomLink] = useState<string>(window.location.href);
  useEffect(() => {
    setRoomLink(window.location.href);
  }, [location]);

  const changeYourName = (name: string) => {
    // dispatch({ type: "CHANGE_YOUR_NAME", name });
    // if (user.id) {
    // socket.changeYourName(name);
    // }
  };

  const changeBackground = (imageUrl: string) => {
    // dispatch({ type: "CHANGE_BACKGROUND", background: imageUrl });
  };

  const changePlanet = (imageUrl: string, animation: string) => {
    // dispatch({ type: "CHANGE_PLANET", planet: imageUrl, animation });
  };

  const joinRoom = (link: string) => {
    window.location.href = link;
  };

  const createRoom = (roomType: string) => {
    if (roomType === "global" && room?.type === "global") {
      // dispatch({ type: "TOGGLE_MENU" });
      return;
    }

    if (roomType === "global") {
      navigate("/");
      // dispatch({ type: "JOIN_ROOM", roomType, roomId: "global" });
    } else {
      const roomId = randomId(10);
      navigate(`${roomType}/${roomId}`);
      // dispatch({ type: "JOIN_ROOM", roomType, roomId });
    }
    // dispatch({ type: "TOGGLE_MENU" });
  };

  return (
    <div className="w-full h-full overflow-y-scroll">
      <div className="flex flex-col items-center py-[50px] md:py-[80px] max-w-[1000px] mx-auto">
        <div className="w-full flex items-center gap-3">
          <span className="font-bold md:text-lg">Your Name</span>
          <input type="text" placeholder="# Enter name" className="border-b-[0.5px] flex-1 bg-transparent outline-none px-5 text-center placeholder:text-center" />
          <button className="min-w-[100px] px-2.5 py-1 rounded-xl border border-white bg-[rgba(0,0,0,.2)] hover:font-bold active:scale-105">Save</button>
        </div>

        <Space />

        <div className="w-full flex items-center gap-3">
          <span className="font-bold md:text-lg">Invite Friend</span>
          <span className="flex-1 px-5 text-center">{roomLink}</span>
          <button className="min-w-[100px] px-2.5 py-1 rounded-xl border border-white bg-[rgba(0,0,0,.2)] hover:border-2">Copy</button>
        </div>

        <Space />

        <div className="w-full flex items-center gap-3">
          <span className="font-bold md:text-lg">Join Room</span>
          <input type="text" placeholder="# Enter " className="border-b-[0.5px] flex-1 bg-transparent outline-none px-5 text-center placeholder:text-center" />
          <button className="min-w-[100px] px-2.5 py-1 rounded-xl border border-white bg-[rgba(0,0,0,.2)] hover:font-bold active:scale-105">Join</button>
        </div>

        <Space />

        <span className="font-bold md:text-lg text-center w-full mb-3">Create Room</span>
        <ScrollableView>
          {ROOM_LIST.map((room, index) => (
            <Card key={index} imageUrl={room.imageUrl} onClick={() => createRoom(room.type)}>
              {roomTypeToName(room.type)}
            </Card>
          ))}
        </ScrollableView>


        <Space />

        <span className="font-bold md:text-lg text-center w-full mb-3">Create Room</span>
        <ScrollableView>
          {BACKGROUNDS.map(({ name, imageUrl }, index) => (
            <Card key={index} imageUrl={imageUrl} onClick={() => changeBackground(imageUrl)}>
              {name}
            </Card>
          ))}
        </ScrollableView>

        <Space />

        <span className="font-bold md:text-lg text-center w-full mb-3">Create Room</span>
        <ScrollableView>
          {PLANETS.map(({ imageUrl, animation }, index) => (
            <Card key={index} imageUrl={theme.background} onClick={() => changePlanet(imageUrl, animation)}>
              <div style={{ backgroundImage: `url(${imageUrl})` }} className="w-full h-full bg-center bg-contain bg-no-repeat"></div>
            </Card>
          ))}
        </ScrollableView>
      </div>
    </div>
  );
}

const ScrollableView = ({ children }: { children: React.ReactNode; }) => {
  return (
    <div className="w-screen overflow-x-scroll scrollbar-none">
      <div className="flex w-max gap-4 px-12">
        {children}
      </div>
    </div>
  );
};

const Card = ({ children, imageUrl, style, onClick }: { children: React.ReactNode; imageUrl: string; style?: string; onClick?: () => void; }) => {
  return (
    <div className={`cursor-pointer snap-end min-w-[320px] aspect-[5/3] overflow-hidden rounded-[24px] border-[3px] border-white shadow-lg animate-[animateCard] animate-fill-both [animation-timeline:view()] ${style ?? ''}`} onClick={onClick}>
      <div
        style={{ backgroundImage: `url(${imageUrl})` }}
        className={`w-full h-full bg-center bg-cover transition-all duration-300 hover:scale-110 active:scale-110 text-white active:text-[var(--bg-color)] grid place-items-center p-[20px]`}>
        {children}
      </div>
    </div>
  );
};

const Space = () => {
  return (
    <div className="mt-16"></div>
  );
};
