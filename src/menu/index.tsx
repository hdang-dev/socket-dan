
import { useContext, useEffect, useState } from "react";
import { ArrowUp, Button, Card } from "../components";
import { useLocation, useNavigate } from "react-router-dom";
import { MenuSection, ConfirmedInput, Title } from "./SubComponents";
import { BACKGROUNDS, PLANETS, ROOM_LIST } from "./data";
import { generateRoomId, roomTypeToName } from "../utils";
import { Context } from "../context";
import { socketService as socket } from "../socket";

export function Menu() {
  const location = useLocation();
  const menuList = ["Information", "Options", "Background", 'Planet'];
  const [menu, setMenu] = useState(menuList[0]);
  const { state, dispatch } = useContext(Context);
  const { you, room, theme } = state;
  const navigate = useNavigate();

  const [roomLink, setRoomLink] = useState<string>(window.location.href);
  useEffect(() => {
    setRoomLink(window.location.href);
  }, [location]);

  const changeName = (name: string) => {
    dispatch({ type: "CHANGE_NAME", user: { ...you!, name } });
    socket.sendData(room!.id, "change-name", { ...you!, name });
  };

  const changeBackground = (imageUrl: string) => {
    dispatch({ type: "CHANGE_BACKGROUND", background: imageUrl });
  };

  const changePlanet = (imageUrl: string, animation: string) => {
    dispatch({ type: "CHANGE_PLANET", planet: imageUrl, animation });
  };

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
    <>
      <div className="w-full h-full overflow-hidden">
        <div style={{ transform: `translateX(${-100 * menuList.indexOf(menu)}%)` }} className="w-full h-full flex transition-all duration-500">

          {/* Information */}
          <MenuSection>
            <Title text="Change Your Name" />
            <ConfirmedInput key={you!.name} placeholder="# Enter your name" value={you!.name} buttonLabel="Save" checkDifferent onConfirm={(name) => changeName(name)} />

            <Title text="Share Your Room" style="mt-[40px]" />
            <div className="flex flex-col items-center gap-[20px]">
              <p className="text-center w-full truncate">{roomLink} kjajsjh kuah ku hk</p>
              <Button onClick={() => { }}>Copy</Button>
            </div>

            <Title text="All Members" style="mt-[40px]" />
            <div className="flex flex-wrap justify-center gap-[20px] pb-[40px]">
              {[...room!.users, ...room!.users, ...room!.users, ...room!.users, ...room!.users, ...room!.users, ...room!.users, ...room!.users, ...room!.users, ...room!.users, ...room!.users, ...room!.users, ...room!.users, ...room!.users, ...room!.users, ...room!.users, ...room!.users, ...room!.users, ...room!.users].map((user, index) => (
                <Button key={index} style="pointer-events-none w-[250px] whitespace-nowrap overflow-hidden text-ellipsis">{user.id === you!.id ? `You (${user.name})` : user.name}</Button>
              ))}
            </div>
          </MenuSection>

          {/* Options */}
          <MenuSection >
            <Title text="Join A Room" />
            <ConfirmedInput placeholder="# Enter your link here" value="" buttonLabel="Join" onConfirm={(link) => joinRoom(link)} />

            <Title text="Create New Room" style="mt-[40px]" />
            <div className="flex flex-wrap justify-center gap-[20px] pb-[40px] zmd:justify-start">
              {ROOM_LIST.map((room, index) => (
                <Card key={index} imageUrl={room.imageUrl} onClick={() => createRoom(room.type)}>
                  {roomTypeToName(room.type)}
                </Card>
              ))}
            </div>
          </MenuSection>

          {/* Background */}
          <MenuSection>
            <Title text="Change Background" />
            <div className="flex flex-wrap justify-center gap-[20px] pb-[40px] zmd:justify-start">
              {BACKGROUNDS.map(({ name, imageUrl }, index) => (
                <Card key={index} style="animate-scale " imageUrl={imageUrl} onClick={() => changeBackground(imageUrl)}>
                  {name}
                </Card>
              ))}
            </div>
          </MenuSection>

          {/* Planet */}
          <MenuSection>
            <Title text="Change Planet" />
            <div className="flex flex-wrap justify-center gap-[20px] pb-[40px] zmd:justify-start">
              {PLANETS.map(({ imageUrl, animation }, index) => (
                <Card key={index} style="animate-scale" imageUrl={theme.background} onClick={() => changePlanet(imageUrl, animation)}>
                  <div style={{ backgroundImage: `url(${imageUrl})` }} className="w-full h-full bg-center bg-contain bg-no-repeat"></div>
                </Card>
              ))}
            </div>
          </MenuSection>
        </div >
      </div >

      {/* Control Buttons */}


      <button className={`fixed top-0 left-0 p-[20px] transition-all duration-500 md:h-full ${menuList.indexOf(menu) === 0 ? '-translate-x-full' : ''}`} onClick={() => setMenu(menuList[menuList.indexOf(menu) - 1])}>
        <div className="-rotate-90">
          <ArrowUp />
        </div>
      </button>
      <button className={`fixed top-0 right-0 p-[20px] transition-all duration-500 md:h-full ${menuList.indexOf(menu) === menuList.length - 1 ? 'translate-x-full' : ''}`} onClick={() => setMenu(menuList[menuList.indexOf(menu) + 1])}>
        <div className="rotate-90">
          <ArrowUp />
        </div>
      </button>
      {/* <div
        className={`fixed left-[10px] top-0 md:inset-auto md:right-[20px] md:top-[20px] transition-all duration-300 ${menuList.indexOf(menu) === 0 ? "opacity-0 translate-y-full md:translate-y-0 md:translate-x-full" : ""
          }`}>
        <Button style="flex gap-[5px] justify-start md:justify-end items-center" onClick={() => setMenu(menuList[menuList.indexOf(menu) - 1])}>
          {menuList[menuList.indexOf(menu) - 1] || menuList[0]}
        </Button>
      </div>

      <div
        className={`fixed right-[10px] top-0 transition-all duration-300 ${menuList.indexOf(menu) === menuList.length - 1 ? "opacity-0 translate-y-full md:translate-y-0 md:translate-x-full" : ""
          }`}>
        <Button style="flex gap-[5px] justify-end items-center md:justify-start md:flex-row-reverse" onClick={() => setMenu(menuList[menuList.indexOf(menu) + 1])}>
          {menuList[menuList.indexOf(menu) + 1] || menuList[menuList.length - 1]}

        </Button>
      </div> */}
    </>
  );
}

