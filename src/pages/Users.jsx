import React from 'react';

const Users = () => {
  const users = [
    { id: 1, name: 'mrx patel', email: 'mrx.patel@email.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'xyz patel', email: 'xyz.patel@email.com', role: 'Editor', status: 'Offline' },
    { id: 3, name: 'abc patel', email: 'abc.patel@email.com', role: 'User', status: 'Active' },
    { id: 4, name: 'chef patel', email: 'chef.patel@email.com', role: 'User', status: 'Banned' },
    { id: 5, name: 'def patel', email: 'def.patel@email.com', role: 'Editor', status: 'Active' },
  ];

  return (
    <div className="animate-fade-in-up">
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '8px', background: 'linear-gradient(to right, var(--text-primary), var(--text-muted))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Users</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Manage users and roles in your system.</p>
        </div>
        <button style={{
          background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
          color: 'white',
          padding: '10px 24px',
          borderRadius: '12px',
          fontWeight: '600',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
          border: 'none',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 6px 16px rgba(99, 102, 241, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.3)';
        }}
        >
          Add User
        </button>
      </div>

      <div className="glass-panel" style={{
        borderRadius: '16px',
        overflow: 'hidden',
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '16px 24px', fontWeight: '600', color: 'var(--text-secondary)' }}>Name</th>
                <th style={{ padding: '16px 24px', fontWeight: '600', color: 'var(--text-secondary)' }}>Email</th>
                <th style={{ padding: '16px 24px', fontWeight: '600', color: 'var(--text-secondary)' }}>Role</th>
                <th style={{ padding: '16px 24px', fontWeight: '600', color: 'var(--text-secondary)' }}>Status</th>
                <th style={{ padding: '16px 24px', fontWeight: '600', color: 'var(--text-secondary)', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user.id} style={{ 
                  borderBottom: idx !== users.length - 1 ? '1px solid var(--border-color)' : 'none',
                  transition: 'background-color 0.2s',
                }}
                className="table-row"
                >
                  <td style={{ padding: '16px 24px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white',
                      fontSize: '0.875rem', fontWeight: '600', boxShadow: '0 4px 10px rgba(99, 102, 241, 0.3)'
                    }}>
                      {user.name.charAt(0)}
                    </div>
                    {user.name}
                  </td>
                  <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>{user.email}</td>
                  <td style={{ padding: '16px 24px' }}>
                    <span style={{
                      padding: '6px 12px',
                      borderRadius: '8px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      color: 'var(--text-primary)',
                      border: '1px solid var(--border-color)',
                    }}>
                      {user.role}
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{
                        width: '10px', height: '10px', borderRadius: '50%',
                        backgroundColor: user.status === 'Active' ? '#34d399' : 
                                        user.status === 'Offline' ? 'var(--text-muted)' : '#f87171',
                        boxShadow: `0 0 8px ${user.status === 'Active' ? '#34d399' : user.status === 'Offline' ? 'var(--text-muted)' : '#f87171'}`
                      }} />
                      <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: '500' }}>{user.status}</span>
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                    <button style={{ color: 'var(--accent-primary)', fontSize: '0.875rem', fontWeight: '600', transition: 'color 0.2s', background: 'none', border: 'none', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--accent-primary)'}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <style>{`
        .table-row:hover {
          background-color: rgba(255, 255, 255, 0.02);
        }
      `}</style>
    </div>
  );
};

export default Users;
