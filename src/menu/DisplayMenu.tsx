import { useContext, useEffect } from "react";
import { Context } from "../context";
import { BACKGROUNDS, PLANETS } from "./data";
import { Section, SubTitle, SwipeView } from "./SubComponents";
import { socketService as socket } from "../socket";
import { User } from "../interfaces";
import { Card } from "../components";

interface DisplayMenuProps {
  order: number;
}

export function DisplayMenu({ order }: DisplayMenuProps) {
  const { state, dispatch } = useContext(Context);
  const { theme } = state;

  /*
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
  }
  */

  const changeBackground = (imageUrl: string) => {
    dispatch({ type: "CHANGE_BACKGROUND", background: imageUrl });
  };

  const changePlanet = (imageUrl: string, animation: string) => {
    dispatch({ type: "CHANGE_PLANET", planet: imageUrl, animation });
  };

  useEffect(() => {
    socket.receiveData<User>("change-name", (user) => {
      dispatch({ type: "CHANGE_NAME", user });
    });
  }, []);

  return (
    <Section order={order}>
      <SubTitle text="Background" />
      <SwipeView>
        {BACKGROUNDS.map(({ name, imageUrl }, index) => (
          <Card key={index} imageUrl={imageUrl} onClick={() => changeBackground(imageUrl)}>
            {name}
          </Card>
        ))}
      </SwipeView>
      <SubTitle text="Planet" />
      <SwipeView>
        {PLANETS.map(({ imageUrl, animation }, index) => (
          <Card key={index} imageUrl={theme.background} onClick={() => changePlanet(imageUrl, animation)}>
            <div style={{ backgroundImage: `url(${imageUrl})` }} className="w-full h-full bg-center bg-contain bg-no-repeat" ></div>
          </Card>
        ))}
      </SwipeView>
    </Section>
  );
}
