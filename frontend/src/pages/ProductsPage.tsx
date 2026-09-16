import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/seo/SEOHead';
import { PRODUCTS_DATA, IProductItem } from '../data/products';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ArrowRight, Search, FileText } from 'lucide-react';
import { initiateWhatsAppInquiry } from '../lib/whatsapp';

export const ProductsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['all', ...Array.from(new Set(PRODUCTS_DATA.map((p) => p.category)))];

  const filteredProducts = PRODUCTS_DATA.filter((prod) => {
    const matchesCategory = selectedCategory === 'all' || prod.category === selectedCategory;
    const matchesSearch =
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <SEOHead
        title="Manufactured Cleanroom & HVAC Equipment Catalog"
        description="Browse GMP VISION equipment: Double Skin AHUs, Desiccant DAHUs, Modular PUF Panels, Cleanroom Doors, Orbital Welded Process Piping Skids, and RO Plants."
        canonicalPath="/products"
      />

      {/* Header Banner */}
      <section style={{ backgroundColor: '#051C42', color: '#FFFFFF', padding: '4rem 0' }}>
        <div className="container">
          <div style={{ maxWidth: '780px' }}>
            <Badge variant="green" className="mb-2">Industrial Equipment Catalog</Badge>
            <h1 style={{ color: '#FFFFFF', fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', margin: '0.4rem 0 1rem' }}>
              Cleanroom, HVAC & MEP Manufactured Products
            </h1>
            <p style={{ color: '#CBD5E1', fontSize: '1.05rem', lineHeight: 1.6 }}>
              In-house manufactured equipment engineered to comply with ISO 14644-1, cGMP Schedule M, and USFDA standards at our Nalagarh facility.
            </p>
          </div>
        </div>
      </section>

      {/* Catalog & Filter Bar */}
      <section className="section-padding" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="container">
          {/* Controls */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1.25rem',
              marginBottom: '2.5rem',
            }}
          >
            {/* Category Pills */}
            <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.3rem' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '9999px',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    textTransform: 'capitalize',
                    cursor: 'pointer',
                    backgroundColor: selectedCategory === cat ? '#051C42' : '#FFFFFF',
                    color: selectedCategory === cat ? '#FFFFFF' : '#475569',
                    border: selectedCategory === cat ? '1px solid #051C42' : '1px solid #CBD5E1',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s',
                  }}
                >
                  {cat === 'all' ? 'All Products' : cat}
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div style={{ position: 'relative', width: '280px' }}>
              <input
                type="text"
                placeholder="Search models, specs, tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.6rem 1rem 0.6rem 2.4rem',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  fontSize: '0.88rem',
                }}
              />
              <Search size={16} color="#64748B" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', backgroundColor: '#FFFFFF', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <h3 style={{ color: '#051C42', marginBottom: '0.5rem' }}>No products match your search</h3>
              <p style={{ color: '#64748B', marginBottom: '1.5rem' }}>Try clearing filters or search by category name.</p>
              <Button variant="outline" onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}>
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-8 md-grid-cols-1">
              {filteredProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="card-elevated"
                  style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <Badge variant="green">{prod.category}</Badge>
                      {prod.isFeatured && <Badge variant="navy">Featured Model</Badge>}
                    </div>

                    <h2 style={{ fontSize: '1.45rem', color: '#051C42', margin: '0.3rem 0 0.4rem' }}>
                      {prod.name}
                    </h2>

                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#3DAE2B', marginBottom: '0.85rem' }}>
                      {prod.tagline}
                    </div>

                    <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                      {prod.description}
                    </p>

                    <h4 style={{ fontSize: '0.85rem', color: '#051C42', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.5rem' }}>
                      Key Specifications:
                    </h4>

                    <table className="spec-table" style={{ marginBottom: '1.5rem' }}>
                      <tbody>
                        {prod.specifications.slice(0, 4).map((spec, i) => (
                          <tr key={i}>
                            <td style={{ width: '45%', fontWeight: 600 }}>{spec.key}</td>
                            <td>{spec.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', borderTop: '1px solid #E2E8F0', paddingTop: '1.25rem' }}>
                    <Link to={`/products/${prod.slug}`} className="btn btn-outline" style={{ flex: 1 }}>
                      Full Specifications
                    </Link>
                    <button
                      onClick={() => initiateWhatsAppInquiry({ topic: `Product Inquiry: ${prod.name}` })}
                      className="btn btn-primary"
                      style={{ flex: 1 }}
                    >
                      Enquire on WhatsApp
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
