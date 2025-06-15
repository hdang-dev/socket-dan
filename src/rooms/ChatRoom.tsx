import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../store";
import { Message } from "../types";
import { ChatBubble } from "../components";
import { getTime } from "../utils";
import { socket } from "../socket";

export function ChatRoom() {
  // const { state } = useContext(Context);
  // const { you, room } = state;
  const [messages, setMessages] = useState<Message[]>([]);
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

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey && yourText !== "") {
      event.preventDefault();
      sendMessage();
    }
  };

  const handleChangeText = (text: string) => {
    if (text.trimStart() !== "") {
      setYourText(text);
      resizeTextBox();
    }
  };

  const sendMessage = () => {
    // const message: Message = { text: yourText, time: getTime(), userId: you!.id! };
    // setMessages([...messages, message]);
    // setYourText("");
    // scrollToBottom();
    // textAreaRef.current!.value = "";
    // textAreaRef.current!.focus();
    // resizeTextBox();
    // socket.sendData("CHAT_MESSAGE", message);
  };

  useEffect(() => {
    // socket.onReceiveData<Message>("CHAT_MESSAGE", (message) => {
    //   setMessages((prev) => [...prev, message]);
    //   scrollToBottom();
    // });
  }, []);

  return (
    <div className="w-full h-full pb-[40px] px-[10px] flex flex-col justify-end items-center gap-[25px] md:gap-[40px]">
      {/* Messages */}
      <div ref={messageViewRef} className="pt-[30px] w-full overflow-y-auto flex flex-col gap-[10px] scrollbar-none">
        {/* {messages.map(({ text, time, userId }, index) => {
          const user = room!.users.filter((user) => user.id === userId)[0];
          return <ChatBubble key={index} text={text} time={time} userName={user ? user.name : "User leaved"} end={userId === you!.id} styleBubble="md:max-w-[30%]" />;
        })} */}
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
          onClick={() => sendMessage()}>
          Send
        </button>
      </div>
    </div>
  );
}
