import AppProvider from "./context";
import { AppLayout } from "./layout";
import { GlobalRoom, ChatRoom } from "./rooms";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    const calculateDocHeight = () => {
      document.documentElement.style.setProperty("--doc-height", `${window.innerHeight - 1}px`);
    };

    calculateDocHeight();
    window.addEventListener("resize", () => calculateDocHeight());
  }, []);
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<GlobalRoom />} />
            <Route path="chat/:roomId" element={<ChatRoom />} />
            <Route path="/*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
