import { createContext, useEffect, useState } from "react";
import { emitEvent, onEvent } from "../socket";

interface AppContext {
  yourId: string | null;
  roomId: string;
  dialogVisible: boolean;
  roomName: string;
  updateRoomId: (roomId: string) => void;
  updateDialogVisible: (visible: boolean) => void;
  updateRoomName: (name: string) => void;
}
export const GLOBAL_ROOM = " GLOBAL_ROOM";

const defaultContext: AppContext = {
  yourId: null,
  roomId: GLOBAL_ROOM,
  dialogVisible: false,
  roomName: 'Global Room',
  updateRoomId: () => { },
  updateDialogVisible: () => { },
  updateRoomName: () => { },
};

export const AppContext = createContext<AppContext>(defaultContext);

export default function AppProvider({ children }: { children: React.ReactNode; }) {
  const [yourId, setYourId] = useState<string | null>(null);
  const [roomId, setRoomId] = useState<string>(GLOBAL_ROOM);
  const [roomName, setRoomName] = useState<string>('Global Room');
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);

  const updateRoomId = (roomId: string) => setRoomId(roomId);
  const updateDialogVisible = (visible: boolean) => setDialogVisible(visible);
  const updateRoomName = (name: string) => setRoomName(name);

  useEffect(() => {
    setYourId('dan');
    onEvent("GET_YOUR_ID", (yourId) => setYourId(yourId));
    emitEvent("JOIN_ROOM", GLOBAL_ROOM);
  }, []);

  return (
    <AppContext.Provider value={{ yourId, roomId, dialogVisible, roomName, updateRoomId, updateDialogVisible, updateRoomName }}>
      {children}
    </AppContext.Provider>
  );
}
