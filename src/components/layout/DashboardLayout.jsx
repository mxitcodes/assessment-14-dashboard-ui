import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useDashboardContext } from '../../context/DashboardContext';

const DashboardLayout = () => {
  const { sidebarCollapsed } = useDashboardContext();

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
      <Sidebar />
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }} className={`main-content ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <Header />
        <main style={{ 
          flex: 1, 
          padding: '32px 24px', 
          overflowX: 'hidden',
          backgroundColor: 'transparent',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <Outlet />
          </div>
        </main>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .main-content {
            margin-left: var(--sidebar-width);
          }
          .main-content.collapsed {
            margin-left: var(--sidebar-collapsed-width);
          }
        }
      `}</style>
    </div>
  );
};

export default DashboardLayout;

