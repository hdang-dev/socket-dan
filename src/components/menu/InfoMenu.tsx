import { Section, SubTitle } from "./SubComponent";

interface InfoMenuProps {
  roomLink: string;
}

export function InfoMenu({ roomLink }: InfoMenuProps) {
  return (
    <Section title="Information">
      <>
        <SubTitle text="Room Link" />
        <div className="flex gap-[20px] items-center">
          <span>{roomLink}</span>
          <button className="w-[150px] p-[5px] border-[3px] border-white rounded-[24px]">Copy</button>
        </div>

        <SubTitle text="Members" />
        <div className="flex gap-[20px] flex-wrap">
          <button className="w-[200px] p-[5px] border-[3px] border-white rounded-[24px] bg-amber-300">Adam Aquasthi Lee</button>
          <button className="w-[200px] p-[5px] border-[3px] border-white rounded-[24px] bg-red-300">Adam Aquasthi Lee</button>
          <button className="w-[200px] p-[5px] border-[3px] border-white rounded-[24px] bg-violet-300">Adam Aquasthi Lee</button>
          <button className="w-[200px] p-[5px] border-[3px] border-white rounded-[24px] bg-blue-300">Adam Aquasthi Lee</button>
          <button className="w-[200px] p-[5px] border-[3px] border-white rounded-[24px] bg-green-300">Adam Aquasthi Lee</button>
        </div>
      </>
    </Section>
  );
}
