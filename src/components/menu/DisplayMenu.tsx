import { useContext } from "react";
import { AppContext } from "../../context";
import { THEME_COLORS } from "./data";
import { Button, ConfirmedInput, Section, SubTitle, SwipeView } from "./SubComponent";

interface DisplayMenuProps {
  order: number,
}

export function DisplayMenu({ order }: DisplayMenuProps) {
  const { userName, updateUserName } = useContext(AppContext);

  const changeName = (name: string) => {
    updateUserName(name);
  };

  const changeTheme = (background: string, text: string) => {
    const elesWithTransition = document.querySelectorAll<HTMLElement>('.transition-all');
    elesWithTransition.forEach(element => {
      element.classList.add('transition-none');
    });
    document.documentElement.style.setProperty('--bg-color', background);
    document.documentElement.style.setProperty('--text-color', text);

    setTimeout(() => {
      elesWithTransition.forEach(element => {
        element.classList.remove('transition-none');
      });
    });
  };

  return (
    <Section order={order}>
      <SubTitle text="Change User Name" />
      <ConfirmedInput placeholder="# Enter your name" value={userName} buttonLabel="Save" checkDifferent onConfirm={(name) => changeName(name)} />
      <SubTitle text="Theme Color" />
      <SwipeView style="max-h-[350px]">
        {THEME_COLORS.map(({ name, background, text }, index) => (
          <Button key={index} background={background} text={text} onClick={() => changeTheme(background, text)} >{name}</Button>
        ))}
      </SwipeView>
    </Section>
  );
}
