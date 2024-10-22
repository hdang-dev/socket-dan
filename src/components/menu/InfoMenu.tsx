import { Button, Section, SubTitle, SwipeView } from "./SubComponent";

interface InfoMenuProps {
  roomLink: string;
  order: number;
}

export function InfoMenu({ order, roomLink }: InfoMenuProps) {
  return (
    <Section order={order}>
      <SubTitle text="Room Link" />
      <div className="flex gap-[10px] md:gap-[20px] flex-col md:flex-row items-center">
        <span className="text-center md:text-start py-[5px] min-w-[300px] italic">{roomLink}</span>
        <Button>Copy</Button>
      </div>

      <SubTitle text="Members" />
      <SwipeView style="max-h-[350px]">
        <Button style="bg-amber-300" isText>Adam Aquasthi Lee</Button>
        <Button style="bg-red-300" isText>Adam Aquasthi Lee</Button>
        <Button style="bg-violet-300" isText>Adam Aquasthi Lee</Button>
        <Button style="bg-blue-300" isText>Adam Aquasthi Lee</Button>
        <Button style="bg-green-300" isText>Adam Aquasthi Lee</Button>
        <Button style="bg-amber-300" isText>Adam Aquasthi Lee</Button>
        <Button style="bg-red-300" isText>Adam Aquasthi Lee</Button>
        <Button style="bg-violet-300" isText>Adam Aquasthi Lee</Button>
        <Button style="bg-blue-300" isText>Adam Aquasthi Lee</Button>
        <Button style="bg-green-300" isText>Adam Aquasthi Lee</Button>
      </SwipeView>
    </Section >
  );
}
