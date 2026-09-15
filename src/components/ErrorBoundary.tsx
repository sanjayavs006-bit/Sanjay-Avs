import React from 'react';
import { RefreshCw, AlertCircle } from 'lucide-react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('MOODY MATCH Uncaught Error caught by ErrorBoundary:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  private handleClearStorageAndReload = () => {
    try {
      localStorage.removeItem('moody_match_cart');
      localStorage.removeItem('moody_match_wishlist');
    } catch {
      // ignore
    }
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAF7FB] dark:bg-[#0E0D12] text-[#1A181E] dark:text-[#F6F4F8] flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white dark:bg-[#16141F] border border-[#EBE7EE] dark:border-[#2C283A] rounded-2xl p-6 sm:p-8 shadow-sm text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#FCE8ED] dark:bg-[#321722] text-[#D45D79] flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            
            <div className="space-y-1">
              <h2 className="text-xl font-black uppercase tracking-tight text-[#1A181E] dark:text-[#F6F4F8]">
                Something went wrong
              </h2>
              <p className="text-xs text-[#70697B] dark:text-[#A7A1B2]">
                We caught a hiccup with the display. Tap below to reload your mood experience.
              </p>
            </div>

            {this.state.error?.message && (
              <div className="p-3 bg-[#FAF7FB] dark:bg-[#110F17] rounded-lg text-left text-[11px] font-mono text-[#8C8494] overflow-x-auto border border-[#EBE7EE] dark:border-[#252230]">
                {this.state.error.message}
              </div>
            )}

            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={this.handleReset}
                className="w-full py-3 px-4 bg-[#D45D79] hover:bg-[#C24D68] text-white font-bold text-xs uppercase tracking-[0.18em] rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-98"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reload App</span>
              </button>

              <button
                onClick={this.handleClearStorageAndReload}
                className="w-full py-2.5 px-4 bg-transparent hover:bg-[#FAF7FB] dark:hover:bg-[#1E1B28] text-[#70697B] dark:text-[#A7A1B2] font-semibold text-xs rounded-lg transition-all cursor-pointer"
              >
                Clear Saved Cache & Reload
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
