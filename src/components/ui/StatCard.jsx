import React from 'react';

const StatCard = ({ title, value, icon: Icon, trend, trendValue, color = "var(--accent-primary)", progress }) => {
  return (
    <div className="glass-panel animate-fade-in-up" style={{
      borderRadius: '20px',
      padding: '26px',
      display: 'flex',
      flexDirection: 'column',
      gap: '18px',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'default',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid var(--border-color)',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-6px)';
      e.currentTarget.style.boxShadow = `0 20px 30px -10px ${color}35, 0 4px 12px -2px rgba(0, 0, 0, 0.2)`;
      e.currentTarget.style.borderColor = `${color}70`;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 20px -2px rgba(0, 0, 0, 0.2), 0 2px 6px -1px rgba(0, 0, 0, 0.1)';
      e.currentTarget.style.borderColor = 'var(--border-color)';
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '180px',
        height: '180px',
        background: `radial-gradient(circle at 100% 0%, ${color}20, transparent 70%)`,
        pointerEvents: 'none',
        borderRadius: '50%'
      }}></div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h3 style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: '600', marginBottom: '8px', letterSpacing: '0.025em', textTransform: 'uppercase' }}>
            {title}
          </h3>
          <p style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-primary)', letterSpacing: '-0.025em' }}>
            {value}
          </p>
        </div>
        {Icon && (
          <div style={{ 
            backgroundColor: `${color}15`, 
            padding: '14px', 
            borderRadius: '16px',
            color: color,
            border: `1px solid ${color}35`,
            boxShadow: `inset 0 0 16px ${color}15`,
            position: 'relative',
            zIndex: 1
          }}>
            <Icon size={26} />
          </div>
        )}
      </div>

      {progress !== undefined && (
        <div style={{ width: '100%', height: '6px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
          <div style={{ width: `${progress}%`, height: '100%', backgroundColor: color, borderRadius: '3px', transition: 'width 1s ease-in-out' }} />
        </div>
      )}

      {trend && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem' }}>
          <span style={{ 
            color: trend === 'up' ? '#10b981' : trend === 'down' ? '#ef4444' : 'var(--text-secondary)',
            fontWeight: '700',
            display: 'inline-flex',
            alignItems: 'center',
            backgroundColor: trend === 'up' ? 'rgba(16, 185, 129, 0.1)' : trend === 'down' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(255,255,255,0.05)',
            padding: '2px 8px',
            borderRadius: '6px'
          }}>
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : ''} {trendValue}
          </span>
          <span style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>vs last month</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;

