import React from 'react';
import { Menu, Search, Bell, User, Check, Settings, LogOut, ChevronDown } from 'lucide-react';
import { useDashboardContext } from '../../context/DashboardContext';

const Header = () => {
  const { 
    toggleSidebar, 
    sidebarCollapsed, 
    toggleSidebarCollapsed, 
    searchQuery, 
    setSearchQuery,
    notifications,
    unreadCount,
    isNotificationsOpen,
    toggleNotifications,
    isProfileOpen,
    toggleProfile,
    markAllAsRead 
  } = useDashboardContext();

  return (
    <header style={{
      height: 'var(--header-height)',
      backgroundColor: 'rgba(11, 15, 25, 0.7)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border-color)',
      position: 'sticky',
      top: 0,
      zIndex: 30,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      transition: 'all 0.3s ease'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Mobile menu toggle */}
        <button 
          onClick={toggleSidebar}
          style={{ color: 'var(--text-secondary)', padding: '6px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)' }}
          className="md-hidden header-btn"
        >
          <Menu size={22} />
        </button>

        {/* Desktop sidebar collapse toggle */}
        <button 
          onClick={toggleSidebarCollapsed}
          style={{ color: 'var(--text-secondary)', padding: '8px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)' }}
          className="desktop-only header-btn"
          title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          <Menu size={20} />
        </button>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          borderRadius: '12px',
          padding: '10px 16px',
          border: '1px solid var(--border-color)',
          width: '320px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
        }} 
        className="search-bar"
        onFocusCapture={(e) => {
          e.currentTarget.style.borderColor = 'var(--accent-primary)';
          e.currentTarget.style.boxShadow = 'var(--glow-shadow)';
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
        }}
        onBlurCapture={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-color)';
          e.currentTarget.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.1)';
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
        }}>
          <Search size={18} style={{ color: 'var(--text-muted)', marginRight: '10px' }} />
          <input 
            type="text" 
            placeholder="Search products, users..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-primary)',
              outline: 'none',
              width: '100%',
              fontSize: '0.875rem'
            }}
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')} 
              style={{ color: 'var(--text-muted)', fontSize: '0.75rem', padding: '2px 6px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', position: 'relative' }}>
        {/* Notification Bell */}
        <div style={{ position: 'relative' }}>
          <button 
            onClick={toggleNotifications}
            style={{ 
              color: isNotificationsOpen ? 'var(--text-primary)' : 'var(--text-secondary)', 
              padding: '10px', 
              borderRadius: '12px', 
              background: isNotificationsOpen ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${isNotificationsOpen ? 'var(--accent-primary)' : 'var(--border-color)'}`,
              position: 'relative',
              transition: 'all 0.2s ease'
            }}
            className="header-btn"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-2px',
                right: '-2px',
                minWidth: '18px',
                height: '18px',
                padding: '0 5px',
                backgroundColor: '#ef4444',
                color: 'white',
                fontSize: '0.65rem',
                fontWeight: 'bold',
                borderRadius: '9px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid var(--bg-primary)',
                boxShadow: '0 0 10px rgba(239, 68, 68, 0.5)'
              }}>
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {isNotificationsOpen && (
            <div className="glass-dropdown animate-scale-in" style={{
              position: 'absolute',
              top: 'calc(100% + 12px)',
              right: 0,
              width: '360px',
              borderRadius: '16px',
              padding: '20px',
              zIndex: 100,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                <span style={{ fontWeight: '700', fontSize: '1.05rem', color: 'var(--text-primary)' }}>Notifications</span>
                {unreadCount > 0 && (
                  <button 
                    onClick={markAllAsRead}
                    style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '600' }}
                  >
                    <Check size={14} /> Mark all read
                  </button>
                )}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '320px', overflowY: 'auto' }}>
                {notifications.map((item) => (
                  <div key={item.id} style={{ 
                    padding: '12px', 
                    borderRadius: '12px', 
                    background: item.read ? 'rgba(255, 255, 255, 0.02)' : 'rgba(99, 102, 241, 0.08)',
                    border: `1px solid ${item.read ? 'transparent' : 'rgba(99, 102, 241, 0.2)'}`,
                    transition: 'all 0.2s'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                      <h4 style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)' }}>{item.title}</h4>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{item.time}</span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* User Profile */}
        <div style={{ position: 'relative' }}>
          <div 
            onClick={toggleProfile}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px', 
              cursor: 'pointer',
              padding: '6px 12px',
              borderRadius: '16px',
              background: isProfileOpen ? 'rgba(255,255,255,0.05)' : 'transparent',
              border: `1px solid ${isProfileOpen ? 'var(--border-highlight)' : 'transparent'}`,
              transition: 'all 0.2s ease'
            }}
            className="profile-trigger"
          >
            <div style={{ textAlign: 'right' }} className="user-info">
              <div style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)' }}>Xyz P</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', fontWeight: '500' }}>Admin</div>
            </div>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: '600',
              boxShadow: '0 4px 12px rgba(236, 72, 153, 0.35)'
            }}>
              <User size={18} />
            </div>
            <ChevronDown size={16} style={{ color: 'var(--text-secondary)', transform: isProfileOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }} />
          </div>

          {/* Profile Dropdown */}
          {isProfileOpen && (
            <div className="glass-dropdown animate-scale-in" style={{
              position: 'absolute',
              top: 'calc(100% + 12px)',
              right: 0,
              width: '240px',
              borderRadius: '16px',
              padding: '8px',
              zIndex: 100,
            }}>
              <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-color)', marginBottom: '8px' }}>
                <p style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)' }}>Xyz Patel</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>admin@nexusdash.com</p>
              </div>
              <button style={{ 
                width: '100%', 
                padding: '10px 16px', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px', 
                fontSize: '0.875rem', 
                color: 'var(--text-secondary)', 
                borderRadius: '10px',
                transition: 'all 0.2s' 
              }} className="dropdown-item">
                <Settings size={18} /> Account Settings
              </button>
              <button style={{ 
                width: '100%', 
                padding: '10px 16px', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px', 
                fontSize: '0.875rem', 
                color: '#ef4444', 
                borderRadius: '10px',
                transition: 'all 0.2s' 
              }} className="dropdown-item">
                <LogOut size={18} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .header-btn:hover {
          background-color: rgba(255, 255, 255, 0.08) !important;
          color: var(--text-primary) !important;
        }
        .profile-trigger:hover {
          background-color: rgba(255, 255, 255, 0.03);
        }
        .dropdown-item:hover {
          background-color: rgba(255, 255, 255, 0.05);
          color: var(--text-primary);
        }
        @media (min-width: 768px) {
          .md-hidden {
            display: none !important;
          }
        }
        @media (max-width: 767px) {
          .desktop-only {
            display: none !important;
          }
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

