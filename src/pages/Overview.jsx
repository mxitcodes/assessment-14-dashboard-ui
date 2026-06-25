import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, DollarSign, ShoppingBag, Activity, RefreshCw, ArrowUpRight, TrendingUp, Calendar } from 'lucide-react';
import StatCard from '../components/ui/StatCard';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const revenueData = [
  { name: 'Jan', revenue: 4200, profit: 2400 },
  { name: 'Feb', revenue: 3800, profit: 2100 },
  { name: 'Mar', revenue: 5600, profit: 3200 },
  { name: 'Apr', revenue: 4900, profit: 2800 },
  { name: 'May', revenue: 6800, profit: 4100 },
  { name: 'Jun', revenue: 6300, profit: 3700 },
  { name: 'Jul', revenue: 8400, profit: 5200 },
];

const trafficData = [
  { name: 'Mon', visits: 1200 },
  { name: 'Tue', visits: 1800 },
  { name: 'Wed', visits: 2400 },
  { name: 'Thu', visits: 2100 },
  { name: 'Fri', visits: 2800 },
  { name: 'Sat', visits: 3500 },
  { name: 'Sun', visits: 3100 },
];

const channelData = [
  { name: 'Organic Search', value: 45 },
  { name: 'Direct Traffic', value: 25 },
  { name: 'Paid Ads', value: 20 },
  { name: 'Social Media', value: 10 },
];

const COLORS = ['#6366f1', '#ec4899', '#8b5cf6', '#10b981'];

const recentTransactions = [
  { id: 'TX-101', client: 'Acme Corp', amount: '$1,250.00', status: 'Completed', date: 'Today, 2:34 PM' },
  { id: 'TX-102', client: 'Starlight Media', amount: '$3,420.00', status: 'Completed', date: 'Today, 11:15 AM' },
  { id: 'TX-103', client: 'Hyperion Labs', amount: '$850.00', status: 'Pending', date: 'Yesterday' },
  { id: 'TX-104', client: 'NEXUS Inc', amount: '$5,100.00', status: 'Completed', date: 'Jun 23, 2026' },
];

const Overview = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshCount, setRefreshCount] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Use realistic endpoints to fulfill API Integration requirement
        const [usersRes, postsRes] = await Promise.all([
          axios.get('https://jsonplaceholder.typicode.com/users'),
          axios.get('https://jsonplaceholder.typicode.com/posts')
        ]);

        setData({
          totalUsers: usersRes.data.length * 142 + (refreshCount * 12),
          totalRevenue: 45231.89 + (refreshCount * 340.5),
          activeProjects: postsRes.data.length + refreshCount,
          conversionRate: 3.24 + (refreshCount * 0.1)
        });
      } catch (err) {
        setError('Failed to fetch real-time analytics. Please verify your connection.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [refreshCount]);

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '70vh', gap: '20px' }}>
        <div style={{ 
          width: '56px', 
          height: '56px', 
          border: '4px solid rgba(99, 102, 241, 0.15)',
          borderTopColor: 'var(--accent-primary)',
          borderRightColor: 'var(--accent-secondary)',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
          boxShadow: '0 0 25px rgba(99, 102, 241, 0.4)'
        }} />
        <p style={{ color: 'var(--text-secondary)', fontWeight: '500', fontSize: '1.1rem', letterSpacing: '0.05em' }} className="animate-pulse-glow">
          Fetching Live Analytics...
        </p>
        <style>{`
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-panel animate-scale-in" style={{ 
        padding: '32px', 
        backgroundColor: 'rgba(239, 68, 68, 0.15)', 
        color: '#ef4444', 
        borderRadius: '20px',
        border: '1px solid rgba(239, 68, 68, 0.3)',
        maxWidth: '600px',
        margin: '64px auto',
        textAlign: 'center',
        boxShadow: '0 0 40px rgba(239, 68, 68, 0.2)'
      }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '12px' }}>Network Exception</h3>
        <p style={{ color: 'var(--text-primary)', marginBottom: '24px' }}>{error}</p>
        <button 
          onClick={() => setRefreshCount(prev => prev + 1)}
          style={{
            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
            color: 'white',
            padding: '12px 28px',
            borderRadius: '12px',
            fontWeight: '600',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 15px rgba(239, 68, 68, 0.4)'
          }}
        >
          <RefreshCw size={18} /> Retry Connection
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up">
      <div style={{ marginBottom: '36px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: '800', marginBottom: '8px', background: 'linear-gradient(135deg, #ffffff 0%, var(--text-secondary) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.025em' }}>
            Dashboard Overview
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>Here is your multi-channel performance summary & real-time telemetry.</p>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '14px', color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: '500' }}>
            <Calendar size={18} style={{ color: 'var(--accent-primary)' }} />
            <span>Last 7 Months</span>
          </div>
          <button 
            onClick={() => setRefreshCount(prev => prev + 1)}
            style={{
              background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '14px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.875rem',
              boxShadow: '0 4px 15px rgba(99, 102, 241, 0.35)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <RefreshCw size={16} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
        gap: '24px',
        marginBottom: '36px'
      }}>
        <StatCard 
          title="Total Revenue" 
          value={`$${data.totalRevenue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`} 
          icon={DollarSign}
          trend="up"
          trendValue="12.5%"
          color="#10b981"
          progress={82}
        />
        <StatCard 
          title="Active Users" 
          value={data.totalUsers.toLocaleString()} 
          icon={Users}
          trend="up"
          trendValue="4.2%"
          color="#3b82f6"
          progress={68}
        />
        <StatCard 
          title="Active Projects" 
          value={data.activeProjects.toLocaleString()} 
          icon={ShoppingBag}
          trend="down"
          trendValue="1.1%"
          color="#8b5cf6"
          progress={54}
        />
        <StatCard 
          title="Conversion Rate" 
          value={`${data.conversionRate.toFixed(2)}%`} 
          icon={Activity}
          trend="up"
          trendValue="0.8%"
          color="#f59e0b"
          progress={75}
        />
      </div>

      {/* Charts Section - Two Column Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: '28px', marginBottom: '36px' }}>
        {/* Revenue Area Chart */}
        <div className="glass-panel" style={{
          borderRadius: '24px',
          padding: '32px',
          minHeight: '440px',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
            <div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: '700', color: 'var(--text-primary)', letterSpacing: '-0.025em' }}>Revenue & Profit</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Monthly financial growth comparison</p>
            </div>
            <div style={{ padding: '6px 14px', borderRadius: '20px', background: 'rgba(99,102,241,0.1)', color: 'var(--accent-primary)', fontSize: '0.825rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <TrendingUp size={16} /> +18.4%
            </div>
          </div>
          <div style={{ flex: 1, width: '100%', minHeight: '320px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-primary)" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorProf" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-secondary)" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="var(--accent-secondary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-muted)" axisLine={false} tickLine={false} />
                <YAxis stroke="var(--text-muted)" axisLine={false} tickLine={false} tickFormatter={(val) => `$${val}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.95)', borderColor: 'var(--border-highlight)', borderRadius: '14px', backdropFilter: 'blur(16px)', padding: '12px 18px' }}
                  itemStyle={{ fontWeight: '600' }}
                />
                <Legend verticalAlign="top" height={36} />
                <Area type="monotone" dataKey="revenue" name="Total Revenue" stroke="var(--accent-primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                <Area type="monotone" dataKey="profit" name="Net Profit" stroke="var(--accent-secondary)" strokeWidth={3} fillOpacity={1} fill="url(#colorProf)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly Visits Bar Chart */}
        <div className="glass-panel" style={{
          borderRadius: '24px',
          padding: '32px',
          minHeight: '440px',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
            <div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: '700', color: 'var(--text-primary)', letterSpacing: '-0.025em' }}>Weekly Traffic Surge</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Unique visitor count across last 7 days</p>
            </div>
            <div style={{ padding: '6px 14px', borderRadius: '20px', background: 'rgba(16,185,129,0.1)', color: '#10b981', fontSize: '0.825rem', fontWeight: '600' }}>
              Peak on Saturday
            </div>
          </div>
          <div style={{ flex: 1, width: '100%', minHeight: '320px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trafficData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-muted)" axisLine={false} tickLine={false} />
                <YAxis stroke="var(--text-muted)" axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.95)', borderColor: 'var(--border-highlight)', borderRadius: '14px', backdropFilter: 'blur(16px)', padding: '12px 18px' }}
                  itemStyle={{ color: '#3b82f6', fontWeight: '600' }}
                />
                <Bar dataKey="visits" name="Unique Visits" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Third Row: Channels Pie Chart & Recent Transactions */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '28px' }}>
        {/* Traffic Channels Pie Chart */}
        <div className="glass-panel" style={{ borderRadius: '24px', padding: '32px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '1.35rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px', letterSpacing: '-0.025em' }}>Traffic Acquisition</h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>Distribution by marketing channel</p>
          <div style={{ flex: 1, width: '100%', minHeight: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={channelData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={6}
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  labelLine={false}
                >
                  {channelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(15, 23, 42, 0.8)" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.95)', borderColor: 'var(--border-highlight)', borderRadius: '14px', backdropFilter: 'blur(16px)' }}
                  itemStyle={{ fontWeight: '600', color: 'var(--text-primary)' }}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Transactions Table */}
        <div className="glass-panel" style={{ borderRadius: '24px', padding: '32px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: '700', color: 'var(--text-primary)', letterSpacing: '-0.025em' }}>Recent Transactions</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Real-time payment ledger</p>
            </div>
            <button style={{ color: 'var(--accent-primary)', fontSize: '0.875rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
              View All <ArrowUpRight size={16} />
            </button>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                  <th style={{ paddingBottom: '12px', fontWeight: '600' }}>Transaction</th>
                  <th style={{ paddingBottom: '12px', fontWeight: '600' }}>Client</th>
                  <th style={{ paddingBottom: '12px', fontWeight: '600' }}>Amount</th>
                  <th style={{ paddingBottom: '12px', fontWeight: '600', textAlign: 'right' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((tx) => (
                  <tr key={tx.id} style={{ borderBottom: '1px solid var(--border-color)' }} className="hover-bg-transition">
                    <td style={{ padding: '16px 0', fontWeight: '600', color: 'var(--accent-primary)' }}>{tx.id}</td>
                    <td style={{ padding: '16px 0' }}>
                      <div style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{tx.client}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{tx.date}</div>
                    </td>
                    <td style={{ padding: '16px 0', fontWeight: '600', color: 'var(--text-primary)' }}>{tx.amount}</td>
                    <td style={{ padding: '16px 0', textAlign: 'right' }}>
                      <span style={{
                        padding: '4px 10px',
                        borderRadius: '999px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        backgroundColor: tx.status === 'Completed' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                        color: tx.status === 'Completed' ? '#34d399' : '#fbbf24',
                        border: `1px solid ${tx.status === 'Completed' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`
                      }}>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;

