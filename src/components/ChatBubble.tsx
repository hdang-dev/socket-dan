interface ChatBubbleProps {
    text: string;
    end?: boolean;
    toLeft?: boolean;
    style?: string;
}

export default function ChatBubble({ text, end, toLeft, style }: ChatBubbleProps) {
    return <div className={`chat ${end ? 'chat-end' : 'chat-start'} ${toLeft ? 'place-items-start' : 'place-items-end'}`}>
        <div className={`chat-bubble transition-all duration-200 bg-white text-black px-[16px] py-[10px] animate-jump animate-duration-1000 animate-ease-in ${style}`}>{text}</div>
    </div>;
}