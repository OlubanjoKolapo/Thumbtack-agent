import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  // Custom full-screen layouts handle their own headers/footers
  const isCustomFullPage = ['/chat', '/track', '/'].includes(location.pathname);

  if (isCustomFullPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-tt-page flex flex-col font-sans selection:bg-tt-blue-tint selection:text-tt-blue">
      {/* Header bar */}
      <header className="sticky top-0 z-40 bg-white border-b border-tt-border h-[60px] flex items-center px-4 md:px-8">
        <div className="max-w-7xl w-full mx-auto flex items-center justify-between">
          {/* Logo link */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="font-serif text-[22px] font-bold text-tt-dark tracking-tight">
              Thumbtack
            </span>
            {location.pathname !== '/' && (
              <span className="flex items-center gap-1.5 ml-2 border-l border-tt-border pl-2.5">
                <span className="font-serif text-sm font-semibold text-tt-blue">Tack</span>
                <span className="text-[10px] uppercase bg-tt-blue-tint text-tt-blue px-1.5 py-0.5 rounded font-bold tracking-wider">
                  AI
                </span>
              </span>
            )}
          </Link>

          {/* Right utilities navigation */}
          <nav className="flex items-center gap-4 md:gap-6 text-[15px] text-tt-navy font-semibold">
            <Link to="/chat" className="hover:text-tt-blue hidden sm:inline-block transition-colors">
              Conversational Feed
            </Link>
            <Link to="/demo" className="flex items-center gap-1 hover:text-tt-blue transition-colors">
              Demo Panel
              <span className="text-[12px] font-bold text-tt-blue bg-tt-blue-tint border border-tt-blue/40 px-2 py-0.5 rounded-full shadow-sm scale-90 select-none">
                Demo
              </span>
            </Link>
            <Link 
              to="/chat"
              className="bg-tt-dark text-white text-[12px] md:text-[15px] px-4 py-2 rounded-full hover:bg-tt-blue transition-colors active-press shadow-sm"
            >
              Try Tack →
            </Link>
          </nav>
        </div>
      </header>

      {/* Main body content area */}
      <main className="flex-grow flex flex-col justify-start">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-tt-border py-8 text-center text-xs text-tt-muted">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} Thumbtack, Inc. All rights reserved.
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Use</a>
            <a href="#" className="hover:underline">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
