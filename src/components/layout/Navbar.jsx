import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { LogOut, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="h-16 bg-navy-800 border-b border-white/10 flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="bg-gold/20 p-2 rounded-lg">
          <ShieldCheck className="text-gold w-6 h-6" />
        </div>
        <div>
          <h1 className="text-lg font-display font-bold text-white tracking-wide">LEGAL DRISHTI</h1>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest leading-none">Compliance & Inspection System</p>
        </div>
      </div>
      
      {user && (
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-semibold text-white">{user.name}</p>
            <p className="text-xs text-gray-400">{user.id}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-teal/20 border border-teal/30 flex items-center justify-center text-teal font-bold">
            {user.name.charAt(0)}
          </div>
          <button 
            onClick={handleLogout}
            className="ml-2 p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
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
