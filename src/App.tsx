import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppProvider from "./context";
import { GlobalPage, RoomPage } from "./pages";
import { AppLayout } from "./components";

const router = createBrowserRouter([
  { path: "/", element: <GlobalPage /> },
  { path: "/chat/:roomId", element: <RoomPage /> },
]);

export default function App() {
  return (
    <AppProvider>
      <AppLayout>
        <RouterProvider router={router} />
      </AppLayout>
    </AppProvider>
  );
}
