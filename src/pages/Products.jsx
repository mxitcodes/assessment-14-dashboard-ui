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
    <div>
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: '700', marginBottom: '8px' }}>Products</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Manage your product inventory and listings.</p>
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
          Add Product
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
                      backgroundColor: product.status === 'In Stock' ? 'rgba(16, 185, 129, 0.1)' : 
                                      product.status === 'Low Stock' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                      color: product.status === 'In Stock' ? '#10b981' : 
                            product.status === 'Low Stock' ? '#f59e0b' : '#ef4444',
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
