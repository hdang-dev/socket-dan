import { useContext, useEffect } from "react";
import { PlanetBackground, ChatLayout } from "../components";
import { Context } from "../store";

export function GlobalPage() {
  const { dispatch } = useContext(Context);

  // const sendMessage = (message: string) => {};

  // const receiveMessage = (message: string) => {};

  useEffect(() => {
    dispatch({ type: "JOIN_ROOM", room: { type: "global", id: "global" } });
  }, [dispatch]);

  return (
    <PlanetBackground title="Socket Dan">
      <ChatLayout initMessages={["Welcome to Socket Dan"]} />
    </PlanetBackground>
  );
}
