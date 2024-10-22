import { useContext, useEffect } from "react";
import { PlanetBackground, ChatLayout } from "../components";
import { AppContext } from "../context";

export function GlobalPage() {
  const { updateRoomName } = useContext(AppContext);
  useEffect(() => {
    updateRoomName('Global Room');
  }, [updateRoomName]);

  return (
    <PlanetBackground title="Socket Dan">
      <ChatLayout initMessages={["Welcome to Socket Dan"]} />
    </PlanetBackground>
  );
}
