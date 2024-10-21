import { BrowserRouter, createBrowserRouter, Route, Router, RouterProvider, Routes } from "react-router-dom";
import AppProvider from "./context";
import { AppLayout } from "./components";
import { GlobalPage, ChatPage } from "./pages";

export default function App() {
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
