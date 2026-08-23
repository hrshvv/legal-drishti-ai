import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useAuth } from '../../context/AuthContext';
import { Outlet } from 'react-router-dom';

const PageWrapper = ({ children }) => {
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface-50 text-slate-800 flex flex-col selection:bg-primary-500 selection:text-white w-full">
      <Navbar 
        toggleMobileMenu={() => setIsMobileMenuOpen(prev => !prev)} 
        isMobileMenuOpen={isMobileMenuOpen}
      />
      <div className="flex flex-1 relative w-full">
        <Sidebar isOpen={isMobileMenuOpen} closeMenu={() => setIsMobileMenuOpen(false)} />
        
        {/* Mobile Backdrop Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}
        
        <main className="flex-1 p-3 sm:p-5 md:p-6 lg:p-8 overflow-y-auto min-w-0 w-full bg-surface-50">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default PageWrapper;
