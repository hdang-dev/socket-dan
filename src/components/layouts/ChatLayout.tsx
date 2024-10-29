import { ChatBubble } from "../../components";
import { useContext, useRef, useState } from "react";
import { Context } from "../../store";
import { getTime } from "../../utils";
import type { Message } from "../../interfaces";

interface ChatLayoutProps {
  initMessages?: string[];
}

export function ChatLayout({ initMessages }: ChatLayoutProps) {
  const { state } = useContext(Context);
  const { user } = state;
  const [messages, setMessages] = useState<Message[]>(() => {
    if (initMessages) {
      return initMessages.map((message) => ({ text: message, userName: "System", time: getTime() }));
    }
    return [];
  });
  const [yourText, setYourText] = useState<string>("");

  const messageViewRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const resizeTextBox = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "unset";
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
    }
  };

  const scrollToBottom = () => {
    setTimeout(() =>
      messageViewRef.current?.scrollTo({
        top: messageViewRef.current.scrollHeight,
        behavior: "smooth",
      })
    );
  };

  const sendMessage = (text: string) => {
    if (text.trim() !== "") {
      setMessages([...messages, { text, time: getTime(), userName: user.name }]);
      setYourText("");
      scrollToBottom();
      textAreaRef.current!.value = "";
      textAreaRef.current!.focus();
      resizeTextBox();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage(yourText);
    }
  };

  const handleChangeText = (text: string) => {
    setYourText(text);
    resizeTextBox();
  };

  return (
    <div className="w-full h-full pb-[10px] px-[10px] flex flex-col justify-end items-center gap-[25px] md:gap-[40px]">
      {/* Messages */}
      <div ref={messageViewRef} className="pt-[30px] w-full overflow-y-auto flex flex-col gap-[10px] scrollbar-none">
        {messages.map(({ text, time, userName }, index) => (
          <ChatBubble key={index} text={text} time={time} userName={userName} end={userName === user.id} styleBubble="md:max-w-[30%]" />
        ))}
      </div>

      {/* Typing */}
      <div className="w-full flex rounded-[12px] shadow-inner shadow-slate-400 bg-white py-[8px] px-[12px] gap-[10px] md:max-w-[500px]">
        <textarea
          ref={textAreaRef}
          rows={1}
          className="w-full outline-none resize-none bg-transparent max-h-[120px] md:max-h-[80px] pr-[10px] scrollbar-thin text-black"
          placeholder="Type your message here"
          value={yourText}
          onChange={(e) => handleChangeText(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}></textarea>
        <button
          disabled={yourText.trim() === "" ? true : false}
          className={`self-end text-[var(--bg-color)] disabled:opacity-50 font-bold enabled:hover:scale-110 transition-all`}
          onClick={() => sendMessage(yourText)}>
          Send
        </button>
      </div>
    </div>
  );
}
