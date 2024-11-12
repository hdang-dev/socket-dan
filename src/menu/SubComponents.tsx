import React, { useState } from "react";
import { Button } from "../components";

export const MenuSection = ({ children, style }: { children: React.ReactNode; style?: string }) => {
  return (
    <section className={`snap-center min-w-full h-full overflow-scroll scrollbar-none`}>
      <div className={`w-full h-full pt-[100px] px-[30px] flex flex-col ${style ?? ""}`}>{children}</div>
    </section>
  );
};

export const Title = ({ text, style }: { text: string; style?: string }) => {
  return <h2 className={`[&:not(:first-child)]:mt-[50px] mb-[20px] font-bold text-center md:text-lg ${style ?? ""}`}>{text}</h2>;
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
    <div className={`flex gap-[15px] flex-col items-center ${style ?? ""}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={input}
        className={`w-full h-full max-w-[600px] bg-transparent border-b border-[var(--text-color)] rounded-none outline-none text-center pb-[3px] placeholder:text-[var(--text-color)] placeholder:opacity-50`}
        onChange={(e) => setInput(e.target.value.trimStart())}
      />
      <Button
        style={`duration-500 ${input.trim() === "" || (currentValue === input.trim() && checkDifferent) ? "opacity-0 translate-y-full pointer-events-none" : ""}`}
        onClick={() => {
          setCurrentValue(input.trim());
          setInput(input.trim());
          onConfirm(input.trim());
        }}>
        {buttonLabel}
      </Button>
    </div>
  );
};

export const SwipeView = ({ children, style }: { children: React.ReactNode; style?: string }) => {
  return (
    <div className={`w-screen h-max overflow-scroll scrollbar-none snap-y snap-mandatory  ${style ?? ""}`}>
      <div className="flex flex-col w-max h-max gap-[20px]">{children}</div>
    </div>
  );
};
