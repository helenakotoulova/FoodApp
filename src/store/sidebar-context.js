import { useState, createContext } from "react";

export const SideBarContext = createContext();

const SideBarProvider = ({ children }) => {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const openSidebar = () => {
    setSideBarOpen(true);
  };
  const closeSidebar = () => {
    setSideBarOpen(false);
  };

  const context = {
    sideBarOpen,
    openSidebar,
    closeSidebar,
  };
  return (
    <SideBarContext.Provider value={context}>{children}</SideBarContext.Provider>
  );
};

export default SideBarProvider;
