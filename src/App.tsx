import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppProvider, { Context } from "./store";
import { AppLayout } from "./components";
import { GlobalPage, ChatPage } from "./pages";
import { useContext, useEffect } from "react";
import { onEvent } from "./socket";

export default function App() {
  const { dispatch } = useContext(Context);
  useEffect(() => {
    onEvent("GET_SOCKET_ID", (id) => dispatch({ type: "INIT_USER", user: { name: id, id: id } }));
  }, []);
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<GlobalPage />} />
            <Route path="chat/:roomId" element={<ChatPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
