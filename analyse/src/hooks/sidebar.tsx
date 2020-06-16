import React, {createContext, useState, useContext} from 'react';

interface SideBarContextData {
  open: boolean;
  changeState: () => void;
}

const SideBarContextData = createContext<SideBarContextData>(
  {} as SideBarContextData
);

export const SideBarProvider: React.FC = ({children}) => {
  const [open, setOpen] = useState(false);

  function changeState() {
    setOpen(!open);
  }

  return (
    <SideBarContextData.Provider value={{open, changeState}}>
      {children}
    </SideBarContextData.Provider>
  );
};

export function useSideBar() {
  const context = useContext(SideBarContextData);

  if (!context) {
    throw new Error('useAuth must be used from within an AuthProvider');
  }

  return context;
}
