import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, PhoneCall, Home } from 'lucide-react';
import { SITE_SETTINGS } from '../data/settings';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#051C42',
            padding: '2rem',
            color: '#FFFFFF',
          }}
        >
          <div
            style={{
              maxWidth: '560px',
              backgroundColor: '#082B66',
              borderRadius: '16px',
              padding: '2.5rem',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.25rem',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'rgba(220, 38, 38, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#EF4444',
              }}
            >
              <AlertTriangle size={32} />
            </div>

            <h2 style={{ color: '#FFFFFF', fontSize: '1.75rem', margin: 0 }}>
              System Alert — An Error Occurred
            </h2>

            <p style={{ color: '#CBD5E1', fontSize: '0.95rem', margin: 0 }}>
              An unexpected application error occurred while processing this view. Our engineering support team has been notified.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '0.5rem', justifyContent: 'center' }}>
              <button
                onClick={this.handleReload}
                className="btn btn-primary"
                style={{ gap: '0.5rem' }}
              >
                <RefreshCw size={16} />
                Reload Application
              </button>

              <a
                href="/"
                className="btn btn-outline-white"
                style={{ gap: '0.5rem' }}
              >
                <Home size={16} />
                Return to Homepage
              </a>
            </div>

            <div
              style={{
                marginTop: '1rem',
                paddingTop: '1rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                fontSize: '0.85rem',
                color: '#94A3B8',
              }}
            >
              <PhoneCall size={14} color="#3DAE2B" />
              <span>For immediate project assistance, call {SITE_SETTINGS.contact.primaryPhone}</span>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
