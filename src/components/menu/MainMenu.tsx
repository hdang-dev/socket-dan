import { useContext, useEffect, useRef, useState } from "react";
import { PlanetBackground } from "..";
import { ArrowDown, ArrowUp } from "..";
import { RoomsMenu } from "./RoomsMenu";
import { DisplayMenu } from "./DisplayMenu";
import { InfoMenu } from "./InfoMenu";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../../context";


export function MainMenu() {
  const location = useLocation();
  const navigate = useNavigate();
  const { updateDialogVisible } = useContext(AppContext);
  const [menuList, setMenuList] = useState<string[]>(() => ['Rooms', 'Display', 'Information']);
  const [menu, setMenu] = useState(menuList[0]);
  const sectionViewRef = useRef<HTMLDivElement>(null);

  const changeMenu = (toPrev?: boolean) => {
    const index = menuList.indexOf(menu);
    if (toPrev && index > 0) {
      setMenu(menuList[index - 1]);
    }
    if (!toPrev && index < menuList.length - 1) {
      setMenu(menuList[index + 1]);
    };
  };

  const joinRoom = (link: string) => {
    console.log("join link: ", link);
  };

  const createRoom = (name: string) => {
    console.log('to room: ', name);
    switch (name) {
      case 'Chat Room':
        navigate('chat/123321');
        break;
      default:
        navigate('/');
    }
    updateDialogVisible(false);
  };

  const changeName = (name: string) => {
    console.log("name changing: ", name);
  };

  useEffect(() => {
    if (sectionViewRef.current) {
      sectionViewRef.current.scrollTo({
        top: sectionViewRef.current.clientHeight * menuList.indexOf(menu),
        behavior: "smooth",
      });
    }
  }, [menu, menuList]);

  useEffect(() => {
    if (location.pathname.includes('chat')) {
      setMenuList(['Information', 'Display', 'Rooms']);
    } else {
      setMenuList(['Rooms', 'Display', 'Information']);
    }
  }, [location]);

  useEffect(() => {
    setMenu(menuList[0]);
  }, [menuList]);

  return (
    <PlanetBackground type="corner">
      <div ref={sectionViewRef} className={`w-full h-full overflow-y-hidden flex flex-col transition-all duration-500 scroll-smooth`}>
        {menuList.map((menu, index) => {
          if (menu === 'Rooms') {
            return <RoomsMenu key={index} onJoinRoom={(link) => joinRoom(link)} onCreateRoom={(name) => createRoom(name)} />;
          }
          if (menu === 'Display') {
            return <DisplayMenu key={index} onChangeName={(name) => changeName(name)} />;
          }
          if (menu === 'Information') {
            return <InfoMenu key={index} roomLink="http://socket-dan.com" />;
          }
        })}

        {/* Control buttons */}
        <div className="fixed left-[20px] bottom-[20px] md:inset-auto md:right-[20px] md:top-[20px]">
          <button className={`flex gap-[10px] items-center ${menuList.indexOf(menu) === 0 ? 'opacity-0 pointer-events-none' : ''}`} onClick={() => changeMenu(true)}>
            <ArrowUp /> {menuList[menuList.indexOf(menu) - 1]}
          </button>
        </div>

        <div className="fixed right-[20px] bottom-[20px]">
          <button className={`flex gap-[10px] items-center ${menuList.indexOf(menu) === menuList.length - 1 ? 'opacity-0 pointer-events-none' : ''}`} onClick={() => changeMenu()}>
            <ArrowDown /> {menuList[menuList.indexOf(menu) + 1]}
          </button>
        </div>
      </div>
    </PlanetBackground>
  );
};
