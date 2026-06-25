import React, { createContext, useContext, useState } from 'react';

const DashboardContext = createContext();

export const useDashboardContext = () => {
  return useContext(DashboardContext);
};

export const DashboardProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar toggle
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // Desktop mini sidebar toggle
  const [theme, setTheme] = useState('dark');
  const [searchQuery, setSearchQuery] = useState('');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New User Registered', desc: 'Alice Jenkins created a new account.', time: '5m ago', read: false },
    { id: 2, title: 'Revenue Milestone', desc: 'Monthly revenue exceeded $40,000!', time: '1h ago', read: false },
    { id: 3, title: 'System Update', desc: 'NexusDash v2.5 deployed successfully.', time: '2h ago', read: true },
  ]);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const toggleSidebarCollapsed = () => {
    setSidebarCollapsed(prev => !prev);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(prev => !prev);
    if (isProfileOpen) setIsProfileOpen(false);
  };

  const toggleProfile = () => {
    setIsProfileOpen(prev => !prev);
    if (isNotificationsOpen) setIsNotificationsOpen(false);
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const value = {
    isSidebarOpen,
    toggleSidebar,
    closeSidebar,
    sidebarCollapsed,
    toggleSidebarCollapsed,
    theme,
    setTheme,
    searchQuery,
    setSearchQuery,
    notifications,
    unreadCount,
    isNotificationsOpen,
    toggleNotifications,
    isProfileOpen,
    toggleProfile,
    markAllAsRead,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

