import earthLogo from "/earth.svg";
import { ChatBubble, Dialog } from "../components";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { emitEvent, onEvent } from "../socket";
import { AppContext } from "../context";
import { useLocation, useNavigate} from "react-router-dom";

export default function RoomPage() {
    const [roomId, setRoomId] = useState<string| null>(null);
    const location = useLocation();
    const [messages, setMessages] = useState<string[]>([]);
    const [yourMessage, setYourMessage] = useState<string>("");
    const messageViewRef = useRef<HTMLDivElement>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    // const [userId, setUserId] = useState<string | null>(null);
    const [roomOption, setRoomOption] = useState<'create' | 'join'>('create');
    const [joinedRoomId, setJoinedRoomId] = useState<string | null>(null);
    const { dialog } = useContext(AppContext);
    const navigate = useNavigate();
    const [roomCount, setRoomCount] = useState(1);
    

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

    const createRoom = () => {
        navigate(`/${roomCount}`);
        setRoomCount(roomCount + 1);
        dialog.setIsShowed(false)
    }

    // useEffect(() => {
    //     console.log(userId);
    //     emitEvent("JOIN_APP");
    //     onEvent("USER_ID", (userId) => setUserId(userId));
    // }, []);

    useEffect(() => {
        onEvent("RECEIVE_MESSAGE", (message) => receiveMessage(message));
    }, [receiveMessage]); 

    useEffect(()=> {
        const roomId = location.pathname === '/' ? null : location.pathname.replace('/','');
        setRoomId(roomId);
    }, [location])

    useEffect(() => {
        if(roomId) {
            setMessages([]);
        } else {
            setMessages(["Hi, welcome to Chat Dan", "You can chat with everyone here anonymously"]);
        }
        setYourMessage('');
    }, [roomId])

    return (
        <div className="w-full h-full grid place-items-center bg-[var(--primary)] relative">
            {/* Background */}
            <div className="relative w-[80%] max-w-[450px] opacity-80 md:opacity-100">
                <img className="animate-spin animate-infinite animate-duration-[100s]" src={earthLogo} alt="earth-logo" />
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-white w-max text-5xl md:text-6xl">{roomId ? 'Room ' + roomId.slice(0, 6) : 'Chat Dan' }</span>
            </div>

            {/* Content */}
            < div className="absolute inset-[10px] top-0 md:inset-x-[30px] md:bottom-[30px] flex flex-col justify-end items-center gap-[25px] md:gap-[40px]" >
                {/* Messages */}
                < div ref={messageViewRef} className="pt-[30px] w-full overflow-y-auto flex flex-col gap-[20px] scrollbar-none" >
                    {
                        messages.map((message, index) => {
                            if (index % 2 === 0) {
                                return <ChatBubble key={index} text={message} styleWrapper="place-items-start" styleBubble="md:max-w-[30%]" />;
                            }
                            return <ChatBubble key={index} text={message} end styleWrapper="place-items-end" styleBubble="md:max-w-[30%]" />;

                        })}
                </div >

                {/* Typing */}
                < div className="w-full flex rounded-[12px] shadow-inner shadow-slate-400 bg-white py-[8px] px-[12px] gap-[10px] md:max-w-[500px]" >
                    <textarea
                        ref={textAreaRef}
                        rows={1}
                        className="w-full outline-none resize-none bg-transparent max-h-[120px] md:max-h-[80px] pr-[10px] scrollbar-thin scrollbar-thumb-[red]"
                        placeholder="Type your message here"
                        value={yourMessage}
                        onChange={(e) => updateYourMessage(e.target.value)}
                        onKeyDown={(e) => handleTyping(e)}></textarea>
                    <button
                        disabled={yourMessage.trim() === "" ? true : false}
                        className={`self-end text-[var(--secondary)] disabled:text-gray-500 font-bold enabled:hover:scale-110 transition-all`}
                        onClick={() => sendMessage(yourMessage)}>
                        Send
                    </button >
                </div >
            </div >

            {/* Options */}
            <button className={`absolute top-0 w-[100px] h-[30px] bg-white shadow-md rounded-[24px] transition-all duration-500 ${dialog.isShowed ? "-translate-y-full" : "-translate-y-1/3"}`}
                onClick={() => dialog.setIsShowed(true)}>
            </button>
            <Dialog>
                <>
                    <div className="flex font-bold md:text-xl">
                        <button className={`transition-all duration-200 w-1/2 p-[15px] ${roomOption === 'create' ? 'text-[var(--secondary)]' : 'text-gray-400 bg-gray-100'}`}
                            onClick={() => setRoomOption('create')}
                        >Create Room</button>
                        <button className={`transition-all duration-200 w-1/2 p-[15px] ${roomOption === 'join' ? 'text-[var(--secondary)]' : 'text-gray-400 bg-gray-100'}`}
                            onClick={() => setRoomOption('join')}
                        >Join Room</button>
                    </div>
                    <div className="flex flex-col justify-center gap-[25px] p-[30px]">
                        <div className="md:min-h-[80px] grid place-items-center">
                            {roomOption === 'create' ? (
                                <p className="text-center">Make a new room and invite your friend by sending them your room ID.</p>
                            ) : (
                                <div className="flex flex-col gap-[20px] w-full">
                                    <p className="text-center">Join with your friend by entering room ID into the box below.</p>
                                    <input type="text" className="placeholder:text-center text-center w-full rounded-[12px] shadow-inner shadow-gray-400 outline-none py-[8px] px-[12px]" placeholder="Enter room ID here"
                                        value={joinedRoomId || undefined}
                                        onChange={e => setJoinedRoomId(e.target.value)} />
                                </div>
                            )}
                        </div>
                        <div className="flex justify-center">
                            {roomOption === 'create' ? (
                                <button className="font-bold text-white bg-[var(--secondary)] px-[30px] py-[5px] rounded-[24px]"
                                onClick={() => createRoom()}>Create</button>
                            ) : (
                                <button className={`font-bold text-white px-[30px] py-[5px] rounded-[24px] ${joinedRoomId ? 'bg-[var(--secondary)]' : 'bg-gray-500'}`}>Join</button>
                            )}
                        </div>
                    </div>
                </>
            </Dialog>
        </div >
    );
}
