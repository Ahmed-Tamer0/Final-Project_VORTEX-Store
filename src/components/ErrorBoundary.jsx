import React from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';
import { Button } from './Button';

/**
 * ErrorBoundary component to catch rendering errors and handle ChunkLoadError for SPAs.
 * This prevents the "blank page" issue when new versions are deployed or network fails.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorType: null };
  }

  static getDerivedStateFromError(error) {
    // Check if it's a ChunkLoadError (common in Vite/Webpack for lazy-loaded routes)
    const isChunkLoadError = error.name === 'ChunkLoadError' || 
                            error.message?.includes('Loading chunk') || 
                            error.message?.includes('Dynamically imported module');
    
    return { 
      hasError: true, 
      errorType: isChunkLoadError ? 'chunk' : 'render' 
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    
    // Automatically reload once if it's a chunk error
    if (this.state.errorType === 'chunk') {
      const hasReloaded = sessionStorage.getItem('vortex-error-reload');
      if (!hasReloaded) {
        sessionStorage.setItem('vortex-error-reload', 'true');
        window.location.reload();
      }
    }
  }

  handleReset = () => {
    sessionStorage.removeItem('vortex-error-reload');
    this.setState({ hasError: false, errorType: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center bg-white/5 backdrop-blur-xl rounded-[3rem] border border-white/10 m-4 shadow-2xl">
          <div className="w-20 h-20 bg-rose-500/10 rounded-full flex items-center justify-center mb-6 animate-pulse">
            <AlertTriangle className="text-rose-500" size={40} />
          </div>
          
          <h2 className="text-3xl font-black italic tracking-tighter uppercase mb-4">
            {this.state.errorType === 'chunk' ? 'Update Required' : 'Critical Failure'}
          </h2>
          
          <p className="text-slate-500 max-w-md mx-auto mb-10 font-medium">
            {this.state.errorType === 'chunk' 
              ? "A newer version of Vortex is available or there was a connection glitch. Please refresh to synchronize."
              : "Something went wrong while initializing the interface. Our systems have logged this incident."}
          </p>

          <Button 
            variant="primary" 
            onClick={() => window.location.reload()}
            className="flex items-center gap-3 px-8 py-4 text-xs font-black tracking-widest uppercase"
          >
            <RefreshCw size={18} className="animate-spin-slow" />
            Refresh Core
          </Button>

          <button 
            onClick={this.handleReset}
            className="mt-6 text-[10px] font-black tracking-widest text-slate-400 hover:text-primary transition-colors uppercase"
          >
            Return to Alpha Base (Home)
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
