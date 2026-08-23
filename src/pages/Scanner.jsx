import React, { useState, useEffect } from 'react';
import { UploadCloud, ScanLine, FileCheck2, AlertTriangle, ShieldCheck, FileText, Download } from 'lucide-react';
import { mockProducts } from '../data/mockData';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Scanner = () => {
  const [stage, setStage] = useState('upload'); // upload | scanning | results
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanLogs, setScanLogs] = useState([]);
  const navigate = useNavigate();
  const { setActiveProduct, addScanToHistory } = useAppContext();

  const handleDemoSelect = (e) => {
    const prodId = e.target.value;
    if (!prodId) return;
    const prod = mockProducts.find(p => p.id === prodId);
    setSelectedProduct(prod);
  };

  const startScan = () => {
    if (!selectedProduct) return;
    setStage('scanning');
    setScanProgress(0);
    setScanLogs([]);

    const steps = [
      "Image preprocessing complete",
      "OCR extraction initiated — 14 text regions detected",
      "Running Legal Metrology Rules validation engine",
      "Font size & readability analysis complete",
      "Cross-referencing mandatory declaration checklist",
      "Generating compliance report..."
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        const next = prev + 4; // 25 ticks to 100% (approx 2.5s at 100ms interval)
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setStage('results');
            setActiveProduct(selectedProduct);
            addScanToHistory(selectedProduct);
          }, 500);
          return 100;
        }
        
        // Add log every ~16%
        if (next % 16 === 0 && currentStep < steps.length) {
          setScanLogs(prevLogs => [...prevLogs, steps[currentStep]]);
          currentStep++;
        }
        
        return next;
      });
    }, 100);
  };

  return (
    <div className="max-w-6xl mx-auto h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-display font-bold text-white">AI Compliance Scanner</h2>
          <p className="text-gray-400 text-sm">Automated extraction and rule-based validation engine</p>
        </div>
        
        {stage !== 'upload' && (
          <button onClick={() => setStage('upload')} className="btn-outline text-sm py-1.5">
            Start New Scan
          </button>
        )}
      </div>

      <div className="flex-1 bg-navy-800 border border-white/10 rounded-xl overflow-hidden relative shadow-2xl">
        
        {/* STAGE 1: UPLOAD */}
        {stage === 'upload' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
            <div className="w-full max-w-2xl border-2 border-dashed border-gray-600 rounded-2xl p-12 flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 hover:border-gold/50 transition-all cursor-pointer group">
              <div className="w-20 h-20 bg-navy rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <UploadCloud className="w-10 h-10 text-gold" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Upload Product Label</h3>
              <p className="text-gray-400 text-center mb-8 max-w-sm">
                Drag and drop high-resolution images of the packaged commodity, or click to browse.
              </p>
              
              <div className="flex w-full items-center gap-4">
                <div className="h-px bg-white/10 flex-1"></div>
                <span className="text-gray-500 text-sm font-medium uppercase tracking-widest">OR</span>
                <div className="h-px bg-white/10 flex-1"></div>
              </div>
              
              <div className="mt-8 w-full max-w-md">
                <label className="block text-sm font-medium text-gray-300 mb-2">Select Mock Product for Demo</label>
                <select 
                  className="input-field"
                  onChange={handleDemoSelect}
                  defaultValue=""
                >
                  <option value="" disabled>-- Choose Demo Product --</option>
                  {mockProducts.map(p => (
                    <option key={p.id} value={p.id}>{p.brand} {p.name}</option>
                  ))}
                </select>
              </div>
              
              {selectedProduct && (
                <button 
                  onClick={startScan}
                  className="btn-primary mt-8 w-full max-w-md animate-fade-up"
                >
                  <ScanLine className="w-5 h-5" />
                  Initiate AI Scan
                </button>
              )}
            </div>
          </div>
        )}

        {/* STAGE 2: SCANNING ANIMATION */}
        {stage === 'scanning' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-navy/95 p-8 backdrop-blur-sm z-10">
            <div className="relative w-64 h-64 mb-12">
              {/* Product Image Placeholder (Blurred) */}
              <div className="absolute inset-4 bg-navy-800 rounded-xl overflow-hidden border border-white/20">
                 <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                   <span className="text-gray-600 font-display text-4xl opacity-50">IMAGE</span>
                 </div>
              </div>
              
              {/* Scan Line & Rings */}
              <div className="absolute inset-0 border border-gold/30 rounded-2xl animate-pulse"></div>
              <div className="absolute inset-0 border-2 border-teal/50 rounded-2xl animate-pulse-ring"></div>
              <div className="absolute w-full h-1 bg-gold shadow-[0_0_15px_#f5a623] z-20 animate-scan-line"></div>
            </div>
            
            <div className="w-full max-w-md">
              <div className="flex justify-between items-end mb-2">
                <span className="text-gold font-display text-xl font-bold tracking-widest animate-pulse">ANALYZING...</span>
                <span className="text-white font-bold">{scanProgress}%</span>
              </div>
              <div className="h-2 bg-navy-800 rounded-full overflow-hidden border border-white/10 mb-6">
                <div 
                  className="h-full bg-gradient-to-r from-teal to-gold transition-all duration-100"
                  style={{ width: `${scanProgress}%` }}
                ></div>
              </div>
              
              <div className="h-40 overflow-hidden font-mono text-xs">
                {scanLogs.map((log, i) => (
                  <div key={i} className="flex items-center gap-2 mb-2 text-teal animate-fade-up">
                    <CheckCircle className="w-3 h-3" />
                    <span>{log}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STAGE 3: RESULTS PANEL */}
        {stage === 'results' && selectedProduct && (
          <div className="absolute inset-0 flex overflow-hidden">
            {/* Left Col: Image & Bounding Boxes */}
            <div className="w-1/2 border-r border-white/10 p-6 flex flex-col relative bg-navy-800/50">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <ScanLine className="text-gold w-5 h-5"/> Image Analysis
              </h3>
              <div className="flex-1 bg-navy rounded-lg border border-white/5 relative overflow-hidden flex items-center justify-center group">
                <div className="w-2/3 h-2/3 bg-gray-800 rounded flex items-center justify-center relative">
                   <span className="text-gray-600 font-display text-2xl">{selectedProduct.name}</span>
                   
                   {/* Simulated Bounding Boxes */}
                   <div className="absolute top-[10%] left-[10%] w-[30%] h-[15%] border-2 border-teal rounded bg-teal/10 flex items-end p-1 hover:bg-teal/30 transition-colors">
                     <span className="text-[8px] bg-teal text-navy px-1 font-bold">MRP</span>
                   </div>
                   <div className="absolute bottom-[20%] right-[10%] w-[40%] h-[20%] border-2 border-teal rounded bg-teal/10 flex items-end p-1 hover:bg-teal/30 transition-colors">
                     <span className="text-[8px] bg-teal text-navy px-1 font-bold">ADDRESS</span>
                   </div>
                   
                   {/* Inject a red box if there are critical violations */}
                   {selectedProduct.violations.some(v => v.severity === 'critical') && (
                      <div className="absolute top-[30%] left-[20%] w-[50%] h-[25%] border-2 border-danger rounded bg-danger/10 flex items-end p-1 hover:bg-danger/30 transition-colors animate-pulse">
                        <span className="text-[8px] bg-danger text-white px-1 font-bold">VIOLATION DETECTED</span>
                      </div>
                   )}
                </div>
              </div>
            </div>
            
            {/* Right Col: Data & Violations */}
            <div className="w-1/2 p-6 overflow-y-auto bg-navy flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedProduct.brand} {selectedProduct.name}</h3>
                  <p className="text-gray-400 text-sm">Batch: {selectedProduct.batchNo}</p>
                </div>
                <div className="flex flex-col items-end">
                   <span className={`badge mb-2 ${
                      selectedProduct.status === 'compliant' ? 'badge-success' : 
                      selectedProduct.status === 'partial' ? 'badge-warning' : 'badge-danger'
                    }`}>
                      {selectedProduct.status}
                    </span>
                    <span className="text-sm font-bold text-gray-300">Score: <span className={selectedProduct.complianceScore >= 80 ? 'text-teal' : selectedProduct.complianceScore >= 60 ? 'text-warn' : 'text-danger'}>{selectedProduct.complianceScore}/100</span></span>
                </div>
              </div>

              {selectedProduct.violations.length > 0 ? (
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-white mb-3 uppercase tracking-wider flex items-center gap-2">
                    <AlertTriangle className="text-danger w-4 h-4"/> Detected Violations
                  </h4>
                  <div className="space-y-3">
                    {selectedProduct.violations.map((v, i) => (
                      <div key={i} className={`p-3 rounded-lg border bg-opacity-10 backdrop-blur-sm ${
                        v.severity === 'critical' ? 'bg-danger border-danger/30' : 'bg-warn border-warn/30'
                      }`}>
                        <div className="flex justify-between items-start mb-1">
                          <span className={`text-xs font-bold ${v.severity === 'critical' ? 'text-danger' : 'text-warn'}`}>{v.rule} ({v.lmSection})</span>
                          <span className="text-[10px] uppercase bg-white/10 px-1.5 py-0.5 rounded text-white">{v.field}</span>
                        </div>
                        <p className="text-sm text-gray-200">{v.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mb-6 p-4 rounded-lg bg-teal/10 border border-teal/30 flex items-center gap-3">
                  <ShieldCheck className="text-teal w-8 h-8" />
                  <div>
                    <h4 className="font-bold text-teal">Fully Compliant</h4>
                    <p className="text-sm text-gray-300">No violations of Legal Metrology Rules detected.</p>
                  </div>
                </div>
              )}

              <div className="mb-8 flex-1">
                <h4 className="text-sm font-bold text-white mb-3 uppercase tracking-wider flex items-center gap-2">
                  <FileCheck2 className="text-gold w-4 h-4"/> Extracted Declarations
                </h4>
                <div className="bg-navy-800 rounded-lg border border-white/10 overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <tbody>
                      {Object.entries(selectedProduct.declarations).map(([key, val], i) => (
                        <tr key={key} className="border-b border-white/5 hover:bg-white/5">
                          <td className="py-2 px-3 text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</td>
                          <td className="py-2 px-3 text-white font-medium">{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex gap-4 mt-auto">
                <button className="btn-outline flex-1" onClick={() => navigate('/history')}>
                   Save to Repository
                </button>
                <button className="btn-primary flex-1" onClick={() => navigate(`/report/${selectedProduct.id}`)}>
                  <FileText className="w-4 h-4" />
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Extracted CheckCircle for cleaner code above
const CheckCircle = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

export default Scanner;
