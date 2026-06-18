import React from 'react';

const Products = () => {
  // Mock products list
  const products = [
    { id: 1, name: 'Premium Wireless Headphones', price: '$299.00', status: 'In Stock', sales: 1234 },
    { id: 2, name: 'Mechanical Keyboard Pro', price: '$149.00', status: 'Low Stock', sales: 856 },
    { id: 3, name: '4K Ultra HD Monitor', price: '$499.00', status: 'In Stock', sales: 432 },
    { id: 4, name: 'Ergonomic Office Chair', price: '$350.00', status: 'Out of Stock', sales: 215 },
    { id: 5, name: 'Smart Home Hub', price: '$120.00', status: 'In Stock', sales: 987 },
  ];

  return (
    <div className="animate-fade-in-up">
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '8px', background: 'linear-gradient(to right, var(--text-primary), var(--text-muted))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Products</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Manage your product inventory and listings.</p>
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
          Add Product
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
                <th style={{ padding: '16px 24px', fontWeight: '600', color: 'var(--text-secondary)' }}>Product Name</th>
                <th style={{ padding: '16px 24px', fontWeight: '600', color: 'var(--text-secondary)' }}>Price</th>
                <th style={{ padding: '16px 24px', fontWeight: '600', color: 'var(--text-secondary)' }}>Status</th>
                <th style={{ padding: '16px 24px', fontWeight: '600', color: 'var(--text-secondary)' }}>Total Sales</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, idx) => (
                <tr key={product.id} style={{ 
                  borderBottom: idx !== products.length - 1 ? '1px solid var(--border-color)' : 'none',
                  transition: 'background-color 0.2s',
                }}
                className="table-row"
                >
                  <td style={{ padding: '16px 24px', fontWeight: '500' }}>{product.name}</td>
                  <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>{product.price}</td>
                  <td style={{ padding: '16px 24px' }}>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: '999px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      backgroundColor: product.status === 'In Stock' ? 'rgba(16, 185, 129, 0.15)' : 
                                      product.status === 'Low Stock' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                      color: product.status === 'In Stock' ? '#34d399' : 
                            product.status === 'Low Stock' ? '#fbbf24' : '#f87171',
                      border: `1px solid ${product.status === 'In Stock' ? 'rgba(16, 185, 129, 0.3)' : product.status === 'Low Stock' ? 'rgba(245, 158, 11, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                      boxShadow: `0 0 10px ${product.status === 'In Stock' ? 'rgba(16, 185, 129, 0.1)' : product.status === 'Low Stock' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(239, 68, 68, 0.1)'}`
                    }}>
                      {product.status}
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>{product.sales.toLocaleString()}</td>
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

export default Products;
