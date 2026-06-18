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
    <div>
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: '700', marginBottom: '8px' }}>Users</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Manage users and roles in your system.</p>
        </div>
        <button style={{
          backgroundColor: 'var(--accent-primary)',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '8px',
          fontWeight: '500',
          transition: 'background-color 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-hover)'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-primary)'}
        >
          Add User
        </button>
      </div>

      <div style={{
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: '12px',
        border: '1px solid var(--border-color)',
        overflow: 'hidden'
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
                      width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--bg-tertiary)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)',
                      fontSize: '0.875rem', fontWeight: '600'
                    }}>
                      {user.name.charAt(0)}
                    </div>
                    {user.name}
                  </td>
                  <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>{user.email}</td>
                  <td style={{ padding: '16px 24px' }}>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      backgroundColor: 'var(--bg-tertiary)',
                      color: 'var(--text-primary)',
                    }}>
                      {user.role}
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{
                        width: '8px', height: '8px', borderRadius: '50%',
                        backgroundColor: user.status === 'Active' ? '#10b981' : 
                                        user.status === 'Offline' ? 'var(--text-muted)' : '#ef4444'
                      }} />
                      <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{user.status}</span>
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                    <button style={{ color: 'var(--accent-primary)', fontSize: '0.875rem', fontWeight: '500' }}>Edit</button>
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
