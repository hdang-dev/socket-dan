import { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../components";
import { MenuSection, ConfirmedInput, Title, CardList, Card } from "./SubComponents";
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
      <div className="flex flex-col items-center pt-[50px] md:pt-[80px] gap-5">
        <div className="flex flex-col md:flex-row w-full max-w-[600px]">
          <span className="font-bold text-center md:text-lg">Your Name</span>
          <div className="flex-1 border-b-[1px]"></div>
          <input type="text" placeholder="# Enter your name" className="bg-transparent outline-none w-f text-center" />
        </div>
        <div className="flex flex-col md:flex-row w-full max-w-[600px]">
          <span className="font-bold text-center md:text-lg">Your Name</span>
          <input type="text" placeholder="# Enter your name" className="flex-1 bg-transparent outline-none border-b-2 pl-6 text-end placeholder:text-end" />
        </div>
      </div>
    </div>
  );
}
