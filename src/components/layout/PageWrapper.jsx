import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useAuth } from '../../context/AuthContext';
import { Outlet } from 'react-router-dom';

const PageWrapper = ({ children }) => {
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface-50 text-slate-800 flex flex-col selection:bg-primary-500 selection:text-white relative overflow-hidden">
      <Navbar toggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
      <div className="flex flex-1 relative w-full h-[calc(100vh-4rem)]">
        <Sidebar isOpen={isMobileMenuOpen} closeMenu={() => setIsMobileMenuOpen(false)} />
        {/* Mobile Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-30 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
        )}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto h-full bg-surface-50 min-w-0">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default PageWrapper;
