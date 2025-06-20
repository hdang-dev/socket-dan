import { StoreProvider } from "./store";
import { SocketProvider } from "./socket";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./Layout";
import { LandingRoom, ChatRoom, CallRoom } from "./rooms";

export default function App() {
  return (
    <StoreProvider>
      <SocketProvider>
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
      </SocketProvider>
    </StoreProvider>
  );
}
