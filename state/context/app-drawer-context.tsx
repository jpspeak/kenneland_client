import { createContext, useState } from "react";

interface IAppDrawerContext {
  isOpen: boolean;
  openDrawer?: () => void;
  closeDrawer: () => void;
}

const AppDrawerContext = createContext<IAppDrawerContext>({ isOpen: false, closeDrawer: () => {} });
export default AppDrawerContext;

export const AppDrawerContextProvider: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeDrawer = () => {
    setIsOpen(false);
  };
  const openDrawer = () => {
    setIsOpen(true);
  };
  return <AppDrawerContext.Provider value={{ isOpen, openDrawer, closeDrawer }}>{children}</AppDrawerContext.Provider>;
};
