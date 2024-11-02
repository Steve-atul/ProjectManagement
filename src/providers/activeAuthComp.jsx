import { useContext, createContext, useState, useEffect } from "react";

const ActiveAuthContext = createContext();

export const useActiveAuthComp = () => {
  return useContext(ActiveAuthContext);
};

export const ActiveAuthProvider = ({ children }) => {
  // 0 means Login, 1 means register
  const [activeAuthComp, setActiveAuthComp] = useState(
    localStorage.getItem("activeAuthComp") || 0
  );

  useEffect(() => {
    localStorage.setItem("activeAuthComp", activeAuthComp);
  }, [activeAuthComp]);

  return (
    <ActiveAuthContext.Provider value={{ activeAuthComp, setActiveAuthComp }}>
      {children}
    </ActiveAuthContext.Provider>
  );
};
