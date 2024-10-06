import earthLogo from "/earth.svg";
import { ChatBubble } from "../components";
import { useCallback, useEffect, useRef, useState } from "react";
import { emitEvent, onEvent } from "../socket";

export default function HomePage() {
  const [messages, setMessages] = useState<string[]>(() => ["Hi, welcome to Chat Dan", "You can chat with everyone here anonymously"]);
  const [yourMessage, setYourMessage] = useState<string>("");
  const messageViewRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [showRoomButton, setShowRoomButton] = useState(false);

  const updateYourMessage = (message: string) => {
    setYourMessage(message);
    resizeTextAreaHeight();
  };

  const sendMessage = (message: string) => {
    if (message.trim() !== "") {
      setMessages([...messages, message]);
      setYourMessage("");
      textAreaRef.current!.value = "";
      resizeTextAreaHeight();
      scrollToBottom();
      textAreaRef.current!.focus();
      emitEvent("SEND_MESSAGE", message);
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

  const resizeTextAreaHeight = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "unset";
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
    }
  };

  const handleTyping = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage(yourMessage);
    }
  };

  const receiveMessage = useCallback(
    (message: string) => {
      setMessages([...messages, message]);
      scrollToBottom();
    },
    [messages]
  );

  useEffect(() => {
    console.log(userId);
    emitEvent("JOIN_APP");
    onEvent("USER_ID", (userId) => setUserId(userId));
  }, []);

  useEffect(() => {
    onEvent("RECEIVE_MESSAGE", (message) => receiveMessage(message));
  }, [receiveMessage]);

  return (
    <div className="w-full h-full grid place-items-center bg-[var(--primary)] relative">
      {/* Background */}
      <div className="relative w-[80%] max-w-[450px] opacity-80 md:opacity-100">
        <img className="animate-spin animate-infinite animate-duration-[100s]" src={earthLogo} alt="earth-logo" />
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-white w-max text-5xl md:text-6xl">Chat Dan</span>
      </div>

      {/* Options */}
      <div
        className={`absolute inset-0 transition-all duration-300 grid place-items-center z-[1] ${showRoomButton ? "backdrop-blur-md translate-y-0" : "translate-y-[calc(-100%+20px)]"}`}
        onClick={() => setShowRoomButton(!showRoomButton)}>
        <button className={`absolute w-[100px] h-[30px] bg-white shadow-md rounded-[24px] ${showRoomButton ? "bottom-full opacity-0" : "bottom-0 opacity-100"}`}></button>
        <div onClick={(e) => e.stopPropagation()}>
          <div className="w-[90%] max-w-[600px] rounded-[24px] shadow-sm">
            <div className="flex">
              <button className="border-[3px] border-[var(--secondary)] transition-all text-[var(--secondary)] py-[5px] px-[10px] rounded-[24px] bg-white font-bold">Room+</button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="absolute inset-[10px] top-0 md:inset-x-[30px] md:bottom-[30px] flex flex-col justify-end items-center gap-[25px] md:gap-[40px]">
        {/* Messages */}
        <div ref={messageViewRef} className="pt-[30px] w-full overflow-y-auto flex flex-col gap-[20px] scrollbar-none">
          {messages.map((message, index) => {
            if (index % 2 === 0) {
              return <ChatBubble key={index} text={message} styleWrapper="place-items-start" styleBubble="md:max-w-[30%]" />;
            }
            return <ChatBubble key={index} text={message} end styleWrapper="place-items-end" styleBubble="md:max-w-[30%]" />;
          })}
        </div>

        {/* Typing */}
        <div className="w-full flex rounded-[12px] shadow-inner shadow-slate-400 bg-white py-[8px] px-[12px] gap-[10px] md:max-w-[500px]">
          <textarea
            ref={textAreaRef}
            rows={1}
            className="w-full outline-none resize-none bg-transparent max-h-[120px] md:max-h-[80px] pr-[10px] scrollbar-thin scrollbar-thumb-[red]"
            placeholder="Type your message here"
            onChange={(e) => updateYourMessage(e.target.value)}
            onKeyDown={(e) => handleTyping(e)}></textarea>
          <button
            disabled={yourMessage.trim() === "" ? true : false}
            className={`self-end text-[var(--secondary)] disabled:text-gray-500 font-bold enabled:hover:scale-110 transition-all`}
            onClick={() => sendMessage(yourMessage)}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
