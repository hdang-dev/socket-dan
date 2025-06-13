import AppProvider from "./context";
import { Layout } from "./Layout";
import { LandingRoom, ChatRoom, CallRoom } from "./rooms";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="chat/:roomId" element={<ChatRoom />}></Route>
            <Route path="call/:roomId" element={<CallRoom />}></Route>
            <Route path="*" element={<Navigate to="/" />}></Route>
            <Route path="/" element={<LandingRoom />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
