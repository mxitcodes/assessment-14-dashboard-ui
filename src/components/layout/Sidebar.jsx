import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, Users, Settings, X, Activity } from 'lucide-react';
import { useDashboardContext } from '../../context/DashboardContext';

const navItems = [
  { name: 'Overview', path: '/dashboard/overview', icon: LayoutDashboard },
  { name: 'Products', path: '/dashboard/products', icon: ShoppingCart },
  { name: 'Users', path: '/dashboard/users', icon: Users },
];

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useDashboardContext();

  const sidebarStyle = {
    width: 'var(--sidebar-width)',
    height: '100vh',
    backgroundColor: 'rgba(11, 15, 25, 0.6)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    borderRight: '1px solid var(--border-color)',
    position: 'fixed',
    top: 0,
    left: isSidebarOpen ? 0 : '-100%',
    transition: 'left 0.3s ease-in-out',
    zIndex: 50,
    display: 'flex',
    flexDirection: 'column',
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 40,
    display: isSidebarOpen ? 'block' : 'none',
    transition: 'opacity 0.3s',
  };

  return (
    <>
      <div style={overlayStyle} onClick={closeSidebar} className="sidebar-overlay" />
      <aside style={sidebarStyle} className="sidebar">
        <div style={{
          height: 'var(--header-height)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          borderBottom: '1px solid var(--border-color)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              background: 'linear-gradient(135deg, var(--accent-primary), #8b5cf6)',
              padding: '6px',
              borderRadius: '8px',
              color: 'white'
            }}>
              <Activity size={20} />
            </div>
            <span style={{ fontSize: '1.25rem', fontWeight: '700', letterSpacing: '-0.025em' }}>Nexus<span style={{ color: 'var(--accent-primary)' }}>Dash</span></span>
          </div>
          {/* Mobile close button */}
          <button 
            onClick={closeSidebar} 
            className="md-hidden"
            style={{ color: 'var(--text-secondary)' }}
          >
            <X size={20} />
          </button>
        </div>

        <nav style={{ padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
          <div style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px', paddingLeft: '8px' }}>
            Menu
          </div>
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => {
                 if (window.innerWidth < 768) closeSidebar();
              }}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '12px',
                color: isActive ? '#ffffff' : 'var(--text-secondary)',
                background: isActive ? 'linear-gradient(90deg, rgba(99,102,241,0.15) 0%, transparent 100%)' : 'transparent',
                borderLeft: isActive ? '3px solid var(--accent-primary)' : '3px solid transparent',
                transition: 'all 0.2s ease',
                fontWeight: isActive ? '500' : '400',
              })}
              onMouseEnter={(e) => {
                if(e.currentTarget.style.background === 'transparent') {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                }
              }}
              onMouseLeave={(e) => {
                if(e.currentTarget.style.background === 'rgba(255, 255, 255, 0.03)') {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }
              }}
            >
              <item.icon size={20} style={{ color: 'inherit' }} />
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div style={{ padding: '24px 16px', borderTop: '1px solid var(--border-color)' }}>
          <a
            href="#"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: '8px',
              color: 'var(--text-secondary)',
              transition: 'all 0.2s ease',
            }}
          >
            <Settings size={20} />
            Settings
          </a>
        </div>
      </aside>

      <style>{`
        @media (min-width: 768px) {
          .sidebar {
            left: 0 !important;
          }
          .sidebar-overlay {
            display: none !important;
          }
          .md-hidden {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default Sidebar;
