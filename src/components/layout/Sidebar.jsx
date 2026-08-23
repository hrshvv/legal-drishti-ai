import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ScanLine, FileText, History, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { role } = useAuth();
  
  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/scanner', icon: ScanLine, label: 'AI Scanner' },
    { path: '/history', icon: History, label: 'Inspection History' },
    { path: '/report/demo', icon: FileText, label: 'Reports' },
  ];

  if (role === 'admin') {
    navItems.push({ path: '/settings', icon: Settings, label: 'System Settings' });
  }

  return (
    <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col h-[calc(100vh-4rem)] sticky top-16 shadow-sm z-40">
      <div className="p-4 flex-1">
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
                <item.icon className={`w-5 h-5 ${item.path === window.location.pathname ? 'text-primary-600' : ''}`} />
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
  );
};

export default Sidebar;
