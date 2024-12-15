import AppProvider from "./context";
import { Layout } from "./Layout";
import {  ChatRoom, CallRoom } from "./rooms";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="chat/:roomId" element={<ChatRoom />} />
            <Route path="call/:roomId" element={<CallRoom />} />
            <Route path="*" element={<Navigate to="chat/global" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
