import React from 'react';

const StatCard = ({ title, value, icon: Icon, trend, trendValue, color = "var(--accent-primary)" }) => {
  return (
    <div className="glass-panel animate-fade-in-up" style={{
      borderRadius: '16px',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'default',
      position: 'relative',
      overflow: 'hidden',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = `0 12px 24px -8px ${color}40, 0 4px 6px -1px rgba(0, 0, 0, 0.1)`;
      e.currentTarget.style.borderColor = `${color}80`;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
      e.currentTarget.style.borderColor = 'var(--border-color)';
    }}>
      <div style={{
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        width: '200%',
        height: '200%',
        background: `radial-gradient(circle at 50% 0%, ${color}15, transparent 50%)`,
        pointerEvents: 'none',
      }}></div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h3 style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: '500', marginBottom: '8px' }}>
            {title}
          </h3>
          <p style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--text-primary)' }}>
            {value}
          </p>
        </div>
        {Icon && (
          <div style={{ 
            backgroundColor: `${color}15`, 
            padding: '12px', 
            borderRadius: '12px',
            color: color,
            border: `1px solid ${color}30`,
            boxShadow: `inset 0 0 12px ${color}10`,
            position: 'relative',
            zIndex: 1
          }}>
            <Icon size={24} />
          </div>
        )}
      </div>
      {trend && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.875rem' }}>
          <span style={{ 
            color: trend === 'up' ? '#10b981' : trend === 'down' ? '#ef4444' : 'var(--text-secondary)',
            fontWeight: '600'
          }}>
            {trend === 'up' ? '+' : trend === 'down' ? '-' : ''}{trendValue}
          </span>
          <span style={{ color: 'var(--text-secondary)' }}>vs last month</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
