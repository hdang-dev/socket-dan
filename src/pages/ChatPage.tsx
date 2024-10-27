import { useContext, useEffect } from "react";
import { PlanetBackground, ChatLayout } from "../components";
import { Context } from "../store";
import { generateRoomId } from "../utils";

export function ChatPage() {
  const { dispatch } = useContext(Context);

  useEffect(() => {
    dispatch({ type: "JOIN_ROOM", room: { type: "chat", id: generateRoomId() } });
  }, [dispatch]);

  return (
    <PlanetBackground title="Chat Dan">
      <ChatLayout />
    </PlanetBackground>
  );
}
