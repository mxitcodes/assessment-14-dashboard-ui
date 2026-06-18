import React, { createContext, useContext, useState } from 'react';

const DashboardContext = createContext();

export const useDashboardContext = () => {
  return useContext(DashboardContext);
};

export const DashboardProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [theme, setTheme] = useState('dark');

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const value = {
    isSidebarOpen,
    toggleSidebar,
    closeSidebar,
    theme,
    setTheme
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};
