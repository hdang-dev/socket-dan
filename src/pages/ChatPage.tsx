import { useContext, useEffect } from "react";
import { PlanetBackground, ChatLayout } from "../components";
import { AppContext } from "../context";

export function ChatPage() {
  const { updateRoomName } = useContext(AppContext);
  useEffect(() => {
    updateRoomName('Chat Room');
  }, [updateRoomName]);

  return (
    <PlanetBackground title="Chat Dan">
      <ChatLayout />
    </PlanetBackground>
  );
}
