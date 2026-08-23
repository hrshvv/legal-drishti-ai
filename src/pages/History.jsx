import React, { useState } from 'react';
import { Search, Filter, ArrowUpDown, ExternalLink } from 'lucide-react';
import { mockProducts } from '../data/mockData';
import { useNavigate } from 'react-router-dom';

const History = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const navigate = useNavigate();

  const filteredProducts = mockProducts.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || p.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-display font-bold text-slate-900">Inspection History</h2>
          <p className="text-slate-500 font-medium">Central repository of all scanned commodities</p>
        </div>
        
        <button className="btn-outline text-sm py-2">
          Export as CSV
        </button>
      </div>

      <div className="glass-card p-6 flex-1 flex flex-col overflow-hidden">
        
        {/* Filters Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by product name, brand, or batch no..." 
              className="input-field pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            {['all', 'compliant', 'partial', 'non-compliant'].map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg text-sm font-bold capitalize transition-all ${
                  filterStatus === status 
                    ? 'bg-primary-600 text-white shadow-md shadow-primary-500/20' 
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Results Table */}
        <div className="flex-1 overflow-auto border border-slate-200 rounded-xl shadow-sm">
          <table className="w-full text-left bg-white">
            <thead className="bg-slate-50 sticky top-0 z-10">
              <tr className="text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200">
                <th className="p-4 font-bold flex items-center gap-2 cursor-pointer hover:text-slate-800">
                  Date <ArrowUpDown className="w-3 h-3"/>
                </th>
                <th className="p-4 font-bold">Product Details</th>
                <th className="p-4 font-bold">Violations</th>
                <th className="p-4 font-bold">Score</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(prod => (
                <tr key={prod.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors group">
                  <td className="p-4 text-slate-600 text-sm whitespace-nowrap font-medium">
                    {new Date(prod.scanDate).toLocaleDateString()}<br/>
                    <span className="text-xs text-slate-400">{new Date(prod.scanDate).toLocaleTimeString()}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-slate-900 flex items-center justify-center border border-slate-200 shadow-sm overflow-hidden p-0.5 shrink-0">
                        {prod.imageUrl ? (
                          <img src={prod.imageUrl} alt={prod.name} className="w-full h-full object-contain" />
                        ) : (
                          <span className="text-[10px] text-slate-400 font-bold">LABEL</span>
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{prod.name}</p>
                        <p className="text-xs font-medium text-slate-500">{prod.brand} • {prod.category}</p>
                        <p className="text-[10px] text-slate-400 font-mono mt-1 font-bold">BATCH: {prod.batchNo}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    {prod.violations.length > 0 ? (
                      <span className="text-danger font-bold flex items-center gap-1 text-sm">
                        {prod.violations.length} Detected
                      </span>
                    ) : (
                      <span className="text-slate-400 text-sm font-bold">—</span>
                    )}
                  </td>
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
                    <button 
                      onClick={() => navigate(`/report/${prod.id}`)}
                      className="px-3 py-1.5 text-primary-600 hover:text-white hover:bg-primary-600 border border-primary-100 rounded-lg transition-all inline-flex items-center gap-1.5 text-sm font-bold shadow-sm"
                    >
                      <ExternalLink className="w-4 h-4" /> View Report
                    </button>
                  </td>
                </tr>
              ))}
              
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-16 text-center text-slate-500 font-medium">
                    <Search className="w-8 h-8 mx-auto text-slate-300 mb-3" />
                    No products found matching the current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 flex justify-between items-center text-sm font-medium text-slate-500">
          <p>Showing {filteredProducts.length} results</p>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 border border-slate-200 rounded hover:bg-slate-50 text-slate-700 disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1.5 border border-slate-200 rounded hover:bg-slate-50 text-slate-700 disabled:opacity-50" disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
