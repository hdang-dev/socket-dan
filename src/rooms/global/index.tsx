// import { useContext, useEffect } from "react";
// import { ChatLayout } from "../../components";
// import { Context } from "../../context";
// import { emitEvent } from "../../socket";
import { ChatRoom } from "../chat";

export function GlobalRoom() {
  // const { dispatch } = useContext(Context);

  // const sendMessage = (message: string) => {};

  // const receiveMessage = (message: string) => {};

  // useEffect(() => {
  //   dispatch({ type: "JOIN_ROOM", room: { type: "global", id: "global" } });
  //   emitEvent("JOIN_ROOM", "global");
  // }, [dispatch]);

  return <ChatRoom />;
}
