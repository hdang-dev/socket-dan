import AppProvider from "./context";
import { AppLayout } from "./layout";
import { GlobalRoom, ChatRoom } from "./rooms";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<GlobalRoom />} />
            <Route path="chat/:roomId" element={<ChatRoom />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
