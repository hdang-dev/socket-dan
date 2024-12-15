import { useEffect } from "react";

export const useRoomEvents = (roomType: string, roomId: string) =>
  useEffect(() => {
    console.log("join ", roomType, roomId);
    return () => {
      console.log("leave ", roomType, roomId);
    };
  }, [roomId]);
