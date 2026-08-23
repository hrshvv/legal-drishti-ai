import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useAuth } from '../../context/AuthContext';
import { Outlet } from 'react-router-dom';

const PageWrapper = ({ children }) => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-surface-50 text-slate-800 flex flex-col selection:bg-primary-500 selection:text-white">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto h-[calc(100vh-4rem)] bg-surface-50">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default PageWrapper;
