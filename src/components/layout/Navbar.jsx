import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { LogOut, ShieldCheck, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ toggleMobileMenu }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-6 sticky top-0 z-50 shadow-sm w-full">
      <div className="flex items-center gap-3">
        <button 
          className="p-2 -ml-2 text-slate-500 hover:text-slate-800 md:hidden flex items-center justify-center rounded-lg hover:bg-slate-50 transition-colors"
          onClick={toggleMobileMenu}
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="bg-primary-600 p-2 rounded-lg shadow-md shadow-primary-500/20">
          <ShieldCheck className="text-white w-6 h-6" />
        </div>
        <div>
          <h1 className="text-lg font-display font-bold text-slate-900 tracking-wide leading-tight">LEGAL DRISHTI</h1>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest leading-none font-medium mt-0.5">Compliance System</p>
        </div>
      </div>
      
      {user && (
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-800">{user.name}</p>
            <p className="text-xs text-slate-500 font-medium">{user.id}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary-100 border border-primary-200 flex items-center justify-center text-primary-700 font-bold shadow-sm">
            {user.name.charAt(0)}
          </div>
          <button 
            onClick={handleLogout}
            className="ml-2 p-2 text-slate-400 hover:text-danger hover:bg-danger-light/50 rounded-lg transition-colors"
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
