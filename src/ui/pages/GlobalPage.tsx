import { PlanetBackground } from "../backgrounds";
import { ChatLayout } from "../layouts";

export function GlobalPage() {
  return (
    <PlanetBackground title="Socket Dan">
      <ChatLayout initMessages={["Welcome to Socket Dan"]} />
    </PlanetBackground>
  );
}
