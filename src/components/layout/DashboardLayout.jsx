import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const DashboardLayout = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
      <Sidebar />
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        transition: 'margin-left 0.3s ease-in-out',
      }} className="main-content">
        <Header />
        <main style={{ 
          flex: 1, 
          padding: '24px', 
          overflowX: 'hidden',
          backgroundColor: 'var(--bg-primary)'
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
        }
      `}</style>
    </div>
  );
};

export default DashboardLayout;
