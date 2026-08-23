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
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-display font-bold text-white">Inspection History</h2>
          <p className="text-gray-400 text-sm">Central repository of all scanned commodities</p>
        </div>
        
        <button className="btn-outline text-sm py-2">
          Export as CSV
        </button>
      </div>

      <div className="glass-card p-6 flex-1 flex flex-col overflow-hidden">
        
        {/* Filters Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
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
                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                  filterStatus === status 
                    ? 'bg-gold text-navy-800' 
                    : 'bg-navy-800 border border-white/10 text-gray-300 hover:bg-white/5'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Results Table */}
        <div className="flex-1 overflow-auto border border-white/10 rounded-lg">
          <table className="w-full text-left">
            <thead className="bg-navy-800 sticky top-0 z-10">
              <tr className="text-gray-300 text-sm border-b border-white/10">
                <th className="p-4 font-medium flex items-center gap-2 cursor-pointer hover:text-white">
                  Date <ArrowUpDown className="w-4 h-4"/>
                </th>
                <th className="p-4 font-medium">Product Details</th>
                <th className="p-4 font-medium">Violations</th>
                <th className="p-4 font-medium">Compliance Score</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(prod => (
                <tr key={prod.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                  <td className="p-4 text-gray-400 text-sm whitespace-nowrap">
                    {new Date(prod.scanDate).toLocaleDateString()}<br/>
                    <span className="text-xs text-gray-500">{new Date(prod.scanDate).toLocaleTimeString()}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded bg-navy-800 flex items-center justify-center border border-white/10 overflow-hidden">
                         <span className="text-xs text-gray-500">IMG</span>
                      </div>
                      <div>
                        <p className="font-bold text-white">{prod.name}</p>
                        <p className="text-xs text-gray-400">{prod.brand} • {prod.category}</p>
                        <p className="text-xs text-gray-500 font-mono mt-1">Batch: {prod.batchNo}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    {prod.violations.length > 0 ? (
                      <span className="text-danger font-medium flex items-center gap-1 text-sm">
                        {prod.violations.length} Detected
                      </span>
                    ) : (
                      <span className="text-gray-500 text-sm">—</span>
                    )}
                  </td>
                  <td className="p-4">
                    <span className={`font-bold ${prod.complianceScore >= 80 ? 'text-teal' : prod.complianceScore >= 60 ? 'text-warn' : 'text-danger'}`}>
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
                      className="p-2 text-gray-400 hover:text-gold hover:bg-gold/10 rounded transition-colors inline-flex items-center gap-1 text-sm font-medium"
                    >
                      <ExternalLink className="w-4 h-4" /> View Report
                    </button>
                  </td>
                </tr>
              ))}
              
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-10 text-center text-gray-500">
                    No products found matching the current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
          <p>Showing {filteredProducts.length} results</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-white/10 rounded hover:bg-white/5 disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 border border-white/10 rounded hover:bg-white/5 disabled:opacity-50" disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
