import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { useAuth } from '../../../auth/AuthProvider';
import { Button } from '../../../components/ui/Button';
import { SEOHead } from '../../../components/seo/SEOHead';

export const AdminLoginPage: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('gmpvision3@gmail.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const from = (location.state as any)?.from?.pathname || '/admin';

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        navigate(from, { replace: true });
      } else {
        setError('Invalid administrator credentials. Please verify your email and password.');
      }
    } catch (err: any) {
      setError(err.message || 'Authentication error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="admin-login-wrapper"
      style={{
        minHeight: '100vh',
        backgroundColor: '#051C42',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        backgroundImage: 'radial-gradient(circle at 50% 20%, rgba(10, 59, 133, 0.4) 0%, transparent 60%)',
      }}
    >
      <SEOHead
        title="Admin Portal Login | GMP VISION"
        description="Secure Administrative Control Center for GMP VISION Cleanroom & MEP Contracting."
      />

      <div
        className="admin-login-card"
        style={{
          width: '100%',
          maxWidth: '440px',
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
          overflow: 'hidden',
        }}
      >
        {/* Top Brand Banner */}
        <div
          style={{
            backgroundColor: '#0A3B85',
            padding: '1.75rem 1.5rem 1.5rem',
            textAlign: 'center',
            borderBottom: '4px solid #3DAE2B',
          }}
        >
          <img
            src="/logo.png"
            alt="GMP VISION Logo"
            style={{
              height: '44px',
              width: 'auto',
              backgroundColor: '#FFFFFF',
              padding: '4px 10px',
              borderRadius: '6px',
              marginBottom: '0.85rem',
            }}
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <h1 style={{ color: '#FFFFFF', fontSize: '1.2rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em' }}>
            GMP VISION CONTROL DECK
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '0.78rem', marginTop: '0.35rem', marginBottom: 0 }}>
            Authorized Turnkey Engineering Personnel Only
          </p>
        </div>

        {/* Form Body */}
        <div style={{ padding: '1.5rem 1.5rem 2rem' }}>
          {error && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: '#FEF2F2',
                border: '1px solid #F87171',
                borderRadius: '6px',
                padding: '0.75rem',
                marginBottom: '1.25rem',
                fontSize: '0.82rem',
                color: '#991B1B',
              }}
            >
              <AlertCircle size={16} style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}

          {/* Quick Demo Hint */}
          <div
            style={{
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '6px',
              padding: '0.75rem',
              marginBottom: '1.5rem',
              fontSize: '0.75rem',
              color: '#475569',
              lineHeight: 1.4,
            }}
          >
            <div style={{ fontWeight: 700, color: '#0A3B85', marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ShieldCheck size={14} color="#3DAE2B" /> Standalone Preview Mode Credentials:
            </div>
            Email: <code style={{ color: '#0A3B85' }}>gmpvision3@gmail.com</code> | Pass: <code style={{ color: '#0A3B85' }}>admin123</code>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#1E293B', marginBottom: '0.4rem' }}>
                Admin Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail
                  size={18}
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#94A3B8',
                  }}
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@gmpvision.in"
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.75rem 0.65rem 2.5rem',
                    border: '1px solid #CBD5E1',
                    borderRadius: '6px',
                    fontSize: '0.88rem',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#1E293B', marginBottom: '0.4rem' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock
                  size={18}
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#94A3B8',
                  }}
                />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.75rem 0.65rem 2.5rem',
                    border: '1px solid #CBD5E1',
                    borderRadius: '6px',
                    fontSize: '0.88rem',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={loading}
              style={{
                width: '100%',
                backgroundColor: '#0A3B85',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                marginTop: '0.5rem',
              }}
            >
              {loading ? 'Authenticating...' : 'Sign In to Control Deck'}
              <ArrowRight size={18} />
            </Button>
          </form>

          <div style={{ marginTop: '1.75rem', textAlign: 'center' }}>
            <Link
              to="/"
              style={{
                color: '#64748B',
                fontSize: '0.8rem',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              ← Return to GMP VISION Public Site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
