import { useState } from "react";
import { Button } from "../components";

export const MenuSection = ({ children, style }: { children: React.ReactNode; style?: string }) => {
  return (
    <section className={`size-full overflow-y-scroll scrollbar-none ${style ?? ""}`}>
      <div className="w-full h-max pt-[100px] px-[50px] md:px-[80px] flex flex-col">{children}</div>
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
        className={`size-full max-w-[600px] bg-transparent border-b border-[var(--text-color)] rounded-none outline-none text-center pb-[3px] placeholder:text-[var(--text-color)] placeholder:opacity-50`}
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

export const CardList = ({ children, style }: { children: React.ReactNode; style?: string }) => {
  return <div className={`flex flex-wrap justify-center gap-[20px] pb-[40px] ${style ?? ""}`}>{children}</div>;
};

export const Card = ({ children, imageUrl, style, onClick }: { children?: React.ReactNode; imageUrl?: string; style?: string; onClick?: () => void }) => {
  return (
    <div className={`cursor-pointer snap-center min-w-[300px] aspect-[5/3] overflow-hidden rounded-[24px] border-[3px] border-white shadow-lg  ${style ?? ""}`} onClick={onClick}>
      <div
        style={{ backgroundImage: `url(${imageUrl})` }}
        className={`size-full bg-center bg-cover transition-all duration-300 hover:scale-110 active:scale-110 text-white grid place-items-center p-[20px]`}>
        {children}
      </div>
    </div>
  );
};
