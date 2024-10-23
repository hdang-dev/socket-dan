import { useContext } from "react";
import { AppContext } from "../../context";
import { BACKGROUND_COLORS } from "./data";
import { Button, ConfirmedInput, Section, SubTitle, SwipeView } from "./SubComponent";

interface DisplayMenuProps {
  order: number,
}

export function DisplayMenu({ order }: DisplayMenuProps) {
  const { userName, updateUserName } = useContext(AppContext);
  const changeName = (name: string) => {
    updateUserName(name);
  };

  return (
    <Section order={order}>
      <SubTitle text="Change User Name" />
      <ConfirmedInput placeholder="# Enter your name" value={userName} buttonLabel="Save" checkDifferent onConfirm={(name) => changeName(name)} />
      <SubTitle text="Background Color" />
      <SwipeView style="max-h-[350px]">
        <Button style="bg-[var(--primary)]" >Primary</Button>
        {BACKGROUND_COLORS.map((color, index) => (
          <Button key={index} color={color.code} style={color.hasWhiteText ? 'text-white' : ''} >{color.name}</Button>
        ))}
      </SwipeView>
    </Section>
  );
}
