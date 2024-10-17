import { MenuBackground } from "../backgrounds";

interface MenuProps {
  transitionDuration: number;
}

export function Menu({ transitionDuration }: MenuProps) {
  return (
    <MenuBackground transitionDuration={transitionDuration}>
      <div className="w-full h-full grid place-items-center">
        <div className="bg-white w-[100px] h-[100px]" onClick={(e) => e.stopPropagation()}>
          Hehe
        </div>
      </div>
    </MenuBackground>
  );
}
