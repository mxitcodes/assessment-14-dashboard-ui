import React from 'react';
import { Menu, Search, Bell, User } from 'lucide-react';
import { useDashboardContext } from '../../context/DashboardContext';

const Header = () => {
  const { toggleSidebar } = useDashboardContext();

  return (
    <header style={{
      height: 'var(--header-height)',
      backgroundColor: 'rgba(15, 23, 42, 0.8)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-color)',
      position: 'sticky',
      top: 0,
      zIndex: 30,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button 
          onClick={toggleSidebar}
          style={{ color: 'var(--text-secondary)' }}
          className="md-hidden"
        >
          <Menu size={24} />
        </button>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: '8px',
          padding: '8px 12px',
          border: '1px solid var(--border-color)',
          width: '300px',
        }} className="search-bar">
          <Search size={18} style={{ color: 'var(--text-muted)', marginRight: '8px' }} />
          <input 
            type="text" 
            placeholder="Search..." 
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-primary)',
              outline: 'none',
              width: '100%',
              fontSize: '0.875rem'
            }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <button style={{ color: 'var(--text-secondary)', position: 'relative' }}>
          <Bell size={20} />
          <span style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '8px',
            height: '8px',
            backgroundColor: '#ef4444',
            borderRadius: '50%',
            border: '2px solid var(--bg-primary)'
          }}></span>
        </button>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
          <div style={{ textAlign: 'right' }} className="user-info">
            <div style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-primary)' }}>Xyz P</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Admin</div>
          </div>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'var(--accent-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: '600'
          }}>
            <User size={18} />
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .md-hidden {
            display: none;
          }
        }
        @media (max-width: 640px) {
          .search-bar {
            display: none !important;
          }
          .user-info {
            display: none;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
