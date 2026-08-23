import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, UserCheck, LayoutDashboard, ArrowRight } from 'lucide-react';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    login(role);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-surface-50 flex flex-col relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[60vh] bg-gradient-to-b from-primary-100/50 to-transparent"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-200/50 rounded-full blur-[80px] animate-pulse"></div>
      <div className="absolute top-40 -left-20 w-72 h-72 bg-blue-300/30 rounded-full blur-[60px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      {/* Navbar (Minimal for Login) */}
      <nav className="relative z-10 px-8 py-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-primary-600 p-2 rounded-xl shadow-lg shadow-primary-500/30">
            <ShieldCheck className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-display font-bold text-slate-900 tracking-wide">LEGAL DRISHTI</h1>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-4 text-sm font-medium text-slate-600">
          <span>Govt. of India</span>
          <div className="w-1 h-1 rounded-full bg-slate-300"></div>
          <span>Ministry of Consumer Affairs</span>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex-1 z-10 w-full max-w-6xl mx-auto flex flex-col items-center justify-center px-4 mt-8 md:mt-0">
        <div className="text-center max-w-3xl mb-16 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 font-semibold text-sm mb-6 border border-primary-200">
            <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
            Smart India Hackathon Prototype
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
            Automating <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-400">Legal Metrology</span> Compliance
          </h1>
          <p className="text-lg md:text-xl text-slate-600 font-medium max-w-2xl mx-auto">
            Leveraging AI to extract, analyze, and validate mandatory packaging declarations instantly. Select your role to begin the demo.
          </p>
        </div>
        
        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
          {/* Inspector Role Card */}
          <div 
            onClick={() => handleRoleSelect('inspector')}
            className="group relative bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary-500/20 hover:border-primary-200 animate-fade-up"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-100 to-white rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
            
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mb-6 shadow-lg shadow-primary-500/30 group-hover:scale-110 transition-transform duration-300 text-white">
              <UserCheck className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Field Inspector</h2>
            <p className="text-slate-500 mb-8 leading-relaxed">
              Access the AI Scanner, conduct on-site product inspections, and generate immediate compliance reports.
            </p>
            <div className="flex items-center text-primary-600 font-semibold gap-2 group-hover:gap-4 transition-all">
              Login as Inspector <ArrowRight className="w-5 h-5" />
            </div>
          </div>
          
          {/* Admin Role Card */}
          <div 
            onClick={() => handleRoleSelect('admin')}
            className="group relative bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-200 animate-fade-up"
            style={{ animationDelay: '0.1s' }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-slate-100 to-white rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
            
            <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-50 group-hover:border-blue-200 transition-all duration-300">
              <LayoutDashboard className="text-slate-700 group-hover:text-blue-600 w-8 h-8 transition-colors" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Admin Dashboard</h2>
            <p className="text-slate-500 mb-8 leading-relaxed">
              Monitor regional compliance rates, view violation trends, and oversee all inspection histories.
            </p>
            <div className="flex items-center text-slate-600 group-hover:text-blue-600 font-semibold gap-2 group-hover:gap-4 transition-all">
              Login as Admin <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
