import { useContext, useEffect } from "react";
import { Context } from "../context";
import { THEME_COLORS } from "./data";
import { Button, ConfirmedInput, Section, SubTitle, SwipeView } from "./SubComponents";
import { socketService as socket } from "../socket";
import { User } from "../interfaces";

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

  useEffect(() => {
    socket.receiveData<User>('change-name', (user) => {
      dispatch({ type: "CHANGE_NAME", user });
    });
  }, []);

  return (
    <Section order={order}>
      <SubTitle text="Change User Name" />
      <ConfirmedInput key={you!.name} placeholder="# Enter your name" value={you!.name} buttonLabel="Save" checkDifferent onConfirm={(name) => changeName(name)} />
      <SubTitle text="Theme Color" />
      <SwipeView style="max-h-[350px]">
        {THEME_COLORS.map(({ name, background, text }, index) => (
          <Button key={index} background={background} text={text} onClick={() => changeTheme(background, text)}>
            {name}
          </Button>
        ))}
      </SwipeView>
    </Section>
  );
}
