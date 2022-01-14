import { io } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_API_SERVER_URL || "http://localhost:5000", {
  reconnection: true,
  reconnectionDelay: 500,
  reconnectionAttempts: 10
});

export default socket;
