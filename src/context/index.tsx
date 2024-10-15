import { createContext, useEffect, useState } from "react";
import { emitEvent, onEvent } from "../socket";

interface AppContext {
  yourId: string | null;
  roomId: string;
  dialogVisible: boolean;
  updateRoomId: (roomId: string) => void;
  updateDialogVisible: (visible: boolean) => void;
}
export const GLOBAL_ROOM = " GLOBAL_ROOM";

const defaultContext: AppContext = {
  yourId: null,
  roomId: GLOBAL_ROOM,
  dialogVisible: false,
  updateRoomId: () => { },
  updateDialogVisible: () => { },
};

export const AppContext = createContext<AppContext>(defaultContext);

export default function AppProvider({ children }: { children: JSX.Element; }) {
  const [yourId, setYourId] = useState<string | null>(null);
  const [roomId, setRoomId] = useState<string>(GLOBAL_ROOM);
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);

  const updateRoomId = (roomId: string) => setRoomId(roomId);
  const updateDialogVisible = (visible: boolean) => setDialogVisible(visible);

  useEffect(() => {
    setYourId('dan');
    onEvent("GET_YOUR_ID", (yourId) => setYourId(yourId));
    emitEvent("JOIN_ROOM", GLOBAL_ROOM);
  }, []);

  return (
    <AppContext.Provider value={{ yourId, roomId, dialogVisible, updateRoomId, updateDialogVisible }}>
      {children}
    </AppContext.Provider>
  );
}
