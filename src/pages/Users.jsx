import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Users as UsersIcon, Trash2, Edit2, RefreshCw, Shield, UserCheck, X, Check } from 'lucide-react';
import { useDashboardContext } from '../context/DashboardContext';

const fallbackUsers = [
  { id: 1, name: 'man patel', email: 'man.patel@email.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'mrx patel', email: 'mrx.patel@email.com', role: 'Admin', status: 'Active' },
  { id: 3, name: 'xyz patel', email: 'xyz.patel@email.com', role: 'Editor', status: 'Offline' },
  { id: 4, name: 'abc patel', email: 'abc.patel@email.com', role: 'User', status: 'Active' },
  { id: 5, name: 'cheff patel', email: 'cheff.patel@email.com', role: 'User', status: 'Banned' },
  { id: 6, name: 'aarav sharma', email: 'aarav.sharma@email.com', role: 'Editor', status: 'Active' },
  { id: 7, name: 'rohit verma', email: 'rohit.verma@email.com', role: 'User', status: 'Active' },
];

const Users = () => {
  const { searchQuery } = useDashboardContext();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeRole, setActiveRole] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);

  // Modal form state
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState('User');
  const [newStatus, setNewStatus] = useState('Active');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get('https://jsonplaceholder.typicode.com/users');
        const customProfiles = [
          { name: 'man patel', email: 'man.patel@email.com' },
          { name: 'mrx patel', email: 'mrx.patel@email.com' },
          { name: 'xyz patel', email: 'xyz.patel@email.com' },
          { name: 'abc patel', email: 'abc.patel@email.com' },
          { name: 'cheff patel', email: 'cheff.patel@email.com' },
          { name: 'aarav sharma', email: 'aarav.sharma@email.com' },
          { name: 'rohit verma', email: 'rohit.verma@email.com' },
          { name: 'priya gupta', email: 'priya.gupta@email.com' },
          { name: 'amit kumar', email: 'amit.kumar@email.com' },
          { name: 'sunita rao', email: 'sunita.rao@email.com' },
        ];
        const roles = ['Admin', 'Editor', 'User', 'User', 'Editor'];
        const statuses = ['Active', 'Active', 'Offline', 'Active', 'Banned'];
        const formatted = res.data.map((item, idx) => {
          const profile = customProfiles[idx % customProfiles.length];
          return {
            id: item.id,
            name: profile.name,
            email: profile.email,
            role: roles[idx % roles.length],
            status: statuses[idx % statuses.length],
          };
        });
        setUsers(formatted);
      } catch (err) {
        console.warn("JSONPlaceholder API failed, using premium fallback data", err);
        setUsers(fallbackUsers);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [refreshCount]);

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newName || !newEmail) return;
    const newItem = {
      id: Date.now(),
      name: newName,
      email: newEmail.toLowerCase(),
      role: newRole,
      status: newStatus,
    };
    setUsers([newItem, ...users]);
    setIsModalOpen(false);
    setNewName('');
    setNewEmail('');
  };

  const handleDelete = (id) => {
    setUsers(users.filter(u => u.id !== id));
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase()) || u.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = activeRole === 'all' || u.role.toLowerCase() === activeRole.toLowerCase();
    return matchesSearch && matchesRole;
  });

  const rolesTab = ['all', 'Admin', 'Editor', 'User'];

  return (
    <div className="animate-fade-in-up">
      {/* Header section */}
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: '800', marginBottom: '8px', background: 'linear-gradient(135deg, #ffffff 0%, var(--text-secondary) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.025em' }}>
            User Management
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>Control permission hierarchy, access roles & user state.</p>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button 
            onClick={() => setRefreshCount(prev => prev + 1)}
            style={{
              padding: '10px 18px',
              backgroundColor: 'rgba(255,255,255,0.03)', 
              border: '1px solid var(--border-color)', 
              borderRadius: '14px', 
              color: 'var(--text-secondary)', 
              fontSize: '0.875rem', 
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)'}
          >
            <RefreshCw size={16} /> Refresh
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            style={{
              background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
              color: 'white',
              padding: '10px 24px',
              borderRadius: '14px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 15px rgba(99, 102, 241, 0.35)',
              transition: 'all 0.2s ease',
              border: 'none',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <Plus size={18} /> Add User
          </button>
        </div>
      </div>

      {/* Role Tabs */}
      <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '16px', marginBottom: '24px' }}>
        {rolesTab.map((role) => (
          <button
            key={role}
            onClick={() => setActiveRole(role)}
            style={{
              padding: '8px 20px',
              borderRadius: '999px',
              fontSize: '0.875rem',
              fontWeight: activeRole === role ? '600' : '500',
              textTransform: 'capitalize',
              color: activeRole === role ? 'white' : 'var(--text-secondary)',
              background: activeRole === role ? 'var(--accent-primary)' : 'rgba(255, 255, 255, 0.03)',
              border: `1px solid ${activeRole === role ? 'var(--accent-primary)' : 'var(--border-color)'}`,
              transition: 'all 0.2s ease',
              boxShadow: activeRole === role ? '0 4px 15px rgba(99, 102, 241, 0.4)' : 'none',
              whiteSpace: 'nowrap'
            }}
          >
            {role}
          </button>
        ))}
      </div>

      {/* Table / Content Section */}
      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '40vh', gap: '20px' }}>
          <div style={{ 
            width: '48px', 
            height: '48px', 
            border: '4px solid rgba(99, 102, 241, 0.15)',
            borderTopColor: 'var(--accent-primary)',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
            boxShadow: '0 0 25px rgba(99, 102, 241, 0.4)'
          }} />
          <p style={{ color: 'var(--text-secondary)', fontWeight: '500', fontSize: '1.1rem' }}>Loading users directory...</p>
        </div>
      ) : (
        <div className="glass-panel" style={{ borderRadius: '24px', overflow: 'hidden' }}>
          {filteredUsers.length === 0 ? (
            <div style={{ padding: '64px 32px', textAlign: 'center', color: 'var(--text-secondary)' }}>
              <UsersIcon size={48} style={{ margin: '0 auto 16px', color: 'var(--text-muted)' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px' }}>No users found</h3>
              <p style={{ fontSize: '0.875rem' }}>No users match your current search query or role filters.</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border-color)' }}>
                    <th style={{ padding: '20px 28px', fontWeight: '600', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>User Name</th>
                    <th style={{ padding: '20px 28px', fontWeight: '600', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Email Address</th>
                    <th style={{ padding: '20px 28px', fontWeight: '600', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Permission Role</th>
                    <th style={{ padding: '20px 28px', fontWeight: '600', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Account Status</th>
                    <th style={{ padding: '20px 28px', fontWeight: '600', color: 'var(--text-secondary)', fontSize: '0.875rem', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, idx) => (
                    <tr key={user.id} style={{ 
                      borderBottom: idx !== filteredUsers.length - 1 ? '1px solid var(--border-color)' : 'none',
                    }}
                    className="table-row hover-bg-transition"
                    >
                      <td style={{ padding: '20px 28px', fontWeight: '600', color: 'var(--text-primary)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                          <div style={{ 
                            width: '42px', 
                            height: '42px', 
                            borderRadius: '50%', 
                            background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            color: 'white',
                            fontSize: '1rem', 
                            fontWeight: '700', 
                            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.35)'
                          }}>
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <span style={{ display: 'inline-block', maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {user.name}
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: '20px 28px', color: 'var(--text-secondary)', fontSize: '0.925rem' }}>
                        {user.email}
                      </td>
                      <td style={{ padding: '20px 28px' }}>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '6px 14px',
                          borderRadius: '12px',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          backgroundColor: user.role === 'Admin' ? 'rgba(236, 72, 153, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                          color: user.role === 'Admin' ? '#f43f5e' : 'var(--text-primary)',
                          border: `1px solid ${user.role === 'Admin' ? 'rgba(236, 72, 153, 0.3)' : 'var(--border-color)'}`,
                        }}>
                          <Shield size={13} style={{ color: user.role === 'Admin' ? '#f43f5e' : 'var(--text-muted)' }} />
                          {user.role}
                        </span>
                      </td>
                      <td style={{ padding: '20px 28px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{
                            width: '10px', height: '10px', borderRadius: '50%',
                            backgroundColor: user.status === 'Active' ? '#10b981' : 
                                            user.status === 'Offline' ? 'var(--text-muted)' : '#ef4444',
                            boxShadow: `0 0 10px ${user.status === 'Active' ? '#10b981' : user.status === 'Offline' ? 'var(--text-muted)' : '#ef4444'}`
                          }} />
                          <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: '600' }}>{user.status}</span>
                        </div>
                      </td>
                      <td style={{ padding: '20px 28px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                          <button style={{ padding: '8px', color: 'var(--text-secondary)', borderRadius: '8px', transition: 'all 0.2s' }} className="action-btn" title="Edit User">
                            <Edit2 size={16} />
                          </button>
                          <button onClick={() => handleDelete(user.id)} style={{ padding: '8px', color: '#ef4444', borderRadius: '8px', transition: 'all 0.2s' }} className="action-btn-danger" title="Delete User">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Interactive Add User Modal */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(8px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px'
        }}
        onClick={() => setIsModalOpen(false)}
        >
          <div className="glass-panel animate-scale-in" style={{
            width: '100%',
            maxWidth: '540px',
            borderRadius: '24px',
            padding: '36px',
            position: 'relative',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            border: '1px solid var(--border-highlight)'
          }}
          onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-primary)' }}>Add New User</h3>
              <button onClick={() => setIsModalOpen(false)} style={{ color: 'var(--text-secondary)', padding: '6px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddUser} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '8px' }}>Full Name</label>
                <input 
                  type="text" 
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Alex Mercer"
                  className="glass-input"
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', fontSize: '0.95rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '8px' }}>Email Address</label>
                <input 
                  type="email" 
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="alex.mercer@nexusdash.com"
                  className="glass-input"
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', fontSize: '0.95rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '8px' }}>Role</label>
                  <select 
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="glass-input"
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', fontSize: '0.95rem', backgroundColor: '#0f172a' }}
                  >
                    <option value="User">User</option>
                    <option value="Editor">Editor</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '8px' }}>Account Status</label>
                  <select 
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="glass-input"
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', fontSize: '0.95rem', backgroundColor: '#0f172a' }}
                  >
                    <option value="Active">Active</option>
                    <option value="Offline">Offline</option>
                    <option value="Banned">Banned</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  style={{ padding: '12px 24px', borderRadius: '12px', color: 'var(--text-secondary)', fontWeight: '600', border: '1px solid var(--border-color)' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  style={{
                    background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                    color: 'white',
                    padding: '12px 28px',
                    borderRadius: '12px',
                    fontWeight: '600',
                    boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)'
                  }}
                >
                  Confirm & Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .action-btn:hover {
          background-color: rgba(255, 255, 255, 0.1);
          color: var(--text-primary) !important;
        }
        .action-btn-danger:hover {
          background-color: rgba(239, 68, 68, 0.2);
          color: #ef4444;
        }
      `}</style>
    </div>
  );
};

export default Users;

