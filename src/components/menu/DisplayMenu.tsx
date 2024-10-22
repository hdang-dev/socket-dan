import { Button, ConfirmedInput, Section, SubTitle, SwipeView } from "./SubComponent";

interface DisplayMenuProps {
  order: number,
  onChangeName: (name: string) => void;
}

export function DisplayMenu({ order, onChangeName }: DisplayMenuProps) {
  return (
    <Section order={order}>
      <SubTitle text="Change User Name" />
      <ConfirmedInput placeholder="# Enter your name" value="User #123abc" buttonLabel="Save" checkDifferent onConfirm={(name) => onChangeName(name)} />
      <SubTitle text="Background Color" />
      <SwipeView style="max-h-[350px]">
        <Button style="bg-[var(--primary)]" >Primary</Button>
        <Button style="bg-black text-white" >Primary</Button>
        <Button style="bg-violet-500" >Primary</Button>
        <Button style="bg-amber-400" >Primary</Button>
        <Button style="bg-yellow-300" >Primary</Button>
        <Button style="bg-green-500" >Primary</Button>
        <Button style="bg-blue-500" >Primary</Button>
      </SwipeView>
    </Section>
  );
}
