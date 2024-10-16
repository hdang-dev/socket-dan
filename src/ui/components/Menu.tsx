import { MenuBackground } from "../backgrounds";

export function Menu() {
  return (
    <MenuBackground>
      <div className="w-full h-full grid place-items-center">
        <div className="bg-white w-[100px] h-[100px]" onClick={(e) => e.stopPropagation()}>
          Hehe
        </div>
      </div>
    </MenuBackground>
  );
}
