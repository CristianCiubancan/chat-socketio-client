import { createContext } from "react";
import { io, Socket } from "socket.io-client";

export const socket = io(process.env.NEXT_PUBLIC_API_URL as string, {
  withCredentials: true,
});

export const SocketContext = createContext<Socket | null>(null);
