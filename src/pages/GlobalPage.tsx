import { PlanetBackground, ChatLayout } from "../components";

export function GlobalPage() {
  return (
    <PlanetBackground title="Socket Dan">
      <ChatLayout initMessages={["Welcome to Socket Dan"]} />
    </PlanetBackground>
  );
}
