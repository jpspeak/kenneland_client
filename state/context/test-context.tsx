import { createContext, FC, useState } from "react";
import { Dispatch, SetStateAction } from "react-transition-group/node_modules/@types/react";

export const TestContext = createContext({} as { isOpen: boolean; setIsOpen: Dispatch<SetStateAction<boolean>> });
const TestContextProvider: FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return <TestContext.Provider value={{ isOpen, setIsOpen }}>{children}</TestContext.Provider>;
};

export default TestContextProvider;
