import { useContext, useEffect } from "react";
import { Context } from "../context";
import { BACKGROUNDS, PLANETS } from "./data";
import { ConfirmedInput, Section, SubTitle, SwipeView } from "./SubComponents";
import { socketService as socket } from "../socket";
import { User } from "../interfaces";
import { Card } from "../components";

interface DisplayMenuProps {
  order: number;
}

export function DisplayMenu({ order }: DisplayMenuProps) {
  const { state, dispatch } = useContext(Context);
  const { you, room } = state;

  const changeName = (name: string) => {
    dispatch({ type: "CHANGE_NAME", user: { ...you!, name } });
    socket.sendData(room!.id, 'change-name', { ...you!, name });
  };

  const changeTheme = (background: string, text: string) => {
    const elementsWithTransition = document.querySelectorAll<HTMLElement>(".transition-all");
    elementsWithTransition.forEach((element) => {
      element.classList.add("transition-none");
    });
    document.documentElement.style.setProperty("--bg-color", background);
    document.documentElement.style.setProperty("--text-color", text);

    setTimeout(() => {
      elementsWithTransition.forEach((element) => {
        element.classList.remove("transition-none");
      });
    });
  };

  const changeBackground = (imageUrl: string) => {
    dispatch({ type: 'CHANGE_BACKGROUND', background: imageUrl });
  };

  const changePlanet = (imageUrl: string, animation: string) => {
    dispatch({ type: 'CHANGE_PLANET', planet: imageUrl, animation });
  };

  useEffect(() => {
    socket.receiveData<User>('change-name', (user) => {
      dispatch({ type: "CHANGE_NAME", user });
    });
  }, []);

  return (
    <Section order={order}>
      <SubTitle text="Change User Name" />
      <ConfirmedInput key={you!.name} placeholder="# Enter your name" value={you!.name} buttonLabel="Save" checkDifferent onConfirm={(name) => changeName(name)} />
      <SubTitle text="Background" />
      <SwipeView>
        {BACKGROUNDS.map(({ name, imageUrl }, index) => (
          <Card key={index} name={name} imageUrl={imageUrl} onClick={() => changeBackground(imageUrl)} />
        ))}
      </SwipeView>
      <SubTitle text="Planet" />
      <SwipeView>
        {PLANETS.map(({ name, imageUrl, animation }, index) => (
          <div key={index} className="cursor-pointer w-[250px] aspect-[5/3] overflow-hidden rounded-[24px] border-[3px] border-white shadow-lg p-[10px] relative" onClick={() => changePlanet(imageUrl, animation)}>
            <img src={imageUrl} className="w-full h-full" alt="Planet" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">{name}</span>
          </div>
          // <Card key={index} name={name} imageUrl={imageUrl} onClick={() => changePlanet(imageUrl)} />
        ))}
      </SwipeView>
      {/* <SubTitle text="Theme Color" />
      <SwipeView style="max-h-[350px]">
        {THEME_COLORS.map(({ name, background, text }, index) => (
          <Button key={index} background={background} text={text} onClick={() => changeTheme(background, text)}>
            {name}
          </Button>
        ))}
      </SwipeView> */}
    </Section>
  );
}
