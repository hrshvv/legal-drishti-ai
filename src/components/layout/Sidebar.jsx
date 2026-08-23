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
    <aside className="w-64 bg-navy-800 border-r border-white/10 hidden md:flex flex-col h-[calc(100vh-4rem)] sticky top-16">
      <div className="p-4 flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? 'bg-gold/10 text-gold border border-gold/20' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="p-4 border-t border-white/10">
        <div className="bg-glass rounded-lg p-4">
          <p className="text-xs text-gray-400 mb-2">System Status</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-teal animate-pulse"></div>
            <span className="text-sm font-medium text-teal">AI Engine Online</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
