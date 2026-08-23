import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ScanLine, FileText, History, Settings, X, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ isOpen, closeMenu }) => {
  const { role } = useAuth();
  
  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/scanner', icon: ScanLine, label: 'AI Scanner' },
    { path: '/history', icon: History, label: 'Inspection History' },
    { path: '/report', icon: FileText, label: 'Reports' },
  ];

  if (role === 'admin') {
    navItems.push({ path: '/settings', icon: Settings, label: 'System Settings' });
  }

  return (
    <>
      {/* Desktop Sidebar (visible on md screens and up) */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 sticky top-16 h-[calc(100vh-4rem)] shadow-sm shrink-0 z-30">
        <div className="p-4 flex-1 overflow-y-auto">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => 
                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
                      isActive 
                        ? 'bg-primary-50 text-primary-700 border border-primary-100 shadow-sm' 
                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                    }`
                  }
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="p-4 border-t border-slate-100">
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
            <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">System Status</p>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-success animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
              <span className="text-sm font-bold text-slate-700">AI Engine Online</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Off-Canvas Drawer (slides in from left) */}
      <aside 
        className={`fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-white shadow-2xl z-50 flex flex-col md:hidden transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-4 flex items-center justify-between border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="bg-primary-600 p-1.5 rounded-lg shadow-sm">
              <ShieldCheck className="text-white w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-slate-900 text-sm">Legal Drishti</span>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Navigation Menu</p>
            </div>
          </div>
          <button 
            onClick={closeMenu} 
            className="p-2 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-200 transition-colors"
            aria-label="Close Navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Navigation Links */}
        <div className="p-4 flex-1 overflow-y-auto">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={closeMenu}
                  className={({ isActive }) => 
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-bold text-sm ${
                      isActive 
                        ? 'bg-primary-50 text-primary-700 border border-primary-200 shadow-sm' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`
                  }
                >
                  <item.icon className="w-5 h-5 text-primary-600" />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Drawer Footer Status */}
        <div className="p-4 border-t border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-success animate-pulse"></div>
            <span className="text-xs font-bold text-slate-700">AI Engine Online (v2.4)</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
