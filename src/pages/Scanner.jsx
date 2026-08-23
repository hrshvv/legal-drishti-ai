import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  ScanLine, 
  FileCheck2, 
  AlertTriangle, 
  ShieldCheck, 
  FileText, 
  RotateCcw, 
  Ruler, 
  Sparkles, 
  CheckCircle2, 
  Check,
  Package,
  ArrowRight,
  Scale
} from 'lucide-react';
import { mockProducts, generateCustomImageAnalysis } from '../data/mockData';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Scanner = () => {
  const [stage, setStage] = useState('upload'); // 'upload' | 'scanning' | 'results'
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [customImageSrc, setCustomImageSrc] = useState(null);
  const [customFileName, setCustomFileName] = useState(null);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanLogs, setScanLogs] = useState([]);

  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { setActiveProduct, addScanToHistory } = useAppContext();

  // Handle local image file upload
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setCustomImageSrc(imageUrl);
    setCustomFileName(file.name);

    const customAnalysis = generateCustomImageAnalysis(file.name.replace(/\.[^/.]+$/, ""), file.size);
    setSelectedProduct(customAnalysis);
  };

  // Handle selecting a demo product from dropdown
  const handleDemoSelect = (e) => {
    const prodId = e.target.value;
    if (!prodId) return;
    const prod = mockProducts.find(p => p.id === prodId);
    if (prod) {
      setSelectedProduct(prod);
      setCustomImageSrc(null);
      setCustomFileName(null);
    }
  };

  // Start the live AI scanning sequence
  const startScan = () => {
    if (!selectedProduct) return;
    setStage('scanning');
    setScanProgress(0);
    setScanLogs([]);

    const steps = [
      "Image contrast normalization applied",
      "OCR text line segmentation: 14 mandatory fields isolated",
      `Principal Display Panel (PDP) estimated: ${selectedProduct.pdpAreaCm2 || 240} cm²`,
      "Schedule II Font Engine: Measuring letter millimeter heights",
      "Cross-verifying declarations against Legal Metrology Rules, 2011",
      "Compliance audit complete • Report compiled"
    ];

    let stepIndex = 0;
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        const next = prev + 3;
        
        if (next >= (stepIndex + 1) * 16 && stepIndex < steps.length) {
          setScanLogs(old => [...old, steps[stepIndex]]);
          stepIndex++;
        }

        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setStage('results');
            if (selectedProduct) {
              setActiveProduct(selectedProduct);
              addScanToHistory(selectedProduct);
            }
          }, 400);
          return 100;
        }
        return next;
      });
    }, 60);
  };

  const resetScanner = () => {
    setStage('upload');
    setScanProgress(0);
    setSelectedProduct(null);
    setCustomImageSrc(null);
    setCustomFileName(null);
  };

  return (
    <div className="max-w-6xl mx-auto h-full flex flex-col">
      
      {/* Top Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-display font-bold text-slate-900">AI Compliance Scanner</h2>
          <p className="text-slate-500 font-medium">Automated extraction and rule-based validation engine</p>
        </div>

        {stage !== 'upload' && (
          <button 
            onClick={resetScanner} 
            className="btn-outline text-sm py-1.5 bg-white shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Start New Scan</span>
          </button>
        )}
      </div>

      {/* Main Card Container */}
      <div className="flex-1 bg-white border border-slate-200 rounded-2xl overflow-hidden relative shadow-lg flex flex-col min-h-[560px]">
        
        {/* ========================================================================= */}
        {/* STAGE 1: CLEAN UPLOAD BOX WITH DEMO DROPDOWN */}
        {/* ========================================================================= */}
        {stage === 'upload' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-slate-50/50">
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="w-full max-w-2xl border-2 border-dashed border-slate-300 rounded-2xl p-12 flex flex-col items-center justify-center bg-white hover:bg-primary-50/50 hover:border-primary-400 transition-all cursor-pointer group shadow-sm"
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                accept="image/*" 
                className="hidden" 
              />

              <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary-100 transition-all">
                <UploadCloud className="w-10 h-10 text-primary-500" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {customFileName ? customFileName : "Upload Product Label"}
              </h3>
              <p className="text-slate-500 text-center mb-8 max-w-sm">
                {customFileName 
                  ? "Image selected. Click Initiate AI Scan below or choose another product." 
                  : "Drag and drop high-resolution images of the packaged commodity, or click to browse."}
              </p>

              <div className="flex w-full items-center gap-4">
                <div className="h-px bg-slate-200 flex-1"></div>
                <span className="text-slate-400 text-sm font-semibold uppercase tracking-widest">OR</span>
                <div className="h-px bg-slate-200 flex-1"></div>
              </div>

              <div 
                className="mt-8 w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <label className="block text-sm font-bold text-slate-700 mb-2">Select Mock Product for Demo</label>
                <select 
                  className="input-field shadow-sm cursor-pointer"
                  onChange={handleDemoSelect}
                  value={selectedProduct && !customImageSrc ? selectedProduct.id : ""}
                >
                  <option value="" disabled>-- Choose Demo Product --</option>
                  {mockProducts.map(p => (
                    <option key={p.id} value={p.id}>{p.brand} {p.name}</option>
                  ))}
                </select>
              </div>

              {selectedProduct && (
                <button 
                  type="button"
                  onClick={(e) => { e.stopPropagation(); startScan(); }}
                  className="btn-primary mt-8 w-full max-w-md animate-fade-up shadow-primary-500/30 text-sm py-3"
                >
                  <ScanLine className="w-5 h-5" />
                  <span>Initiate AI Scan</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STAGE 2: HIGH-TECH SCANNING ANIMATION */}
        {/* ========================================================================= */}
        {stage === 'scanning' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/95 p-8 backdrop-blur-md z-10">
            
            <div className="relative w-40 h-40 mb-8 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-primary-100 animate-ping opacity-50"></div>
              <div className="absolute inset-2 rounded-full border-2 border-dashed border-primary-400 animate-spin" style={{ animationDuration: '6s' }}></div>
              <div className="w-28 h-28 rounded-full bg-primary-50 border border-primary-200 flex flex-col items-center justify-center text-primary-600 shadow-md">
                <ScanLine className="w-8 h-8 animate-pulse text-primary-600 mb-1" />
                <span className="text-xs font-mono font-bold">{scanProgress}%</span>
              </div>
            </div>

            <div className="w-full max-w-md text-center space-y-4">
              <div>
                <span className="text-primary-600 font-display text-xl font-black tracking-wider animate-pulse block">
                  ANALYZING STATUTORY COMPLIANCE...
                </span>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Verifying {selectedProduct?.brand} {selectedProduct?.name} against Legal Metrology Rules
                </p>
              </div>

              <div className="h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200 shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-primary-400 to-primary-600 transition-all duration-100"
                  style={{ width: `${scanProgress}%` }}
                ></div>
              </div>

              <div className="h-32 overflow-hidden font-mono text-xs space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200 text-left">
                {scanLogs.map((log, i) => (
                  <div key={i} className="flex items-center gap-2 text-slate-700 animate-fade-up">
                    <Check className="w-3.5 h-3.5 text-success shrink-0" />
                    <span className="truncate">{log}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STAGE 3: CLEAN RESULTS & COMPLIANCE VERDICT DASHBOARD */}
        {/* ========================================================================= */}
        {stage === 'results' && selectedProduct && (
          <div className="flex-1 p-6 md:p-8 overflow-y-auto flex flex-col justify-between space-y-6">
            
            {/* Top Product Banner & Scorecard */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary-700 bg-primary-100 px-2 py-0.5 rounded">
                    {selectedProduct.category}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Batch: <strong className="text-slate-700">{selectedProduct.batchNo}</strong>
                  </span>
                </div>
                <h3 className="text-2xl font-display font-black text-slate-900 leading-tight">
                  {selectedProduct.brand} {selectedProduct.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Principal Display Panel Surface Area: <strong>{selectedProduct.pdpAreaCm2 || 240} cm²</strong> • Verified under PCR 2011
                </p>
              </div>

              <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-slate-200 pt-3 md:pt-0 md:pl-6">
                <div className="text-right">
                  <span className={`badge mb-1.5 text-xs px-3 py-1 ${
                    selectedProduct.status === 'compliant' ? 'badge-success' : 
                    selectedProduct.status === 'partial' ? 'badge-warning' : 'badge-danger'
                  }`}>
                    {selectedProduct.status === 'compliant' ? '100% COMPLIANT' : 
                     selectedProduct.status === 'partial' ? 'PARTIAL COMPLIANCE' : 'NON-COMPLIANT'}
                  </span>
                  <p className="text-xs font-bold text-slate-500">
                    Score: <strong className={`text-base ${
                      selectedProduct.complianceScore >= 80 ? 'text-success' : 
                      selectedProduct.complianceScore >= 60 ? 'text-warn' : 'text-danger'
                    }`}>{selectedProduct.complianceScore}/100</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Main Content Grid: Violations & Extracted Declarations */}
            <div className="grid lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Col (5 cols): Violations & Font Analysis */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Violations Card */}
                {selectedProduct.violations?.length > 0 ? (
                  <div className="bg-white border border-danger/30 rounded-2xl p-5 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-danger flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4" />
                        Detected Violations ({selectedProduct.violations.length})
                      </h4>
                      <span className="text-[10px] text-danger font-mono font-bold bg-danger-light px-2 py-0.5 rounded">
                        Actionable
                      </span>
                    </div>

                    <div className="space-y-3">
                      {selectedProduct.violations.map((v, i) => (
                        <div 
                          key={i} 
                          className={`p-3.5 rounded-xl border ${
                            v.severity === 'critical' ? 'bg-danger-light/30 border-danger/30' : 'bg-warn-light/30 border-warn/30'
                          }`}
                        >
                          <div className="flex justify-between items-start mb-1.5">
                            <span className={`text-xs font-bold ${v.severity === 'critical' ? 'text-danger' : 'text-warn'}`}>
                              {v.rule} ({v.lmSection})
                            </span>
                            <span className="text-[9px] font-bold uppercase bg-white px-2 py-0.5 rounded shadow-sm text-slate-700 border border-slate-200">
                              {v.field}
                            </span>
                          </div>
                          <p className="text-xs text-slate-700 font-medium leading-relaxed">{v.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="bg-success-light/30 border border-success/30 p-5 rounded-2xl flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-success text-white flex items-center justify-center shrink-0 shadow-sm">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-success">Statutory Compliance Verified</h4>
                      <p className="text-xs text-slate-600 font-medium mt-0.5">
                        All mandatory declarations and font height rules satisfy Legal Metrology standards.
                      </p>
                    </div>
                  </div>
                )}

                {/* Font Size Table (Schedule II) */}
                {selectedProduct.fontAnalysis && selectedProduct.fontAnalysis.length > 0 && (
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                      <Ruler className="w-4 h-4 text-primary-600" />
                      Schedule II Font Height Analysis
                    </h4>

                    <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50 text-xs">
                      <table className="w-full text-left">
                        <thead className="bg-slate-100 text-slate-600 font-bold border-b border-slate-200 text-[11px]">
                          <tr>
                            <th className="py-2 px-3">Field</th>
                            <th className="py-2 px-2">Req (mm)</th>
                            <th className="py-2 px-2">Measured</th>
                            <th className="py-2 px-3 text-right">Verdict</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedProduct.fontAnalysis.map((f, idx) => (
                            <tr key={idx} className="border-b border-slate-200 last:border-0 hover:bg-white transition-colors">
                              <td className="py-2 px-3 font-semibold text-slate-800">{f.field}</td>
                              <td className="py-2 px-2 font-mono text-slate-600">{f.requiredMm.toFixed(1)}mm</td>
                              <td className="py-2 px-2 font-mono font-bold text-slate-800">{f.measuredMm.toFixed(1)}mm</td>
                              <td className="py-2 px-3 text-right">
                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                  f.pass ? 'bg-success-light text-success' : 'bg-danger-light text-danger'
                                }`}>
                                  {f.pass ? 'PASS' : 'FAIL'}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

              </div>

              {/* Right Col (7 cols): Extracted Declarations Table */}
              <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <FileCheck2 className="w-4 h-4 text-primary-600" />
                    Extracted Mandatory Declarations Checklist
                  </h4>
                  <span className="text-[11px] text-slate-400 font-semibold">Rule 6(1) Verification</span>
                </div>

                <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50 text-xs">
                  <table className="w-full text-left">
                    <tbody>
                      {selectedProduct.declarations && Object.entries(selectedProduct.declarations).map(([key, val]) => (
                        <tr key={key} className="border-b border-slate-200 last:border-0 hover:bg-white transition-colors">
                          <td className="py-3 px-4 font-semibold text-slate-500 capitalize w-1/3">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </td>
                          <td className="py-3 px-4 font-bold text-slate-800 w-2/3">
                            {val}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

            {/* Bottom Actions Bar */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button 
                onClick={resetScanner}
                className="btn-outline text-xs py-2.5 px-5 bg-white w-full sm:w-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Scan Another Commodity</span>
              </button>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button 
                  onClick={() => navigate('/history')}
                  className="btn-outline text-xs py-2.5 px-5 bg-white flex-1 sm:flex-initial"
                >
                  Save to Archive
                </button>
                <button 
                  onClick={() => navigate(`/report/${selectedProduct.id}`)}
                  className="btn-primary text-xs py-2.5 px-6 shadow-md shadow-primary-500/25 flex-1 sm:flex-initial"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Generate Full Legal Report</span>
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default Scanner;
