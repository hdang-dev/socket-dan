import earthLogo from '/earth.svg';
import { ChatBubble } from '../components';
import { useRef, useState } from 'react';

export default function HomePage() {
    const [messages, setMessages] = useState<string[]>(() => [
        'Hi, welcome to Chat Dan',
        'You can chat with everyone here anonymously'
    ]);
    const [yourMessage, setYourMessage] = useState<string>('');
    const messageViewRef = useRef<HTMLDivElement>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const updateYourMessage = (message: string) => {
        setYourMessage(message);
        resizeTextAreaHeight();
    };

    const sendMessage = (message: string) => {
        if (message.trim() !== '') {
            setMessages([...messages, message]);
            setYourMessage('');
            textAreaRef.current!.value = '';
            resizeTextAreaHeight();
            scrollToBottom();
            textAreaRef.current!.focus();
        }
    };

    const scrollToBottom = () => {
        setTimeout(() => messageViewRef.current?.scrollTo({ top: messageViewRef.current.scrollHeight, behavior: 'smooth' }));
    };

    const resizeTextAreaHeight = () => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = 'unset';
            textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
        }
    };

    return (
        <div className="w-full h-full grid place-items-center bg-[var(--primary)] relative">

            {/* Background */}
            <div className='relative w-[80%] max-w-[450px]'>
                <img className='animate-spin animate-infinite animate-duration-[70s]' src={earthLogo} alt="earth-logo" />
                <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-white w-max opacity-80 text-5xl md:text-6xl md:opacity-100'>Chat Dan</span>
            </div>

            {/* Content */}
            <div className='absolute inset-x-0 inset-y-[10px] flex flex-col justify-end items-center gap-[30px]'>
                {/* Messages */}
                <div ref={messageViewRef} className='w-full overflow-y-scroll px-[10px] flex flex-col gap-[20px] md:px-[30px]'>
                    {messages.map((message, index) => {
                        if (index % 2 === 0) {
                            return (<ChatBubble key={index} text={message} stlyeWrapper='place-items-start' styleBubble='md:max-w-[30%]' />);
                        }
                        return (<ChatBubble key={index} text={message} end stlyeWrapper='place-items-end' styleBubble='md:max-w-[30%]' />);
                    })}
                </div>

                {/* Typing */}
                <div className='w-[90%] flex flex-col gap-[5px]'>
                    <textarea ref={textAreaRef} rows={1}
                        className='w-full p-[8px] outline-none rounded-[24px] shadow-inner shadow-slate-400 resize-none placeholder:text-center max-h-[18vh]' placeholder='Type your message here'
                        onChange={e => updateYourMessage(e.target.value)}
                        onKeyDown={e => {
                            scrollToBottom();
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                sendMessage(yourMessage);
                            }
                        }}
                    ></textarea>
                    <button
                        disabled={yourMessage.trim() === '' ? true : false}
                        className={`w-full bg-[var(--secondary)] px-[20px] rounded-[24px] disabled:bg-gray-500 enabled:hover:scale-110 transition-all text-white font-bold h-[35px]`}
                        onClick={() => sendMessage(yourMessage)}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div >
    );
}