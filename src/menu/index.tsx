import { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../components";
import { MenuSection, ConfirmedInput, Title, CardList, Card } from "./SubComponents";
import { BACKGROUNDS, PLANETS, ROOM_LIST } from "./data";
import { randomId, roomTypeToName } from "../utils";
import { Context } from "../context";
import { socket } from "../socket";
import { User } from "../interfaces";

export function Menu() {
  const location = useLocation();
  const { state, dispatch } = useContext(Context);
  const { you, room, theme } = state;
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);
  const [users, setUsers] = useState<User[]>([]);

  const swipeLeft = () => {
    menuRef.current!.scrollLeft = menuRef.current!.scrollLeft - menuRef.current!.clientWidth;
  };

  const swipeRight = () => {
    menuRef.current!.scrollLeft = menuRef.current!.scrollLeft + menuRef.current!.clientWidth;
  };

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
    if (roomType === "global" && room?.type === "global") {
      dispatch({ type: "TOGGLE_MENU" });
      return;
    }

    if (roomType === "global") {
      navigate("/");
      dispatch({ type: "JOIN_ROOM", roomType, roomId: "global" });
    } else {
      const roomId = randomId(10);
      navigate(`${roomType}/${roomId}`);
      dispatch({ type: "JOIN_ROOM", roomType, roomId });
    }
    dispatch({ type: "TOGGLE_MENU" });
  };

  useEffect(() => {
    socket.onAddUser((user) => {
      setUsers((prev) => [...prev, user]);
    });
    socket.onRemoveUser((userId) => {
      setUsers((prev) => {
        const index = prev.findIndex((user) => user.id === userId);
        return [...prev.slice(0, index), ...prev.slice(index + 1)];
      });
    });
  }, []);

  useEffect(() => {
    if (room === null) {
      setUsers([]);
    }
  }, [room]);

  return (
    <>
      <div ref={menuRef} className="w-full h-full overflow-scroll snap-x snap-mandatory scrollbar-none scroll-smooth">
        <div className="w-full h-full flex">
          {/* Information */}
          <MenuSection>
            {you && (
              <>
                <Title text="Change Your Name" />
                <ConfirmedInput key={you!.name} placeholder="# Enter your name" value={you!.name} buttonLabel="Save" checkDifferent onConfirm={(name) => changeName(name)} />
              </>
            )}

            {room && (
              <>
                <Title text="Share Your Room" />
                <div className="flex flex-col items-center gap-[15px]">
                  <span className="text-center w-full truncate">{roomLink}</span>
                  <Button onClick={() => {}}>Copy</Button>
                </div>

                <Title text="All Members" />
                <div className="flex flex-wrap justify-center gap-[20px] pb-[40px]">
                  {users.map((user, index) => (
                    <Button key={index} style="pointer-events-none w-[250px] whitespace-nowrap overflow-hidden text-ellipsis">
                      {user.id === you!.id ? `You (${user.name})` : user.name}
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

      {/* Control Buttons */}
      <div className="fixed hidden md:block top-0 left-0 h-full w-[30px]" onMouseEnter={() => swipeLeft()}></div>
      <div className="fixed hidden md:block top-0 right-0 h-full w-[30px]" onMouseEnter={() => swipeRight()}></div>
    </>
  );
}
