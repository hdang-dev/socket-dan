import React, { useEffect, useRef, useState } from "react";
import { isSafariBrowser } from "../utils";

export const Section = ({ children, style }: { children: React.ReactNode; style?: string }) => {
  return <section className={`w-full h-full flex flex-col px-[20px] ${style ?? ""}`}>{children}</section>;
};

export const SubTitle = ({ text, style }: { text: string; style?: string }) => {
  return <h2 className={`mb-[20px] text-lg font-bold text-center md:text-left md:text-lg ${style ?? ""}`}>{text}</h2>;
};

export const Button = ({
  children,
  noOutline,
  isText,
  background,
  text,
  style,
  onClick,
}: {
  children: React.ReactNode;
  noOutline?: boolean;
  isText?: boolean;
  background?: string;
  text?: string;
  style?: string;
  onClick?: () => void;
}) => {
  return (
    <button
      className={`py-[5px] px-[10px] transition-all duration-100 text-lg active:text-[var(--bg-color)] ${
        noOutline ? "" : "min-w-[150px] rounded-[24px] border-[2px] border-white shadow-lg px-[15px] bg-[rgb(255,255,255,0.7)] text-black"
      } ${isText ? "pointer-events-none" : ""} ${style ?? ""}`}
      style={{ backgroundColor: background, color: text }}
      onClick={() => onClick?.()}>
      {children}
    </button>
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
    <div className={`flex gap-[10px] md:gap-[20px] flex-col px-[20px] items-center md:flex-row ${style ?? ""}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={input}
        className={`w-full h-full max-w-[500px] bg-transparent border-b border-[var(--text-color)] rounded-none outline-none text-center py-[5px] placeholder:text-[var(--text-color)] placeholder:opacity-50 ${
          input.trim() === "" || input.trim() !== currentValue ? "border-dashed" : ""
        }`}
        onChange={(e) => setInput(e.target.value.trimStart())}
      />
      <Button
        style={`duration-500 ${input.trim() === "" || (currentValue === input.trim() && checkDifferent) ? "opacity-0 translate-y-full md:translate-y-0 md:-translate-x-full pointer-events-none" : ""}`}
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
