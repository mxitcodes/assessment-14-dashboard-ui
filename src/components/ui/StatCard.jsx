import React from 'react';

const StatCard = ({ title, value, icon: Icon, trend, trendValue, color = "var(--accent-primary)" }) => {
  return (
    <div style={{
      backgroundColor: 'var(--bg-secondary)',
      borderRadius: '12px',
      padding: '24px',
      border: '1px solid var(--border-color)',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      cursor: 'default',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'none';
      e.currentTarget.style.boxShadow = 'none';
    }}>
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
            backgroundColor: 'var(--bg-tertiary)', 
            padding: '10px', 
            borderRadius: '10px',
            color: color
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
