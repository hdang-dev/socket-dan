import { createContext, useEffect, useState } from "react";
import { emitEvent, onEvent } from "../socket";

interface AppData {
  userId?: string;
  isDialogShowed: boolean;
}
interface AppContext {
  data: AppData;
  setData: (data: AppData) => void;
}

const defaultContext: AppContext = {
  data: { isDialogShowed: false },
  setData: () => {},
};

export const AppContext = createContext<AppContext>(defaultContext);

export default function AppProvider({ children }: { children: JSX.Element }) {
  const [data, setData] = useState<AppData>(defaultContext.data);
  const setContextData = (data: AppData) => {
    setData(data);
  };

  useEffect(() => {
    emitEvent("JOIN_APP");
    onEvent("JOIN_APP", (userId) => setData((prev) => ({ ...prev, id: userId })));
  }, []);

  return <AppContext.Provider value={{ data, setData: setContextData }}>{children}</AppContext.Provider>;
}
