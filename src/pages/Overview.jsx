import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, DollarSign, ShoppingBag, Activity } from 'lucide-react';
import StatCard from '../components/ui/StatCard';

const Overview = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch mock dashboard data using JSONPlaceholder
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Simulate a slight delay for realistic loading state
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // We'll use a few endpoints to simulate different stats
        const [usersRes, postsRes] = await Promise.all([
          axios.get('https://jsonplaceholder.typicode.com/users'),
          axios.get('https://jsonplaceholder.typicode.com/posts')
        ]);

        setData({
          totalUsers: usersRes.data.length * 142, // Multiplying for realistic look
          totalRevenue: 45231.89,
          activeProjects: postsRes.data.length,
          conversionRate: 3.24
        });
        setError(null);
      } catch (err) {
        setError('Failed to fetch dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <div style={{ 
          width: '40px', 
          height: '40px', 
          border: '3px solid var(--border-color)',
          borderTopColor: 'var(--accent-primary)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <style>{`
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        padding: '20px', 
        backgroundColor: 'rgba(239, 68, 68, 0.1)', 
        color: '#ef4444', 
        borderRadius: '8px',
        border: '1px solid rgba(239, 68, 68, 0.2)'
      }}>
        <h3 style={{ marginBottom: '8px' }}>Error</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: '700', marginBottom: '8px' }}>Dashboard Overview</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Welcome back! Here's what's happening today.</p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
        gap: '24px',
        marginBottom: '32px'
      }}>
        <StatCard 
          title="Total Revenue" 
          value={`$${data.totalRevenue.toLocaleString()}`} 
          icon={DollarSign}
          trend="up"
          trendValue="12.5%"
          color="#10b981"
        />
        <StatCard 
          title="Active Users" 
          value={data.totalUsers.toLocaleString()} 
          icon={Users}
          trend="up"
          trendValue="4.2%"
          color="#3b82f6"
        />
        <StatCard 
          title="Active Projects" 
          value={data.activeProjects.toLocaleString()} 
          icon={ShoppingBag}
          trend="down"
          trendValue="1.1%"
          color="#8b5cf6"
        />
        <StatCard 
          title="Conversion Rate" 
          value={`${data.conversionRate}%`} 
          icon={Activity}
          trend="up"
          trendValue="0.8%"
          color="#f59e0b"
        />
      </div>

      {/* Data Visualization Placeholder */}
      <div style={{
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: '12px',
        padding: '24px',
        border: '1px solid var(--border-color)',
        minHeight: '400px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '24px' }}>Revenue Overview</h3>
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px dashed var(--border-color)',
          borderRadius: '8px',
          color: 'var(--text-muted)'
        }}>
          [ Chart Placeholder - e.g. Recharts / Chart.js ]
        </div>
      </div>
    </div>
  );
};

export default Overview;
