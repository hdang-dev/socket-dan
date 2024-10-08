import earthLogo from "/earth.svg";
import { ChatBubble, Dialog } from "../components";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { emitEvent, onEvent } from "../socket";
import { AppContext } from "../context";
import { useLocation, useNavigate } from "react-router-dom";
import { getTime } from "../utils";

interface Message {
    text: string;
    time: string;
    userName?: string;
    isYours?: boolean;
}

const ACTIONS = ['CREATE', 'JOIN'] as const;
type Action = typeof ACTIONS[number];


export default function RoomPage() {
    const { room, user, dialog } = useContext(AppContext);
    const [messages, setMessages] = useState<Message[]>([]);
    const [yourText, setYourText] = useState<string>("");
    const [action, setAction] = useState<Action>("CREATE");

    const messageViewRef = useRef<HTMLDivElement>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    // const location = useLocation();
    // const navigate = useNavigate();
    // const [joinedRoomId, setJoinedRoomId] = useState<string | null>(null);
    // const [roomCount, setRoomCount] = useState(1);

    const resizeTextAreaHeight = () => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = "unset";
            textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
        }
    };

    const updateYourText = (text: string) => {
        setYourText(text);
        resizeTextAreaHeight();
    };

    const sendText = (text: string) => {
        let message: Message = {
            text: yourText,
            time: getTime(),
            isYours: true
        };

        if (room.id) {
            message = { ...message, userName: user.data.id };
        }

        if (text.trim() !== "") {
            setMessages([...messages, message]);
            setYourText("");
            textAreaRef.current!.value = "";
            resizeTextAreaHeight();
            scrollToBottom();
            textAreaRef.current!.focus();
            emitEvent("SEND_MESSAGE", message.text);
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



    const handleTyping = (event: React.KeyboardEvent) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            sendText(yourText);
        }
    };

    const receiveMessage = useCallback(
        (message: string) => {
            // setMessages([...messages, message]);
            scrollToBottom();
        },
        [messages]
    );

    const createRoom = () => {
        // navigate(`/${roomCount}`);
        // setRoomCount(roomCount + 1);
        // dialog.setIsShowed(false);
    };


    useEffect(() => {
        emitEvent("CREATE_ROOM");
        onEvent("CREATE_ROOM", (roomId) => console.log('Room Id: ', roomId));
    }, []);

    useEffect(() => {
        onEvent("RECEIVE_MESSAGE", (message) => receiveMessage(message));
    }, [receiveMessage]);

    useEffect(() => {
        const roomId = location.pathname === '/' ? undefined : location.pathname.replace('/', '');
        room.setId(roomId);
    }, [location]);

    useEffect(() => {
        if (room.id) {
            setMessages([]);
        } else {
            setMessages([
                { text: "Hi, welcome to Chat Dan", time: getTime() },
                { text: "You can chat with everyone here anonymously", time: getTime() }
            ]);
        }
        setYourText('');
    }, [room.id]);

    return (
        <div className="w-full h-full grid place-items-center bg-[var(--primary)] relative">

            {/* Background */}
            <div className="relative w-[80%] max-w-[450px] opacity-80 md:opacity-100">
                <img className="animate-spin animate-infinite animate-duration-[100s]" src={earthLogo} alt="Earth Logo" />
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-white w-max text-5xl md:text-6xl">{room.id ? `Room ${room.id.slice(0, 6)}` : 'Chat Dan'}</span>
            </div>

            {/* Content */}
            < div className="absolute inset-[10px] top-0 md:inset-x-[30px] md:bottom-[30px] flex flex-col justify-end items-center gap-[25px] md:gap-[40px]" >

                {/* Messages */}
                < div ref={messageViewRef} className="pt-[30px] w-full overflow-y-auto flex flex-col gap-[20px] scrollbar-none" >
                    {messages.map(({ text, time, userName, isYours }, index) => (
                        <ChatBubble key={index} text={text} time={time} userName={userName} end={isYours} styleBubble="md:max-w-[30%]" />
                    ))}
                </div >

                {/* Typing */}
                < div className="w-full flex rounded-[12px] shadow-inner shadow-slate-400 bg-white py-[8px] px-[12px] gap-[10px] md:max-w-[500px]" >
                    <textarea
                        ref={textAreaRef}
                        rows={1}
                        className="w-full outline-none resize-none bg-transparent max-h-[120px] md:max-h-[80px] pr-[10px] scrollbar-thin"
                        placeholder="Type your message here"
                        value={yourText}
                        onChange={(e) => updateYourText(e.target.value)}
                        onKeyDown={(e) => handleTyping(e)}>
                    </textarea>
                    <button
                        disabled={yourText.trim() === "" ? true : false}
                        className={`self-end text-[var(--secondary)] disabled:text-gray-500 font-bold enabled:hover:scale-110 transition-all`}
                        onClick={() => sendText(yourText)}>
                        Send
                    </button >
                </div >
            </div >

            {/* Action dialog */}
            <button className={`absolute top-0 w-[100px] h-[30px] bg-white shadow-md rounded-[24px] transition-all duration-500 ${dialog.isShowed ? "-translate-y-full" : "-translate-y-1/3"}`}
                onClick={() => dialog.setIsShowed(true)}>
            </button>
            <Dialog>
                <>
                    <div className="flex font-bold md:text-xl">
                        {ACTIONS.map((item, index) => (
                            <button
                                key={index}
                                className={`transition-all duration-200 flex-1 p-[15px] ${action === item ? 'text-[var(--secondary)]' : 'text-gray-400 bg-gray-100'}`}
                                onClick={() => setAction(item)}>
                                {(() => {
                                    switch (item) {
                                        case "JOIN":
                                            return 'Join Room';
                                        default:
                                            return 'Create Room';
                                    }
                                })()}
                            </button>
                        ))}
                    </div>
                    <div className="flex flex-col justify-center gap-[25px] p-[30px]">
                        <div className="md:min-h-[80px] grid place-items-center">
                            {!room.id && (
                                <>
                                    {action === "CREATE" && (
                                        <p className="text-center">Make a new room and invite your friend by sending them your room ID.</p>
                                    )}
                                    {action === "JOIN" && (
                                        <div className="flex flex-col gap-[20px] w-full">
                                            <p className="text-center">Join with your friend by entering room ID into the box below.</p>
                                            <input type="text" className="placeholder:text-center text-center w-full rounded-[12px] shadow-inner shadow-gray-400 outline-none py-[8px] px-[12px]" placeholder="Enter room ID here"
                                            // value={joinedRoomId || undefined}
                                            // onChange={e => setJoinedRoomId(e.target.value)} 
                                            />
                                        </div>
                                    )}
                                </>
                            )}
                            {room.id && (
                                <></>
                            )}
                        </div>
                        <div className="flex justify-center">
                            {action === "CREATE" && (
                                <button className="font-bold text-white bg-[var(--secondary)] px-[30px] py-[5px] rounded-[24px]"
                                    onClick={() => createRoom()}>Create</button>
                            )}
                            {action === "JOIN" && (
                                <button className={`font-bold text-white px-[30px] py-[5px] rounded-[24px] ${room ? 'bg-[var(--secondary)]' : 'bg-gray-500'}`}>Join</button>
                            )}
                        </div>
                    </div>
                </>
            </Dialog>
        </div >
    );
}
