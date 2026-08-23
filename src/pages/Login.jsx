import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, UserCheck, LayoutDashboard } from 'lucide-react';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    login(role);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-navy flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold/5 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="z-10 w-full max-w-4xl flex flex-col items-center">
        <div className="bg-gold/20 p-4 rounded-2xl mb-6 shadow-lg shadow-gold/10">
          <ShieldCheck className="text-gold w-16 h-16" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-display font-bold text-white tracking-wide mb-2 text-center">
          LEGAL <span className="text-gold">DRISHTI</span>
        </h1>
        <p className="text-gray-400 text-center mb-12 uppercase tracking-widest text-sm md:text-base font-medium">
          Automated Compliance & Inspection System
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 w-full max-w-2xl">
          {/* Inspector Role Card */}
          <div 
            onClick={() => handleRoleSelect('inspector')}
            className="glass-card p-8 cursor-pointer group hover:-translate-y-2 flex flex-col items-center text-center animate-fade-up"
          >
            <div className="w-16 h-16 rounded-full bg-teal/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <UserCheck className="text-teal w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Field Inspector</h2>
            <p className="text-gray-400 text-sm mb-6">
              Access the AI Scanner, conduct on-site inspections, and generate compliance reports.
            </p>
            <button className="btn-primary w-full mt-auto">
              Login as Inspector
            </button>
          </div>
          
          {/* Admin Role Card */}
          <div 
            onClick={() => handleRoleSelect('admin')}
            className="glass-card p-8 cursor-pointer group hover:-translate-y-2 flex flex-col items-center text-center animate-fade-up"
            style={{ animationDelay: '0.1s' }}
          >
            <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <LayoutDashboard className="text-gold w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Admin / Supervisor</h2>
            <p className="text-gray-400 text-sm mb-6">
              Monitor regional compliance, view violation trends, and manage inspection history.
            </p>
            <button className="btn-outline w-full mt-auto group-hover:border-gold group-hover:text-gold">
              Login as Admin
            </button>
          </div>
        </div>
        
        <div className="mt-12 flex items-center gap-4 text-xs text-gray-500 font-medium">
          <p>Ministry of Consumer Affairs</p>
          <div className="w-1 h-1 rounded-full bg-gray-500"></div>
          <p>Smart India Hackathon Prototype</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
