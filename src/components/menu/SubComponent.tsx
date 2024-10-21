import { useState } from "react";

export const Section = ({ title, children, style }: { title: string; children: JSX.Element; style?: string; }) => {
  return (
    <section className={`w-full h-full min-h-full flex flex-col py-[60px] px-[20px] md:px-[60px] ${style ?? ""}`}>
      <h1 className="text-lg text-center font-bold md:text-left md:text-2xl">{title}</h1>
      {children}
    </section>
  );
};

export const SubTitle = ({ text, style }: { text: string; style?: string; }) => {
  return <h2 className={`[&:not(:first-child)]:mt-[50px] text-center mb-[20px] md:text-left md:text-xl ${style ?? ""}`}>{text}</h2>;
};

export const RoomCard = ({ name, imageUrl }: { name: string; imageUrl: string; }) => {
  return (
    <div className="cursor-pointer w-[200px] md:w-[250px] aspect-[5/3] overflow-hidden rounded-[24px] border-[3px] border-white shadow-lg">
      <div
        style={{ backgroundImage: `url(${imageUrl})` }}
        className={`w-full h-full transition-all duration-300 hover:scale-110 active:scale-110 active:text-[var(--secondary)] grid place-items-center`}>
        <span className="text-inherit">{name}</span>
      </div>
    </div>
  );
};

export const ConfirmedInput = ({
  placeholder,
  value,
  buttonLabel,
  checkDifferent,
  style,
  onConfirm,
}: {
  placeholder: string;
  value: string;
  buttonLabel: string;
  checkDifferent?: boolean;
  style?: string;
  onConfirm: (value: string) => void;
}) => {
  const [input, setInput] = useState(value);
  const [currentValue, setCurrentValue] = useState(value);
  return (
    <div className={`flex gap-[20px] flex-col items-center md:flex-row ${style ?? ""}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={input}
        className="w-full h-full max-w-[600px] bg-transparent border-b border-gray-500 outline-none text-center py-[5px] md:placeholder:text-center placeholder:text-gray-500 placeholder:zitalic"
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className={`font-bold w-[150px] shadow-lg py-[5px] rounded-[24px] border-[3px] border-white transition-all duration-500 ${input.trim() === "" || (currentValue === input && checkDifferent) ? "opacity-0 translate-y-full md:translate-y-0 md:-translate-x-full pointer-events-none" : ""
          }`}
        onClick={() => {
          setCurrentValue(input);
          onConfirm(input);
        }}>
        {buttonLabel}
      </button>
    </div>
  );
};

export const ControlButton = ({ label }: { label: string; }) => {
  return <button className="active:text-[var(--secondary)] [&:not(:first-child)]:border-l min-w-[150px]">{label}</button>;
};