import AppProvider from "./context";
import { Layout } from "./Layout";
import { GlobalRoom, ChatRoom, CallRoom } from "./rooms";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    const calculateDocHeight = () => {
      document.documentElement.style.setProperty("--doc-height", `${window.innerHeight}px`);
    };

    calculateDocHeight();
    window.addEventListener("resize", () => calculateDocHeight());
  }, []);
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route element={}>
              <Route path="/" element={<GlobalRoom />} />
              <Route path="chat/:roomId" element={<ChatRoom />} />
              <Route path="call/:roomId" element={<CallRoom />} />
              <Route path="/*" element={<Navigate to="/" />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
