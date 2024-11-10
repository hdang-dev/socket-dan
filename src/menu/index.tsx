import { useContext, useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUp, Card } from "../components";
import { RoomMenu } from "./RoomMenu";
import { DisplayMenu } from "./DisplayMenu";
import { InfoMenu } from "./InfoMenu";
import { useLocation } from "react-router-dom";
import { Button, ConfirmedInput, SubTitle, SwipeView } from "./SubComponents";
import { BACKGROUNDS, PLANETS, ROOM_LIST } from "./data";
import { roomTypeToName } from "../utils";
import { Context } from "../context";
import { socketService as socket } from "../socket";

export function Menu() {
  const location = useLocation();
  const menuList = ["room", "theme", "options"];
  const [menu, setMenu] = useState("room");
  const sectionViewRef = useRef<HTMLDivElement>(null);
  const { state, dispatch } = useContext(Context);
  const { you, room, theme } = state;

  const [roomLink, setRoomLink] = useState<string>(window.location.href);
  useEffect(() => {
    setRoomLink(window.location.href);
  }, [location]);

  const changeName = (name: string) => {
    dispatch({ type: "CHANGE_NAME", user: { ...you!, name } });
    socket.sendData(room!.id, "change-name", { ...you!, name });
  };

  const changeMenu = (toPrev?: boolean) => {
    const index = menuList.indexOf(menu);
    if (toPrev && index > 0) {
      // setMenu(menuList[index - 1]);
    }
    if (!toPrev && index < menuList.length - 1) {
      // setMenu(menuList[index + 1]);
    }
  };

  const changeBackground = (imageUrl: string) => {
    dispatch({ type: "CHANGE_BACKGROUND", background: imageUrl });
  };

  const changePlanet = (imageUrl: string, animation: string) => {
    dispatch({ type: "CHANGE_PLANET", planet: imageUrl, animation });
  };

  return (
    <div className="flex w-full h-full flex-col">
      <div className="carousel w-full flex-1">
        <div className="carousel-item w-full flex flex-col">
          {/* <SubTitle text="Your Name" />
          <ConfirmedInput key={you!.name} placeholder="# Enter your name" value={you!.name} buttonLabel="Save" checkDifferent onConfirm={(name) => changeName(name)} /> */}

          <SubTitle text="Room Link" />
          <div className="flex flex-col gap-[20px] items-center md:gap-[20px] md:flex-row">
            <span className="text-center italic shadow-white drop-shadow-xl w-full whitespace-nowrap overflow-scroll scrollbar-none">{roomLink}</span>
            <button className="min-w-[100px] py-[5px] shadow-inner shadow-white rounded-lg" onClick={() => {}}>
              Copy
            </button>
          </div>

          <SubTitle text="Members" style="mt-[50px]" />
          <div className="w-full flex-1 overflow-scroll scrollbar-none">
            <div className="w-full flex flex-wrap justify-center">
              {room!.users.map((user, index) => (
                <div key={index} className="w-[250px] p-[5px] text-center overflow-hidden text-ellipsis whitespace-nowrap">
                  {user.id === you!.id ? `You (${user.name})` : user.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="carousel-item w-full flex flex-col">
          <SubTitle text="Background" />
          <div className="w-full flex-1 overflow-scroll scrollbar-none">
            <div className="w-full flex flex-wrap justify-center gap-[20px] py-[30px] ">
              {BACKGROUNDS.map(({ name, imageUrl }, index) => (
                <Card key={index} imageUrl={imageUrl} onClick={() => changeBackground(imageUrl)}>
                  {name}
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="carousel-item w-full flex flex-col relative">
          {/* <SubTitle style="absolute" text="Planet" /> */}
          <div className="w-full flex-1 overflow-scroll scrollbar-none">
            <div className="w-full flex flex-wrap justify-center gap-[30px] py-[100px] snap-y snap-mandatory">
              {PLANETS.map(({ imageUrl, animation }, index) => (
                <Card key={index} style="auto-blur" imageUrl={theme.background} onClick={() => changePlanet(imageUrl, animation)}>
                  <div style={{ backgroundImage: `url(${imageUrl})` }} className="w-full h-full bg-center bg-contain bg-no-repeat"></div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="carousel-item w-full flex flex-col">
          {/* Join room */}
          <SubTitle text="Join A Room" />
          <ConfirmedInput placeholder="# Enter your link here" value="" buttonLabel="Join" onConfirm={(link) => joinRoom(link)} />

          {/* Create room */}
          <SubTitle text="Create New Room" />
          <SwipeView style="flex-1">
            {ROOM_LIST.map((room, index) => (
              <Card key={index} imageUrl={room.imageUrl} onClick={() => {}}>
                {roomTypeToName(room.type)}
              </Card>
            ))}
          </SwipeView>
        </div>
      </div>

      <div
        className={`fixed left-[20px] bottom-[20px] md:inset-auto md:right-[20px] md:top-[20px] transition-all duration-300 ${
          menuList.indexOf(menu) === 0 ? "opacity-0 translate-y-full md:translate-y-0 md:translate-x-full" : ""
        }`}>
        <Button noOutline style="flex gap-[5px] justify-start md:justify-end items-center" onClick={() => setMenu(menuList[menuList.indexOf(menu) - 1])}>
          <ArrowUp />
          <span>{menuList[menuList.indexOf(menu) - 1] || menuList[0]}</span>
        </Button>
      </div>

      <div
        className={`fixed right-[20px] bottom-[20px] transition-all duration-300 ${
          menuList.indexOf(menu) === menuList.length - 1 ? "opacity-0 translate-y-full md:translate-y-0 md:translate-x-full" : ""
        }`}>
        <Button noOutline style="flex gap-[5px] justify-end items-center md:justify-start md:flex-row-reverse" onClick={() => setMenu(menuList[menuList.indexOf(menu) + 1])}>
          <span>{menuList[menuList.indexOf(menu) + 1] || menuList[menuList.length - 1]}</span>
          <ArrowDown />
        </Button>
      </div>
    </div>
  );
}

{
  /* <div
        className={`fixed left-[20px] bottom-[20px] md:inset-auto md:right-[20px] md:top-[20px] transition-all duration-300 ${
          menuList.indexOf(menu) === 0 ? "opacity-0 translate-y-full md:translate-y-0 md:translate-x-full" : ""
        }`}>
        <Button noOutline style="flex gap-[5px] justify-start md:justify-end items-center" onClick={() => changeMenu(true)}>
          <ArrowUp />
          <span>{menuList[menuList.indexOf(menu) - 1] || menuList[0]}</span>
        </Button>
      </div>

      <div
        className={`fixed right-[20px] bottom-[20px] transition-all duration-300 ${
          menuList.indexOf(menu) === menuList.length - 1 ? "opacity-0 translate-y-full md:translate-y-0 md:translate-x-full" : ""
        }`}>
        <Button noOutline style="flex gap-[5px] justify-end items-center md:justify-start md:flex-row-reverse" onClick={() => changeMenu()}>
          <span>{menuList[menuList.indexOf(menu) + 1] || menuList[menuList.length - 1]}</span>
          <ArrowDown />
        </Button>
      </div> */
  <div style={{ transform: "translateX(-0%)" }} className="hidden border-[3px] h-full flex-1 flex items-stretch transition-all duration-500">
    <div className="w-[100%] bg-black"></div>
    <div className="min-w-full"></div>
    {/* <div className="w-screen h-full bg-blue-100"></div> */}
    {/* <div className="w-screen bg-green-100"></div> */}
    {/* <RoomsMenu order={menuList.indexOf("Rooms") + 1} />
      <DisplayMenu order={menuList.indexOf("Display") + 1} />
      <InfoMenu order={menuList.indexOf("Information") + 1} /> */}
  </div>;
}
