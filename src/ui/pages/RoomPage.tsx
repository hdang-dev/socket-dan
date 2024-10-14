import { PlanetLayout } from "../layouts";
import { ChatBubble, Dialog } from "../components";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { emitEvent, onEvent } from "../../socket";
import { AppContext } from "../../context";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { checkRoomId, getTime } from "../../utils";

interface Message {
  text: string;
  time: string;
  userId: string;
}

const ACTIONS = ["JOIN"] as const;
type Action = (typeof ACTIONS)[number];

export function RoomPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [valid, setValid] = useState(false);

  const { yourId, dialogVisible, updateRoomId, updateDialogVisible } = useContext(AppContext);
  const [messages, setMessages] = useState<Message[]>([]);
  const [yourText, setYourText] = useState<string>("");
  const [action, setAction] = useState<Action>("JOIN");

  const messageViewRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const [joinedRoomId, setJoinedRoomId] = useState<string>("");
  // const [roomCount, setRoomCount] = useState(1);

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

  const sendMessage = (text: string) => {
    if (yourId && text.trim() !== "") {
      setMessages([...messages, { text: yourText, time: getTime(), userId: yourId }]);
      setYourText("");
      scrollToBottom();
      textAreaRef.current!.value = "";
      textAreaRef.current!.focus();
      resizeTextBox();
      // emitEvent("SEND_MESSAGE", roomId!);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage(yourText);
    }
  };

  const handleChangeText = (text: string) => {
    setYourText(text);
    resizeTextBox();
  };

  const joinRoom = () => {
    window.location.href = `/${joinedRoomId}`;
    // if (joinedRoomId) {
    //   emitEvent("JOIN_ROOM", joinedRoomId);
    //   updateRoomId(joinedRoomId);
    //   // navigate(`/${joinedRoomId}`);
    //   updateDialogVisible(false);
    // }
  };

  useEffect(() => {
    // if (roomId) {
    //   const validation = checkRoomId(roomId, 4);
    //   if (validation === "ok_but_start_with_0") navigate(`/${Number(roomId)}`);
    //   if (validation === "invalid" || validation === "length_exceed") navigate("/");
    //   if (validation === "valid") setValid(true);
    // } else {
    //   navigate("/");
    // }
  }, []);

  // useEffect(() => {
  //     onEvent("RECEIVE_MESSAGE", (message) => receiveMessage(message));
  // }, [receiveMessage]);

  useEffect(() => {
    // const roomId = location.pathname === '/' ? undefined : location.pathname.replace('/', '');
    // room.setId(roomId);
  }, [location]);

  // useEffect(() => {
  //     if (room.id) {
  //         setMessages([]);
  //     } else {
  //         setMessages([
  //             { text: "Hi, welcome to Chat Dan", time: getTime() },
  //             { text: "You can chat with everyone here anonymously", time: getTime() }
  //         ]);
  //     }
  //     setYourText('');
  // }, [room.id]);

  return (
    <PlanetLayout>
      <>
        {/* Content */}
        <div className="absolute inset-[10px] top-0 md:inset-x-[30px] md:bottom-[30px] flex flex-col justify-end items-center gap-[25px] md:gap-[40px]">
          {/* Messages */}
          <div ref={messageViewRef} className="pt-[30px] w-full overflow-y-auto flex flex-col gap-[20px] scrollbar-none">
            {messages.map(({ text, time, userId }, index) => (
              <ChatBubble key={index} text={text} time={time} userName={`User ${userId.slice(0, 6)}`} end={userId === yourId} styleBubble="md:max-w-[30%]" />
            ))}
          </div>

          {/* Typing */}
          <div className="w-full flex rounded-[12px] shadow-inner shadow-slate-400 bg-white py-[8px] px-[12px] gap-[10px] md:max-w-[500px]">
            <textarea
              ref={textAreaRef}
              rows={1}
              className="w-full outline-none resize-none bg-transparent max-h-[120px] md:max-h-[80px] pr-[10px] scrollbar-thin"
              placeholder="Type your message here"
              value={yourText}
              onChange={(e) => handleChangeText(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e)}></textarea>
            <button
              disabled={yourText.trim() === "" ? true : false}
              className={`self-end text-[var(--secondary)] disabled:text-gray-500 font-bold enabled:hover:scale-110 transition-all`}
              onClick={() => sendMessage(yourText)}>
              Send
            </button>
          </div>
        </div>

        {/* Action dialog */}
        <button
          className={`absolute top-0 w-[100px] h-[30px] bg-white shadow-md rounded-[24px] transition-all duration-500 ${dialogVisible ? "-translate-y-full" : "-translate-y-1/3"}`}
          onClick={() => updateDialogVisible(true)}></button>
        <Dialog>
          <>
            <div className="flex font-bold md:text-xl">
              {ACTIONS.map((item, index) => (
                <button
                  key={index}
                  className={`transition-all duration-200 flex-1 p-[15px] ${action === item ? "text-[var(--secondary)]" : "text-gray-400 bg-gray-100"}`}
                  onClick={() => setAction(item)}>
                  {(() => {
                    switch (item) {
                      case "JOIN":
                        return "Join Room";
                      default:
                        return "Create Room";
                    }
                  })()}
                </button>
              ))}
            </div>
            <div className="flex flex-col justify-center gap-[25px] p-[30px]">
              <div className="md:min-h-[80px] grid place-items-center">
                {/* {action === "CREATE" && (
                                <p className="text-center">Make a new room and invite your friend by sending them your room ID.</p>
                            )} */}
                {action === "JOIN" && (
                  <div className="flex flex-col gap-[20px] w-full">
                    <p className="text-center">Join with your friend by entering room ID into the box below.</p>
                    <input
                      type="text"
                      className="placeholder:text-center text-center w-full rounded-[12px] shadow-inner shadow-gray-400 outline-none py-[8px] px-[12px]"
                      placeholder="Enter room ID here"
                      value={joinedRoomId}
                      onChange={(e) => setJoinedRoomId(e.target.value)}
                    />
                  </div>
                )}
              </div>
              <div className="flex justify-center">
                {/* {action === "CREATE" && (
                                <button className="font-bold text-white bg-[var(--secondary)] px-[30px] py-[5px] rounded-[24px]"
                                    onClick={() => createRoom()}>Create</button>
                            )} */}
                {action === "JOIN" && (
                  <button className={`font-bold text-white px-[30px] py-[5px] rounded-[24px] ${roomId ? "bg-[var(--secondary)]" : "bg-gray-500"}`} onClick={() => joinRoom()}>
                    Join
                  </button>
                )}
              </div>
            </div>
          </>
        </Dialog>
      </>
    </PlanetLayout>
  );
}
