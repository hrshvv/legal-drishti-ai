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

const VIOLATION_PALETTE = [
  { name: 'Missing MRP', value: 35, color: '#e11d48' },   // Crimson / Rose (High Severity)
  { name: 'Small Font', value: 25, color: '#f59e0b' },    // Warm Amber (Legibility)
  { name: 'No Address', value: 20, color: '#c026d3' },    // Vibrant Magenta / Fuchsia
  { name: 'No Origin', value: 10, color: '#06b6d4' },     // Electric Cyan (Origin/Country)
  { name: 'Other', value: 10, color: '#64748b' },         // Slate / Cool Grey (Miscellaneous)
];

const violationData = VIOLATION_PALETTE.map(({ name, value }) => ({ name, value }));
const COLORS = VIOLATION_PALETTE.map(item => item.color);

const CustomBarTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-sm p-3 rounded-xl border border-slate-200 shadow-xl text-xs space-y-1.5">
        <p className="font-bold text-slate-800 border-b border-slate-100 pb-1 font-display tracking-wide">{label}</p>
        <div className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-1.5 text-indigo-600 font-medium">
            <span className="w-2 h-2 rounded-full bg-indigo-500"></span> Total Scans:
          </span>
          <span className="font-bold font-mono text-slate-800">{payload[0]?.value}</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-1.5 text-rose-600 font-medium">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span> Violations Found:
          </span>
          <span className="font-bold font-mono text-slate-800">{payload[1]?.value}</span>
        </div>
      </div>
    );
  }
  return null;
};

const CustomPieTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-white/95 backdrop-blur-sm px-3.5 py-2 rounded-xl border border-slate-200 shadow-xl text-xs flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: data.payload.fill || data.color }} />
        <span className="font-semibold text-slate-700">{data.name}:</span>
        <span className="font-bold font-mono text-slate-900">{data.value}%</span>
      </div>
    );
  }
  return null;
};

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
        <div className="glass-card p-6 lg:col-span-2 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-800">Weekly Inspection Trend</h3>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="w-3 h-3 rounded bg-indigo-500 inline-block shadow-sm"></span> Total Scans
              </span>
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="w-3 h-3 rounded bg-rose-500 inline-block shadow-sm"></span> Violations Found
              </span>
            </div>
          </div>
          
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="scansGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity={1}/>
                    <stop offset="100%" stopColor="#4338ca" stopOpacity={0.9}/>
                  </linearGradient>
                  <linearGradient id="violationsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fb7185" stopOpacity={1}/>
                    <stop offset="100%" stopColor="#e11d48" stopOpacity={0.9}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" tick={{fill: '#64748b', fontSize: 12, fontWeight: 500}} axisLine={false} tickLine={false} />
                <YAxis stroke="#94a3b8" tick={{fill: '#64748b', fontSize: 12, fontWeight: 500}} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomBarTooltip />} cursor={{ fill: 'rgba(241, 245, 249, 0.6)' }} />
                <Bar dataKey="scans" name="Total Scans" fill="url(#scansGradient)" radius={[6, 6, 0, 0]} maxBarSize={36} />
                <Bar dataKey="violations" name="Violations Found" fill="url(#violationsGradient)" radius={[6, 6, 0, 0]} maxBarSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold text-slate-800">Violation Breakdown</h3>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">By Category</span>
          </div>

          <div className="h-56 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={violationData}
                  innerRadius={58}
                  outerRadius={82}
                  paddingAngle={4}
                  dataKey="value"
                  stroke="none"
                >
                  {violationData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={VIOLATION_PALETTE[index % VIOLATION_PALETTE.length].color} 
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomPieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-display font-bold text-slate-900 leading-none">100%</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-0.5">Distribution</span>
            </div>
          </div>

          {/* Clean Differentiated Legend with Pill Badges */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
            {VIOLATION_PALETTE.map((item, idx) => (
              <div 
                key={item.name} 
                className={`flex items-center justify-between px-2 py-1 rounded-lg bg-slate-50 border border-slate-100 text-xs ${idx === VIOLATION_PALETTE.length - 1 && VIOLATION_PALETTE.length % 2 !== 0 ? 'col-span-2' : ''}`}
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm" style={{ backgroundColor: item.color }} />
                  <span className="font-semibold text-slate-700 truncate text-[11px]">{item.name}</span>
                </div>
                <span className="font-mono font-bold text-slate-900 text-[11px] shrink-0 ml-1">{item.value}%</span>
              </div>
            ))}
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
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right rounded-tr-lg">Action</th>
              </tr>
            </thead>
            <tbody>
              {mockProducts.slice(0, 5).map((prod) => (
                <tr 
                  key={prod.id} 
                  onClick={() => navigate(`/report/${prod.id}`)}
                  className="border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer group"
                >
                  <td className="p-4 text-slate-800 font-semibold flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center overflow-hidden border border-slate-200 shadow-sm shrink-0 p-0.5">
                      {prod.imageUrl ? (
                        <img src={prod.imageUrl} alt={prod.name} className="w-full h-full object-contain" />
                      ) : (
                        <span className="text-[10px] text-slate-400 font-bold">IMG</span>
                      )}
                    </div>
                    <div>
                      <span className="text-slate-900 group-hover:text-primary-600 transition-colors font-bold block">{prod.name}</span>
                      <span className="text-xs text-slate-400 font-mono">Batch: {prod.batchNo}</span>
                    </div>
                  </td>
                  <td className="p-4 text-slate-600 font-medium">{prod.brand}</td>
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
                  <td className="p-4 text-right">
                    <span className="text-xs font-bold text-primary-600 group-hover:underline">
                      View Report →
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
