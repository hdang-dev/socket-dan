import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppProvider from "./context";
import { RoomPage } from "./pages";

const router = createBrowserRouter([
  {path: '/', element: <RoomPage />},
  {path: '/:roomId', element: <RoomPage />}
])

export default function App() {
  return (
    <AppProvider>
      <div className="w-full h-full overflow-hidden">    
        <RouterProvider router={router}/>
      </div >
    </AppProvider>
  );
}
