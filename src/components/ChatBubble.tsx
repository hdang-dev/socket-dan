interface ChatBubbleProps {
    text: string;
    end?: boolean;
    stlyeWrapper?: string;
    styleBubble?: string;
}

export default function ChatBubble({ text, end, stlyeWrapper, styleBubble }: ChatBubbleProps) {
    return <div className={`chat ${end ? 'chat-end' : 'chat-start'} ${stlyeWrapper}`}>
        <div className={`chat-bubble transition-all duration-200 bg-white text-black px-[16px] py-[10px] text-wrap drop-shadow-md break-words ${styleBubble}`}>{text}</div>
    </div>;
}