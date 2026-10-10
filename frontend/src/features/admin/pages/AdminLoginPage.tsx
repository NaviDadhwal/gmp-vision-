import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ShieldAlert, ShieldCheck } from 'lucide-react';
import { ApiService } from '../../../lib/api/endpoints';
import { TelemetryBadge } from '../../../components/common/TelemetryBadge';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await ApiService.login(email, password);
      navigate('/admin/dashboard');
    } catch (err: any) {
      console.error('Login failure:', err);
      setError(
        err?.response?.data?.message ||
        'Authentication failed. Verify credentials and cleanroom security privileges.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-soft flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <Link to="/" className="inline-block">
          <img
            src="/logo.png"
            alt="GMP VISION Logo"
            className="h-16 w-auto mx-auto drop-shadow-sm"
          />
        </Link>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-brand-border">
          <TelemetryBadge label="SECURITY GATEWAY" variant="blue" />
          <span className="text-[11px] font-mono text-brand-navy font-bold">
            CLEANROOM ADMIN CONSOLE
          </span>
        </div>
        <h2 className="text-2xl font-display font-extrabold text-brand-navy">
          Authorized Personnel Gateway
        </h2>
        <p className="text-xs text-brand-muted font-mono">
          Strict Audit Trail Logging (21 CFR Part 11 Compliant)
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-card border border-brand-border rounded-2xl sm:px-10 space-y-6">
          {error && (
            <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-mono font-medium text-brand-navy mb-1">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@gmpvision.in"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-brand-soft/40 border border-brand-border rounded-md focus:outline-none focus:border-brand-primary focus:bg-white text-brand-navy"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-medium text-brand-navy mb-1">
                Security Password / Passkey
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-brand-soft/40 border border-brand-border rounded-md focus:outline-none focus:border-brand-primary focus:bg-white text-brand-navy font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-primaryHover disabled:opacity-60 text-white py-2.5 rounded-md text-xs font-semibold shadow-hud transition-colors"
            >
              {loading ? (
                <span>Validating Session...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  Authenticate Admin Access
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-brand-border text-center">
            <Link
              to="/"
              className="text-xs font-mono text-brand-muted hover:text-brand-primary transition-colors"
            >
              ← Return to Public Cleanroom Showcase
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
