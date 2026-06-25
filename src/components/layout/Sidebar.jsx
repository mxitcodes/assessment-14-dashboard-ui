import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, Users, Settings, X, Activity, ShieldCheck } from 'lucide-react';
import { useDashboardContext } from '../../context/DashboardContext';

const navItems = [
  { name: 'Overview', path: '/dashboard/overview', icon: LayoutDashboard },
  { name: 'Products', path: '/dashboard/products', icon: ShoppingCart },
  { name: 'Users', path: '/dashboard/users', icon: Users },
];

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar, sidebarCollapsed } = useDashboardContext();

  const sidebarStyle = {
    width: sidebarCollapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)',
    height: '100vh',
    backgroundColor: 'rgba(11, 15, 25, 0.75)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderRight: '1px solid var(--border-color)',
    position: 'fixed',
    top: 0,
    left: isSidebarOpen ? 0 : '-100%',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(4px)',
    zIndex: 40,
    display: isSidebarOpen ? 'block' : 'none',
    transition: 'opacity 0.3s',
  };

  return (
    <>
      <div style={overlayStyle} onClick={closeSidebar} className="sidebar-overlay" />
      <aside style={sidebarStyle} className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div style={{
          height: 'var(--header-height)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: sidebarCollapsed ? 'center' : 'space-between',
          padding: sidebarCollapsed ? '0' : '0 24px',
          borderBottom: '1px solid var(--border-color)',
          transition: 'all 0.3s ease'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-tertiary))',
              padding: '8px',
              borderRadius: '10px',
              color: 'white',
              boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
            }}>
              <Activity size={20} />
            </div>
            {!sidebarCollapsed && (
              <span style={{ fontSize: '1.25rem', fontWeight: '800', letterSpacing: '-0.025em', color: 'var(--text-primary)' }}>
                Nexus<span style={{ color: 'var(--accent-primary)' }}>Dash</span>
              </span>
            )}
          </div>
          {/* Mobile close button */}
          <button 
            onClick={closeSidebar} 
            className="md-hidden"
            style={{ color: 'var(--text-secondary)', padding: '4px' }}
          >
            <X size={20} />
          </button>
        </div>

        <nav style={{ padding: sidebarCollapsed ? '24px 12px' : '24px 16px', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
          {!sidebarCollapsed && (
            <div style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px', paddingLeft: '8px' }}>
              Menu
            </div>
          )}
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              title={sidebarCollapsed ? item.name : undefined}
              onClick={() => {
                 if (window.innerWidth < 768) closeSidebar();
              }}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                gap: '14px',
                padding: sidebarCollapsed ? '14px 0' : '12px 18px',
                borderRadius: '12px',
                color: isActive ? '#ffffff' : 'var(--text-secondary)',
                background: isActive ? 'linear-gradient(90deg, rgba(99,102,241,0.18) 0%, rgba(99,102,241,0.05) 100%)' : 'transparent',
                borderLeft: isActive ? '3px solid var(--accent-primary)' : '3px solid transparent',
                transition: 'all 0.2s ease',
                fontWeight: isActive ? '600' : '500',
                position: 'relative'
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
              <item.icon size={22} style={{ color: 'inherit' }} />
              {!sidebarCollapsed && <span>{item.name}</span>}
            </NavLink>
          ))}
        </nav>

        {!sidebarCollapsed && (
          <div style={{ padding: '16px', margin: '16px', borderRadius: '14px', background: 'rgba(99, 102, 241, 0.05)', border: '1px solid rgba(99, 102, 241, 0.15)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <ShieldCheck size={18} style={{ color: '#10b981' }} />
              <span style={{ fontSize: '0.825rem', fontWeight: '600', color: 'var(--text-primary)' }}>All Systems Normal</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Updated 3m ago via Nexus AI</p>
          </div>
        )}

        <div style={{ padding: sidebarCollapsed ? '16px 12px' : '20px 16px', borderTop: '1px solid var(--border-color)' }}>
          <a
            href="#"
            title={sidebarCollapsed ? "Settings" : undefined}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
              gap: '14px',
              padding: sidebarCollapsed ? '12px 0' : '12px 18px',
              borderRadius: '12px',
              color: 'var(--text-secondary)',
              transition: 'all 0.2s ease',
              fontWeight: '500'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'var(--text-secondary)';
            }}
          >
            <Settings size={22} />
            {!sidebarCollapsed && <span>Settings</span>}
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
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default Sidebar;

