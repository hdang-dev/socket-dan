interface ChatBubbleProps {
  text: string;
  time: string;
  userName?: string;
  end?: boolean;
  styleWrapper?: string;
  styleBubble?: string;
}

export function ChatBubble({ text, time, userName, end, styleWrapper, styleBubble }: ChatBubbleProps) {
  return (
    <div className={`chat ${end ? "chat-end" : "chat-start"} ${styleWrapper ?? ""}`}>
      {userName && <div className="chat-header">{userName}</div>}
      <div className={`chat-bubble transition-all duration-200 bg-white text-black px-[16px] py-[10px] text-wrap drop-shadow-md break-words ${styleBubble}`}>{text}</div>
      <div className="chat-footer">{time}</div>
    </div>
  );
}
