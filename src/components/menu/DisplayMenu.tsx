import { useContext } from "react";
import { Context } from "../../store";
import { THEME_COLORS } from "./data";
import { Button, ConfirmedInput, Section, SubTitle, SwipeView } from "./SubComponent";

interface DisplayMenuProps {
  order: number;
}

export function DisplayMenu({ order }: DisplayMenuProps) {
  const { state, dispatch } = useContext(Context);
  const { user } = state;

  const changeName = (name: string) => {
    dispatch({ type: "CHANGE_USER_NAME", name });
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

  return (
    <Section order={order}>
      <SubTitle text="Change User Name" />
      <ConfirmedInput placeholder="# Enter your name" value={user.name} buttonLabel="Save" checkDifferent onConfirm={(name) => changeName(name)} />
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
