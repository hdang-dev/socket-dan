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
      <div className="flex flex-col items-center pt-[50px] md:pt-[80px] gap-12">
        {/*  */}
        <div className="w-full max-w-[800px] flex items-center gap-3">
          <span className="font-bold text-center md:text-lg text-[var(--primary)]">Your Name</span>
          <input type="text" placeholder="# Enter name" className="focus:border-b-[0.5px] flex-1 bg-transparent outline-none px-5 text-center placeholder:text-center" />
          <button className="min-w-[100px] px-2.5 py-1 rounded-xl border border-white bg-[rgba(0,0,0,.2)] hover:font-bold active:scale-105">Save</button>
        </div>
        {/*  */}
        <div className="w-full max-w-[800px] flex items-center gap-3">
          <span className="font-bold text-center md:text-lg text-[var(--primary)]">Invite Friend</span>
          <span className="focus:border-b-[0.5px] flex-1 px-5 text-center">{roomLink}</span>
          <button className="min-w-[100px] px-2.5 py-1 rounded-xl border border-white bg-[rgba(0,0,0,.2)] hover:border-2">Copy</button>
        </div>
        {/*  */}
        <div className="w-full max-w-[800px] flex items-center gap-3">
          <span className="font-bold text-center md:text-lg text-[var(--primary)]">Join Room</span>
          <input type="text" placeholder="# Enter " className="focus:border-b-[0.5px] flex-1 bg-transparent outline-none px-5 text-center placeholder:text-center" />
          <button className="min-w-[100px] px-2.5 py-1 rounded-xl border border-white bg-[rgba(0,0,0,.2)] hover:font-bold active:scale-105">Join</button>
        </div>
        {/*  */}
        <div className="w-full flex flex-col items-center">
          <div className="w-full max-w-[800px]">
            <span className="font-bold text-center md:text-lg text-[var(--primary)]">Create Room</span>
          </div>
          <div className="w-full overflow-x-scrol ">
            <div className="flex w-max gap-3 px-14">
              {ROOM_LIST.map((room, index) => (
                <Card key={index} imageUrl={room.imageUrl} onClick={() => createRoom(room.type)}>
                  {roomTypeToName(room.type)}
                </Card>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

const Card = ({ children, imageUrl, style, onClick }: { children: React.ReactNode; imageUrl: string; style?: string; onClick?: () => void; }) => {
  return (
    <div className={`cursor-pointer snap-end min-w-[280px] aspect-[5/3] overflow-hidden rounded-[24px] border-[3px] border-white shadow-lg animate-[animateCard] animate-fill-both [animation-timeline:view()] ${style ?? ''}`} onClick={onClick}>
      <div
        style={{ backgroundImage: `url(${imageUrl})` }}
        className={`w-full h-full bg-center bg-cover transition-all duration-300 hover:scale-110 active:scale-110 text-white active:text-[var(--bg-color)] grid place-items-center p-[20px]`}>
        {children}
      </div>
    </div>
  );
};
