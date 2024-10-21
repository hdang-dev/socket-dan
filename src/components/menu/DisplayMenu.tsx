import { ConfirmedInput, Section, SubTitle } from "./SubComponent";

interface DisplayMenuProps {
  onChangeName: (name: string) => void;
}

export function DisplayMenu({ onChangeName }: DisplayMenuProps) {
  return (
    <Section title="Display">
      <>
        <SubTitle text="User Name" />
        <ConfirmedInput placeholder="# Enter your name" value="User #123abc" buttonLabel="Save" checkDifferent onConfirm={(name) => onChangeName(name)} />
        <SubTitle text="Background Color" />
        <div className="flex gap-[20px] flex-wrap">
          <button className="w-[150px] border-[3px] border-white rounded-[24px] p-[10px] bg-[var(--primary)]">Primary</button>
          <button className="w-[150px] border-[3px] border-white rounded-[24px] p-[10px] bg-black text-white">Night</button>
          <button className="w-[150px] border-[3px] border-white rounded-[24px] p-[10px] bg-violet-500">Galaxy</button>
          <button className="w-[150px] border-[3px] border-white rounded-[24px] p-[10px] bg-amber-400">Sunset</button>
          <button className="w-[150px] border-[3px] border-white rounded-[24px] p-[10px] bg-yellow-300">Sunrise</button>
        </div>
      </>
    </Section>
  );
}
