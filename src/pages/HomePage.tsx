import earthLogo from '/earth.svg';
import { ChatBubble } from '../components';
import { useEffect, useRef, useState } from 'react';

export default function HomePage() {
    const [leftMessages, setLeftMessages] = useState<string[]>(() => {
        return [
            'Lorem sibum kimchana mala bimula saya! Wohaa na miya loo dpan sarandeyo.',
            'Lorem sibum kimchana mala bimula saya! Wohaa na miya loo dpan sarandeyo.',
            'Lorem sibum kimchana mala bimula saya! Wohaa na miya loo dpan sarandeyo.',
            'Lorem sibum kimchana mala bimula saya! Wohaa na miya loo dpan sarandeyo.',
            'Lorem sibum kimchana mala bimula saya! Wohaa na miya loo dpan sarandeyo.',
            'Lorem sibum kimchana mala bimula saya! Wohaa na miya loo dpan sarandeyo.',
            'Lorem sibum kimchana mala bimula saya! Wohaa na miya loo dpan sarandeyo.'
        ];
    });
    const [rightMessages, setRightMessages] = useState<string[]>(() => {
        return [
            'Lorem sibum kimchana mala bimula saya! Wohaa na miya loo dpan sarandeyo.',
            'Lorem sibum kimchana mala bimula saya! Wohaa na miya loo dpan sarandeyo.',
            'Lorem sibum kimchana mala bimula saya! Wohaa na miya loo dpan sarandeyo.',
            'Lorem sibum kimchana mala bimula saya! Wohaa na miya loo dpan sarandeyo.',
            'Lorem sibum kimchana mala bimula saya! Wohaa na miya loo dpan sarandeyo.',
            'Lorem sibum kimchana mala bimula saya! Wohaa na miya loo dpan sarandeyo.',
            'Lorem sibum kimchana mala bimula saya! Wohaa na miya loo dpan sarandeyo.'
        ];
    });
    const messageViewRef = useRef<HTMLDivElement>(null);

    const addMessage = (message: string) => {
        if (leftMessages.length <= rightMessages.length) {
            setLeftMessages([message, ...leftMessages]);
        } else {
            setRightMessages([message, ...rightMessages]);
        }
    };

    const scrollToBottom = () => {
        setTimeout(() => {

            messageViewRef.current?.scrollTo({ top: messageViewRef.current.scrollHeight, behavior: 'smooth' });
        });
    };

    useEffect(() => scrollToBottom(), []);

    return <div className="w-full h-full grid place-items-center bg-[var(--primary)] relative">

        {/* Background */}
        <div className='relative'>
            <img src={earthLogo} alt="earth-logo" />
            <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl font-bold text-white w-max'>Chat Dan</span>
        </div>

        {/* Content */}
        <div className='absolute inset-[20px] flex flex-col gap-[30px]'>
            <div className='h-[calc(100%-40px)] relative'>
                {/* Messages */}
                <div ref={messageViewRef} className='h-full overflow-y-scroll'>
                    <div className='flex gap-[280px] px-[20px] py-[80px]'>
                        <div className='flex-1 flex flex-col-reverse gap-[40px]'>
                            {leftMessages.map((message, index) => {
                                if (index % 2 === 0) {
                                    return (<ChatBubble key={index} end style='max-w-[60%]' text={message} />);
                                }
                                return (<ChatBubble key={index} end toLeft style='max-w-[60%]' text={message} />);
                            })}
                        </div>
                        <div className='flex-1 flex flex-col-reverse gap-[40px] pb-[40px]'>
                            {rightMessages.map((message, index) => {
                                if (index % 2 === 0) {
                                    return (<ChatBubble key={index} toLeft style='max-w-[60%]' text={message} />);
                                }
                                return (<ChatBubble key={index} style='max-w-[60%]' text={message} />);
                            })}
                        </div>
                    </div>
                </div>

                {/* Top and bottom blur layers */}
                <div className='absolute top-0 left-0 w-full h-[80px] bg-gradient-to-b from-[var(--primary)] to-transparent'></div>
                <div className='absolute bottom-0 left-0 w-full h-[80px] bg-gradient-to-t from-[var(--primary)] to-transparent'></div>
            </div>

            {/* Typing */}
            <div className='h-[40px] bg-white'
                onClick={() => {
                    addMessage('anabsdgasj 1616161717717171' + Math.random());

                    scrollToBottom();
                }}
            >Click</div>
        </div>
    </div>;
}