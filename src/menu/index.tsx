import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUp } from "../components";
import { RoomsMenu } from "./RoomsMenu";
import { DisplayMenu } from "./DisplayMenu";
import { InfoMenu } from "./InfoMenu";
import { useLocation } from "react-router-dom";
import { Button } from "./SubComponents";

export function Menu() {
  const location = useLocation();
  const [menuList, setMenuList] = useState<string[]>(() => ["Rooms", "Display", "Information"]);
  const [menu, setMenu] = useState(menuList[0]);
  const sectionViewRef = useRef<HTMLDivElement>(null);

  const changeMenu = (toPrev?: boolean) => {
    const index = menuList.indexOf(menu);
    if (toPrev && index > 0) {
      setMenu(menuList[index - 1]);
    }
    if (!toPrev && index < menuList.length - 1) {
      setMenu(menuList[index + 1]);
    }
  };

  useEffect(() => {
    if (sectionViewRef.current) {
      sectionViewRef.current.style.transform = `translateY(calc(-100%*${menuList.indexOf(menu)}))`;
    }
  }, [menu, menuList]);

  useEffect(() => {
    if (location.pathname.includes("chat")) {
      setMenuList(["Information", "Display", "Rooms"]);
    } else {
      setMenuList(["Rooms", "Display", "Information"]);
    }
  }, [location]);

  useEffect(() => {
    setMenu(menuList[0]);
  }, [menuList]);

  return (
    <div className="w-full h-full">
      <div className="w-full h-full overflow-hidden">
        <div ref={sectionViewRef} className={`w-full h-full flex flex-col transition-all duration-500`}>
          <RoomsMenu order={menuList.indexOf("Rooms") + 1} />
          <DisplayMenu order={menuList.indexOf("Display") + 1} />
          <InfoMenu order={menuList.indexOf("Information") + 1} />
        </div>
      </div>

      {/* Control buttons */}
      <div
        className={`fixed left-[20px] bottom-[20px] md:inset-auto md:right-[20px] md:top-[20px] transition-all duration-300 ${
          menuList.indexOf(menu) === 0 ? "opacity-0 translate-y-full md:translate-y-0 md:translate-x-full" : ""
        }`}>
        <Button noOutline style="flex gap-[10px] justify-start md:justify-end items-center" onClick={() => changeMenu(true)}>
          <ArrowUp />
          <span>{menuList[menuList.indexOf(menu) - 1] || menuList[0]}</span>
        </Button>
      </div>

      <div
        className={`fixed right-[20px] bottom-[20px] transition-all duration-300 ${
          menuList.indexOf(menu) === menuList.length - 1 ? "opacity-0 translate-y-full md:translate-y-0 md:translate-x-full" : ""
        }`}>
        <Button noOutline style="flex gap-[10px] justify-end items-center md:justify-start md:flex-row-reverse" onClick={() => changeMenu()}>
          <span>{menuList[menuList.indexOf(menu) + 1] || menuList[menuList.length - 1]}</span>
          <ArrowDown />
        </Button>
      </div>
    </div>
  );
}
