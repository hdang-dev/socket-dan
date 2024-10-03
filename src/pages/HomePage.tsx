import earthLogo from '/earth.svg';
import { ChatBubble } from '../components';
import { useEffect, useRef, useState } from 'react';

export default function HomePage() {
    const [messages, setMessages] = useState<string[]>(() => [
        // 'Lorem sibum kimchana mala bimula saya! Wohaa na miya loo dpan sarandeyo. 1',
        // 'Lorem sibum kimchana mala bimula saya! Wohaa na miya loo dpan sarandeyo. 2',
        // 'Lorem sibum kimchana mala bimula saya! Wohaa na miya loo dpan sarandeyo. 3',
        // 'Lorem sibum kimchana mala bimula saya! Wohaa na miya loo dpan sarandeyo. 4',
        // 'Lorem sibum kimchana mala bimula saya! Wohaa na miya loo dpan sarandeyo. 5',
        // 'Lorem sibum kimchana mala bimula saya! Wohaa na miya loo dpan sarandeyo. 6',
        // 'Lorem sibum kimchana mala bimula saya! Wohaa na miya loo dpan sarandeyo. 7',
        // 'Lorem sibum kimchana mala bimula saya! Wohaa na miya loo dpan sarandeyo. 8',
        // 'Lorem sibum kimchana mala bimula saya! Wohaa na miya loo dpan sarandeyo. 9'
    ]);
    const [yourMessage, setYourMessage] = useState<string>('');
    const messageViewRef = useRef<HTMLDivElement>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const addMessage = (message: string) => {
        setMessages([...messages, message]);
    };

    const scrollToBottom = () => {
        setTimeout(() => messageViewRef.current?.scrollTo({ top: messageViewRef.current.scrollHeight, behavior: 'smooth' }));
    };

    return (
        <div className="w-full h-full grid place-items-center bg-[var(--primary)] relative">

            {/* Background */}
            <div className='relative'>
                <img src={earthLogo} alt="earth-logo" />
                <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl font-bold text-white w-max'>Chat Dan</span>
            </div>

            {/* Content */}
            <div className='absolute inset-[10px] bottom-[70px] flex flex-col items-center gap-[20px]'>
                <div className='h-[calc(100%-40px)] w-full relative flex flex-col justify-end'>
                    {/* Messages */}
                    <div ref={messageViewRef} className='overflow-y-scroll p-[40px]'>
                        {messages.map((message, index) => {
                            if (index % 2 === 0) {
                                return (<ChatBubble key={index} text={message} end stlyeWrapper='place-items-start' styleBubble='max-w-[40%]' />);
                            }
                            return (<ChatBubble key={index} text={message} stlyeWrapper='place-items-end' styleBubble='max-w-[40%]' />);
                        })}
                    </div>

                    {/* Top and bottom blur layers */}
                    <div className='absolute top-0 left-0 w-full h-[40px] bg-gradient-to-b from-[var(--primary)] to-transparent'></div>
                    <div className='absolute bottom-0 left-0 w-full h-[40px] bg-gradient-to-t from-[var(--primary)] to-transparent'></div>
                </div>
            </div>

            {/* Typing */}
            <div className='absolute bottom-[70px] w-[90%] max-w-[600px] flex gap-[15px] items-end'>
                <textarea ref={textAreaRef} className='flex-1 px-[10px] py-[5px] outline-none rounded-[24px] shadow-inner shadow-slate-400' placeholder='Type your message here'
                    onChange={e => {
                        setYourMessage(e.target.value);
                        if (textAreaRef.current) {
                            textAreaRef.current.style.height = 'unset';
                            textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
                        }
                    }}
                ></textarea>
                <button className='bg-[var(--secondary)] px-[20px] rounded-[24px] hover:scale-110 transition-all text-white font-bold' onClick={() => {
                    addMessage('Lorem sibum kimchana mala bimula saya! Wohaa na miya loo dpan sarandeyo. ' + Math.random());
                    scrollToBottom();
                }}>Send</button>
            </div>
        </div>
    );
}