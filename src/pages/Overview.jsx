import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, DollarSign, ShoppingBag, Activity } from 'lucide-react';
import StatCard from '../components/ui/StatCard';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 5000 },
  { name: 'Apr', revenue: 4500 },
  { name: 'May', revenue: 6000 },
  { name: 'Jun', revenue: 5500 },
  { name: 'Jul', revenue: 7000 },
];

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
    <div className="animate-fade-in-up">
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '8px', background: 'linear-gradient(to right, var(--text-primary), var(--text-muted))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Dashboard Overview</h1>
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
      <div className="glass-panel" style={{
        borderRadius: '16px',
        padding: '24px',
        minHeight: '400px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 10px 30px -10px rgba(0,0,0,0.3)',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '50%',
          height: '50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: -1
        }}></div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '24px' }}>Revenue Overview</h3>
        <div style={{ flex: 1, width: '100%', height: '100%', minHeight: '300px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--accent-primary)" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
              <XAxis dataKey="name" stroke="var(--text-muted)" tick={{ fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis stroke="var(--text-muted)" tick={{ fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(11, 15, 25, 0.9)', 
                  borderColor: 'var(--border-color)',
                  borderRadius: '8px',
                  backdropFilter: 'blur(8px)',
                  color: 'var(--text-primary)'
                }}
                itemStyle={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}
              />
              <Area type="monotone" dataKey="revenue" stroke="var(--accent-primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Overview;
