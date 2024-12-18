import { io } from "socket.io-client";
import { SocketService } from "./service";

const socket = io(import.meta.env.VITE_SERVER_URL);
const socketService = new SocketService(socket);

export { socketService as socket };