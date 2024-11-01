import AppProvider from "./context";
import { AppLayout } from "./layout";
import { GlobalRoom, ChatRoom } from "./rooms";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<GlobalRoom />} />
            <Route path="chat/:roomId" element={<ChatRoom />} />
            <Route path="/*" element={<Navigate to='/' />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
