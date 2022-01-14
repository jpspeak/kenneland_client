import { createContext, useState } from "react";
import { Dispatch, SetStateAction } from "react-transition-group/node_modules/@types/react";
import { Socket } from "socket.io-client";

export const SocketContext = createContext<{
  socket: Socket | undefined;
  setSocket: Dispatch<SetStateAction<Socket | undefined>>;
}>({ socket: undefined, setSocket: () => {} });
const SocketProvider: React.FC = ({ children }) => {
  const [socket, setSocket] = useState<Socket>();
  return <SocketContext.Provider value={{ socket, setSocket }}>{children}</SocketContext.Provider>;
};

export default SocketProvider;
