import AppProvider from "./context";
import { Layout } from "./Layout";
import { RoomRoute } from "./rooms";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path=":roomType/:roomId" element={<RoomRoute />}></Route>
            <Route path="*" element={<Navigate to="chat/global" />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
