import { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../components";
import { MenuSection, ConfirmedInput, Title, CardList, Card } from "./SubComponents";
import { BACKGROUNDS, PLANETS, ROOM_LIST } from "./data";
import { randomId, roomTypeToName } from "../utils";
import { StoreContext } from "../store";
// import { socket } from "../socket";

export function Menu() {
  const location = useLocation();
  const { state, dispatch } = useContext(StoreContext);
  const { room, theme } = state;
  const user = { id: '11', name: 'aha' };
  const navigate = useNavigate();

  const menuRef = useRef<HTMLDivElement>(null);
  const [menuOffset, setMenuOffset] = useState(0);

  const swipeLeft = () => {
    menuRef.current!.scrollLeft = menuRef.current!.scrollLeft - menuRef.current!.clientWidth;
  };

  const swipeRight = () => {
    menuRef.current!.scrollLeft = menuRef.current!.scrollLeft + menuRef.current!.clientWidth;
  };

  const handleScroll = () => {
    setMenuOffset(menuRef.current!.scrollLeft);
  };

  const [roomLink, setRoomLink] = useState<string>(window.location.href);
  useEffect(() => {
    setRoomLink(window.location.href);
  }, [location]);

  const changeYourName = (name: string) => {
    // dispatch({ type: "CHANGE_YOUR_NAME", name });
    // if (user!.id) {
    //   socket.changeYourName(name);
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
    // if (roomType === "global" && room?.type === "global") {
    //   dispatch({ type: "TOGGLE_MENU" });
    //   return;
    // }

    // if (roomType === "global") {
    //   navigate("/");
    //   dispatch({ type: "JOIN_ROOM", roomType, roomId: "global" });
    // } else {
    //   const roomId = randomId(10);
    //   navigate(`${roomType}/${roomId}`);
    //   dispatch({ type: "JOIN_ROOM", roomType, roomId });
    // }
    // dispatch({ type: "TOGGLE_MENU" });
  };



  return (
    <>
      <div ref={menuRef} onScroll={() => handleScroll()} className="w-full h-full overflow-scroll snap-x snap-mandatory scrollbar-none scroll-smooth">
        <div className="w-full h-full flex">
          {/* Information */}
          <MenuSection>
            <>
              <Title text="Change Your Name" />
              <ConfirmedInput key={user!.name} placeholder="# Enter your name" value={user!.name} buttonLabel="Save" checkDifferent onConfirm={(name) => changeYourName(name)} />
            </>

            {room && (
              <>
                <Title text="Share Your Room" />
                <div className="flex flex-col items-center gap-[15px]">
                  <span className="text-center w-full truncate">{roomLink}</span>
                  <Button onClick={() => { }}>Copy</Button>
                </div>

                <Title text="All Members" />
                <div className="flex flex-wrap justify-center gap-[20px] pb-[40px]">
                  {room.users.map((user, index) => (
                    <Button key={index} style="pointer-events-none w-[250px] whitespace-nowrap overflow-hidden text-ellipsis">
                      {user.id === user!.id ? "You" : user.name}
                    </Button>
                  ))}
                </div>
              </>
            )}
          </MenuSection>

          {/* Options */}
          <MenuSection>
            <Title text="Join A Room" />
            <ConfirmedInput placeholder="# Enter your link here" value="" buttonLabel="Join" onConfirm={(link) => joinRoom(link)} />

            <Title text="Create New Room" style="mb-[30px]" />
            <CardList>
              {ROOM_LIST.map((room, index) => (
                <Card key={index} imageUrl={room.imageUrl} onClick={() => createRoom(room.type)}>
                  {roomTypeToName(room.type)}
                </Card>
              ))}
            </CardList>
          </MenuSection>

          {/* Background */}
          <MenuSection>
            <Title text="Change Background" style="mb-[30px]" />
            <CardList>
              {BACKGROUNDS.map(({ name, imageUrl }, index) => (
                <Card key={index} imageUrl={imageUrl} onClick={() => changeBackground(imageUrl)}>
                  {name}
                </Card>
              ))}
            </CardList>
          </MenuSection>

          {/* Planet */}
          <MenuSection>
            <Title text="Change Planet" style="mb-[30px]" />
            <CardList>
              {PLANETS.map(({ imageUrl, animation }, index) => (
                <Card key={index} imageUrl={theme.background} onClick={() => changePlanet(imageUrl, animation)}>
                  <div style={{ backgroundImage: `url(${imageUrl})` }} className="w-full h-full bg-center bg-contain bg-no-repeat"></div>
                </Card>
              ))}
            </CardList>
          </MenuSection>
        </div>
      </div>

      {/* Arrow Buttons */}
      {menuRef.current && (<>
        <div className={`absolute top-4 left-5 p-2 md:top-1/2 md:-translate-y-1/2 cursor-pointer transition-all duration-100  ${menuOffset < menuRef.current.clientWidth ? 'hidden' : ''}`} onClick={() => swipeLeft()}>
          <div className="w-5 md:w-8 aspect-square border-l-4 border-t-4 border-white rounded-tl-md -rotate-45"></div>
        </div>
        <div className={`absolute top-4 right-5 p-2 md:top-1/2 md:-translate-y-1/2 cursor-pointer transition-all duration-100 ${menuOffset > menuRef.current.scrollWidth - menuRef.current.clientWidth * 2 ? 'hidden' : ''}`} onClick={() => swipeRight()}>
          <div className="w-5 md:w-8 aspect-square border-l-4 border-t-4 border-white rounded-tl-md rotate-[135deg]"></div>
        </div>
      </>)}
    </>
  );
}