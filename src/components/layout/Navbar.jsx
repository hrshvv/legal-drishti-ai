import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { LogOut, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Logo from '../common/Logo';

const Navbar = ({ toggleMobileMenu, isMobileMenuOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-3 sm:px-6 sticky top-0 z-40 shadow-sm w-full">
      <div className="flex items-center gap-2 sm:gap-3">
        <button 
          className="p-2 -ml-1 text-slate-600 hover:text-slate-900 md:hidden flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors"
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-slate-700" />}
        </button>
        <Logo 
          size="sm" 
          variant="badge" 
          showText={true} 
          subtitle="Compliance System" 
        />
      </div>
      
      {user && (
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-800 leading-tight">{user.name}</p>
            <p className="text-xs text-slate-500 font-medium capitalize">{user.role || 'Inspector'}</p>
          </div>
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary-100 border border-primary-200 flex items-center justify-center text-primary-700 font-bold shadow-sm text-sm sm:text-base">
            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <button 
            onClick={handleLogout}
            className="p-2 text-slate-400 hover:text-danger hover:bg-danger-light/50 rounded-lg transition-colors"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
