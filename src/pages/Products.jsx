import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Package, Trash2, Edit2, RefreshCw, Filter, Tag, X, Check } from 'lucide-react';
import { useDashboardContext } from '../context/DashboardContext';

const fallbackProducts = [
  { id: 1, title: 'Premium Wireless Headphones', price: 299.00, category: 'electronics', status: 'In Stock', sales: 1234 },
  { id: 2, title: 'Mechanical Keyboard Pro', price: 149.00, category: 'electronics', status: 'Low Stock', sales: 856 },
  { id: 3, title: '4K Ultra HD Monitor', price: 499.00, category: 'electronics', status: 'In Stock', sales: 432 },
  { id: 4, title: 'Ergonomic Office Chair', price: 350.00, category: 'furniture', status: 'Out of Stock', sales: 215 },
  { id: 5, title: 'Smart Home Hub', price: 120.00, category: 'electronics', status: 'In Stock', sales: 987 },
  { id: 6, title: 'Men\'s Cashmere Sweater', price: 180.00, category: 'men\'s clothing', status: 'In Stock', sales: 654 },
  { id: 7, title: 'Women\'s Leather Tote Bag', price: 220.00, category: 'women\'s clothing', status: 'Low Stock', sales: 741 },
];

const Products = () => {
  const { searchQuery } = useDashboardContext();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);

  // Modal form state
  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCategory, setNewCategory] = useState('electronics');
  const [newStatus, setNewStatus] = useState('In Stock');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get('https://fakestoreapi.com/products');
        const formatted = res.data.map(item => ({
          id: item.id,
          title: item.title,
          price: item.price,
          category: item.category,
          status: item.rating?.count > 200 ? 'In Stock' : item.rating?.count > 100 ? 'Low Stock' : 'Out of Stock',
          sales: item.rating?.count ? item.rating.count * 7 : 450
        }));
        setProducts(formatted);
      } catch (err) {
        console.warn("Fakestore API failed, using premium fallback data", err);
        setProducts(fallbackProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [refreshCount]);

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newTitle || !newPrice) return;
    const newItem = {
      id: Date.now(),
      title: newTitle,
      price: parseFloat(newPrice) || 99.99,
      category: newCategory,
      status: newStatus,
      sales: Math.floor(Math.random() * 500) + 50
    };
    setProducts([newItem, ...products]);
    setIsModalOpen(false);
    setNewTitle('');
    setNewPrice('');
  };

  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || p.category.toLowerCase() === activeCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', 'electronics', 'jewelery', "men's clothing", "women's clothing", 'furniture'];

  return (
    <div className="animate-fade-in-up">
      {/* Header section */}
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: '800', marginBottom: '8px', background: 'linear-gradient(135deg, #ffffff 0%, var(--text-secondary) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.025em' }}>
            Products Inventory
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>Real-time catalog management & pricing telemetry.</p>
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
            <Plus size={18} /> Add Product
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '16px', marginBottom: '24px' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '8px 20px',
              borderRadius: '999px',
              fontSize: '0.875rem',
              fontWeight: activeCategory === cat ? '600' : '500',
              textTransform: 'capitalize',
              color: activeCategory === cat ? 'white' : 'var(--text-secondary)',
              background: activeCategory === cat ? 'var(--accent-primary)' : 'rgba(255, 255, 255, 0.03)',
              border: `1px solid ${activeCategory === cat ? 'var(--accent-primary)' : 'var(--border-color)'}`,
              transition: 'all 0.2s ease',
              boxShadow: activeCategory === cat ? '0 4px 15px rgba(99, 102, 241, 0.4)' : 'none',
              whiteSpace: 'nowrap'
            }}
          >
            {cat}
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
          <p style={{ color: 'var(--text-secondary)', fontWeight: '500', fontSize: '1.1rem' }}>Loading catalog...</p>
        </div>
      ) : (
        <div className="glass-panel" style={{ borderRadius: '24px', overflow: 'hidden' }}>
          {filteredProducts.length === 0 ? (
            <div style={{ padding: '64px 32px', textAlign: 'center', color: 'var(--text-secondary)' }}>
              <Package size={48} style={{ margin: '0 auto 16px', color: 'var(--text-muted)' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px' }}>No products found</h3>
              <p style={{ fontSize: '0.875rem' }}>No products match your current search query or category filters.</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border-color)' }}>
                    <th style={{ padding: '20px 28px', fontWeight: '600', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Product Name</th>
                    <th style={{ padding: '20px 28px', fontWeight: '600', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Category</th>
                    <th style={{ padding: '20px 28px', fontWeight: '600', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Price</th>
                    <th style={{ padding: '20px 28px', fontWeight: '600', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Status</th>
                    <th style={{ padding: '20px 28px', fontWeight: '600', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Sales</th>
                    <th style={{ padding: '20px 28px', fontWeight: '600', color: 'var(--text-secondary)', fontSize: '0.875rem', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product, idx) => (
                    <tr key={product.id} style={{ 
                      borderBottom: idx !== filteredProducts.length - 1 ? '1px solid var(--border-color)' : 'none',
                    }}
                    className="table-row hover-bg-transition"
                    >
                      <td style={{ padding: '20px 28px', fontWeight: '600', color: 'var(--text-primary)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                          <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)' }}>
                            <Package size={20} />
                          </div>
                          <span style={{ display: 'inline-block', maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {product.title}
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: '20px 28px' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.825rem', color: 'var(--text-secondary)', textTransform: 'capitalize' }}>
                          <Tag size={14} style={{ color: 'var(--text-muted)' }} /> {product.category}
                        </span>
                      </td>
                      <td style={{ padding: '20px 28px', fontWeight: '600', color: 'var(--text-primary)' }}>
                        ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
                      </td>
                      <td style={{ padding: '20px 28px' }}>
                        <span style={{
                          padding: '6px 14px',
                          borderRadius: '999px',
                          fontSize: '0.75rem',
                          fontWeight: '700',
                          backgroundColor: product.status === 'In Stock' ? 'rgba(16, 185, 129, 0.15)' : 
                                          product.status === 'Low Stock' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                          color: product.status === 'In Stock' ? '#34d399' : 
                                product.status === 'Low Stock' ? '#fbbf24' : '#f87171',
                          border: `1px solid ${product.status === 'In Stock' ? 'rgba(16, 185, 129, 0.3)' : product.status === 'Low Stock' ? 'rgba(245, 158, 11, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                        }}>
                          {product.status}
                        </span>
                      </td>
                      <td style={{ padding: '20px 28px', color: 'var(--text-secondary)', fontWeight: '500' }}>
                        {product.sales?.toLocaleString()}
                      </td>
                      <td style={{ padding: '20px 28px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                          <button style={{ padding: '8px', color: 'var(--text-secondary)', borderRadius: '8px', transition: 'all 0.2s' }} className="action-btn" title="Edit Product">
                            <Edit2 size={16} />
                          </button>
                          <button onClick={() => handleDelete(product.id)} style={{ padding: '8px', color: '#ef4444', borderRadius: '8px', transition: 'all 0.2s' }} className="action-btn-danger" title="Delete Product">
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

      {/* Interactive Add Product Modal */}
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
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-primary)' }}>Add New Product</h3>
              <button onClick={() => setIsModalOpen(false)} style={{ color: 'var(--text-secondary)', padding: '6px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '8px' }}>Product Name</label>
                <input 
                  type="text" 
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Hyperion Nexus Drone"
                  className="glass-input"
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', fontSize: '0.95rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '8px' }}>Price ($)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    placeholder="299.99"
                    className="glass-input"
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', fontSize: '0.95rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '8px' }}>Category</label>
                  <select 
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="glass-input"
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', fontSize: '0.95rem', backgroundColor: '#0f172a' }}
                  >
                    <option value="electronics">Electronics</option>
                    <option value="jewelery">Jewelery</option>
                    <option value="men's clothing">Men's Clothing</option>
                    <option value="women's clothing">Women's Clothing</option>
                    <option value="furniture">Furniture</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '8px' }}>Inventory Status</label>
                <select 
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="glass-input"
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', fontSize: '0.95rem', backgroundColor: '#0f172a' }}
                >
                  <option value="In Stock">In Stock</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
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

export default Products;

