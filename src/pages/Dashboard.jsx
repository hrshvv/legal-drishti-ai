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
  { name: 'Small Font Size', value: 25 },
  { name: 'No Mfr Address', value: 20 },
  { name: 'Missing Origin', value: 10 },
  { name: 'Other', value: 10 },
];

const COLORS = ['#ff4757', '#ffa502', '#00d4aa', '#f5a623', '#8b9bb4'];

const KpiCard = ({ title, value, icon: Icon, color, subtext }) => (
  <div className="glass-card p-6 flex items-start justify-between animate-fade-up">
    <div>
      <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
      <h3 className="text-3xl font-display font-bold text-white mb-2">{value}</h3>
      <p className={`text-xs ${color}`}>{subtext}</p>
    </div>
    <div className={`p-3 rounded-lg ${color.replace('text-', 'bg-').replace('/80', '/10')} bg-opacity-10`}>
      <Icon className={`w-6 h-6 ${color.split(' ')[0]}`} />
    </div>
  </div>
);

const Dashboard = () => {
  const { role, user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-display font-bold text-white">Dashboard Overview</h2>
          <p className="text-gray-400 text-sm">Welcome back, {user?.name}</p>
        </div>
        {role === 'inspector' && (
          <button onClick={() => navigate('/scanner')} className="btn-primary">
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
          color="text-teal" 
          subtext="+12% from yesterday" 
        />
        <KpiCard 
          title="Non-Compliant Found" 
          value="18" 
          icon={AlertTriangle} 
          color="text-danger" 
          subtext="Requires action" 
        />
        <KpiCard 
          title="Avg. Compliance Rate" 
          value="67.3%" 
          icon={CheckCircle} 
          color="text-gold" 
          subtext="Across all categories" 
        />
        <KpiCard 
          title="Pending Reports" 
          value="9" 
          icon={Clock} 
          color="text-warn" 
          subtext="Drafts needing signature" 
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-card p-6 lg:col-span-2">
          <h3 className="text-lg font-bold text-white mb-4">Weekly Inspection Trend</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                <XAxis dataKey="name" stroke="#6b7280" tick={{fill: '#6b7280', fontSize: 12}} />
                <YAxis stroke="#6b7280" tick={{fill: '#6b7280', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f1629', borderColor: '#1f2937', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend />
                <Bar dataKey="scans" name="Total Scans" fill="#00d4aa" radius={[4, 4, 0, 0]} />
                <Bar dataKey="violations" name="Violations Found" fill="#ff4757" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-lg font-bold text-white mb-4">Violation Breakdown</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={violationData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {violationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f1629', borderColor: '#1f2937', borderRadius: '8px' }}
                />
                <Legend layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ fontSize: '12px' }}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass-card p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-white">Recent Inspections</h3>
          <button onClick={() => navigate('/history')} className="text-gold text-sm hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400 text-sm border-b border-white/10">
                <th className="pb-3 font-medium">Product</th>
                <th className="pb-3 font-medium">Brand</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Score</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockProducts.slice(0, 5).map(prod => (
                <tr key={prod.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-4 text-white font-medium flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-navy-800 flex items-center justify-center overflow-hidden border border-white/10">
                      <span className="text-xs text-gray-500">IMG</span>
                    </div>
                    {prod.name}
                  </td>
                  <td className="py-4 text-gray-300">{prod.brand}</td>
                  <td className="py-4 text-gray-400 text-sm">{new Date(prod.scanDate).toLocaleDateString()}</td>
                  <td className="py-4">
                    <span className={`font-bold ${prod.complianceScore >= 80 ? 'text-teal' : prod.complianceScore >= 60 ? 'text-warn' : 'text-danger'}`}>
                      {prod.complianceScore}%
                    </span>
                  </td>
                  <td className="py-4">
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
