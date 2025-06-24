import { useEffect } from "react";
import { useSocket } from "../socket";

export function ProtectedRoom({ children }: { children: React.ReactNode }) {
  const { isSocketConnected, roomId, connectSocket, joinSocketRoom } = useSocket();

  useEffect(() => {
    connectSocket(true).then(() => {
      joinSocketRoom(() => {});
    });
  }, []);

  return (
    <>
      <div>{"abc /" + isSocketConnected + "/" + roomId}</div>
      {isSocketConnected && roomId !== null ? (
        children
      ) : (
        <div className="size-full grid place-items-center">
          <div className="flex flex-col gap-4 items-center">
            <span className="loading loading-bars loading-xl"></span>
            <span>{!isSocketConnected ? "Connecting to Server" : roomId === null && "Connecting to Room"}</span>
          </div>
        </div>
      )}
    </>
  );
}
