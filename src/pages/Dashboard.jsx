import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { FileSearch, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { mockProducts } from '../data/mockData';
import { useNavigate } from 'react-router-dom';

const trendData = [
  { name: 'Mon', scans: 12, violations: 4 },
  { name: 'Tue', scans: 19, violations: 7 },
  { name: 'Wed', scans: 15, violations: 3 },
  { name: 'Thu', scans: 22, violations: 9 },
  { name: 'Fri', scans: 28, violations: 12 },
  { name: 'Sat', scans: 10, violations: 2 },
  { name: 'Sun', scans: 5, violations: 1 },
];

const violationData = [
  { name: 'Missing MRP', value: 35 },
  { name: 'Small Font', value: 25 },
  { name: 'No Address', value: 20 },
  { name: 'No Origin', value: 10 },
  { name: 'Other', value: 10 },
];

const COLORS = ['#ef4444', '#f59e0b', '#3b82f6', '#10b981', '#94a3b8'];

const KpiCard = ({ title, value, icon: Icon, colorClass, subtext, bgColor }) => (
  <div className="glass-card p-6 flex items-start justify-between animate-fade-up">
    <div>
      <p className="text-slate-500 text-sm font-semibold mb-1 uppercase tracking-wide">{title}</p>
      <h3 className="text-3xl font-display font-bold text-slate-900 mb-2">{value}</h3>
      <p className={`text-xs font-medium ${colorClass}`}>{subtext}</p>
    </div>
    <div className={`p-4 rounded-xl ${bgColor}`}>
      <Icon className={`w-7 h-7 ${colorClass}`} />
    </div>
  </div>
);

const Dashboard = () => {
  const { role, user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h2 className="text-2xl font-display font-bold text-slate-900">Dashboard Overview</h2>
          <p className="text-slate-500 font-medium">Welcome back, {user?.name}</p>
        </div>
        {role === 'inspector' && (
          <button onClick={() => navigate('/scanner')} className="btn-primary shadow-primary-500/30">
            <FileSearch className="w-5 h-5" />
            New AI Scan
          </button>
        )}
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard 
          title="Inspections Today" 
          value="47" 
          icon={FileSearch} 
          colorClass="text-primary-600" 
          bgColor="bg-primary-50"
          subtext="+12% from yesterday" 
        />
        <KpiCard 
          title="Non-Compliant" 
          value="18" 
          icon={AlertTriangle} 
          colorClass="text-danger" 
          bgColor="bg-danger-light/50"
          subtext="Requires action" 
        />
        <KpiCard 
          title="Compliance Rate" 
          value="67.3%" 
          icon={CheckCircle} 
          colorClass="text-success" 
          bgColor="bg-success-light/50"
          subtext="Across all categories" 
        />
        <KpiCard 
          title="Pending Reports" 
          value="9" 
          icon={Clock} 
          colorClass="text-warn" 
          bgColor="bg-warn-light/50"
          subtext="Drafts needing signature" 
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-card p-6 lg:col-span-2">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Weekly Inspection Trend</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" tick={{fill: '#64748b', fontSize: 12}} axisLine={false} tickLine={false} />
                <YAxis stroke="#64748b" tick={{fill: '#64748b', fontSize: 12}} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderColor: '#e2e8f0', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#1e293b', fontWeight: 'bold' }}
                />
                <Legend wrapperStyle={{ paddingTop: '20px' }}/>
                <Bar dataKey="scans" name="Total Scans" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={40} />
                <Bar dataKey="violations" name="Violations Found" fill="#ef4444" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-2">Violation Breakdown</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={violationData}
                  innerRadius={65}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {violationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderColor: '#e2e8f0', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ fontSize: '13px', paddingTop: '10px' }}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass-card">
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-800">Recent Inspections</h3>
          <button onClick={() => navigate('/history')} className="text-primary-600 font-semibold text-sm hover:text-primary-700 hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto p-2">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-slate-500 text-xs uppercase tracking-wider bg-slate-50">
                <th className="p-4 font-semibold rounded-tl-lg">Product</th>
                <th className="p-4 font-semibold">Brand</th>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold">Score</th>
                <th className="p-4 font-semibold rounded-tr-lg">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockProducts.slice(0, 5).map((prod, idx) => (
                <tr key={prod.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 text-slate-800 font-semibold flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-white flex items-center justify-center overflow-hidden border border-slate-200 shadow-sm">
                      <span className="text-[10px] text-slate-400 font-bold">IMG</span>
                    </div>
                    {prod.name}
                  </td>
                  <td className="p-4 text-slate-600">{prod.brand}</td>
                  <td className="p-4 text-slate-500 text-sm font-medium">{new Date(prod.scanDate).toLocaleDateString()}</td>
                  <td className="p-4">
                    <span className={`font-bold ${prod.complianceScore >= 80 ? 'text-success' : prod.complianceScore >= 60 ? 'text-warn' : 'text-danger'}`}>
                      {prod.complianceScore}%
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`badge ${
                      prod.status === 'compliant' ? 'badge-success' : 
                      prod.status === 'partial' ? 'badge-warning' : 'badge-danger'
                    }`}>
                      {prod.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
