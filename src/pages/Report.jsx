import React, { useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { mockProducts } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { useAppContext } from '../context/AppContext';
import { Printer, ArrowLeft, Download, FileSignature } from 'lucide-react';

const Report = () => {
  const { productId } = useParams();
  const { user } = useAuth();
  const { activeProduct } = useAppContext();
  const navigate = useNavigate();
  const reportRef = useRef();

  // Look in mock data, or use currently active custom uploaded product, or fallback to first
  const product = (activeProduct && activeProduct.id === productId) 
    ? activeProduct 
    : mockProducts.find(p => p.id === productId) || activeProduct || mockProducts[0];

  const handlePrint = useReactToPrint({
    content: () => reportRef.current,
    documentTitle: `Inspection_Report_${product.batchNo}`,
  });

  return (
    <div className="max-w-4xl mx-auto pb-10">
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => navigate(-1)} className="btn-outline py-2 text-sm border-none bg-white/5">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div className="flex gap-3">
          <button onClick={handlePrint} className="btn-primary py-2 text-sm shadow-md">
            <Printer className="w-4 h-4" /> Print / PDF
          </button>
          <button className="btn-outline py-2 text-sm bg-white">
            <FileSignature className="w-4 h-4" /> Sign & Submit
          </button>
        </div>
      </div>

      {/* Printable Report Container */}
      <div className="bg-white text-black p-10 rounded-xl shadow-2xl relative border border-slate-200" ref={reportRef}>
        
        {/* Header */}
        <div className="border-b-2 border-black pb-6 mb-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center border border-slate-400">
               <span className="text-slate-700 font-bold text-[10px] text-center leading-tight">GOVT OF<br/>INDIA</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold uppercase font-display tracking-wide">Ministry of Consumer Affairs</h1>
              <h2 className="text-base font-semibold text-slate-700">Legal Metrology Automated Compliance & Inspection Report</h2>
            </div>
          </div>
          <div className="text-right text-xs">
            <p><strong>Report ID:</strong> LM-{product.batchNo || '904'}</p>
            <p><strong>Date:</strong> {new Date(product.scanDate || Date.now()).toLocaleDateString()}</p>
            <p><strong>Inspector:</strong> {user?.name || 'Authorized Officer'}</p>
          </div>
        </div>

        {/* Product Details */}
        <div className="mb-8">
          <h3 className="text-base font-bold bg-slate-100 p-2 mb-4 border-l-4 border-black">1. Product & Package Details</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p><span className="font-bold">Product Name:</span> {product.name}</p>
              <p><span className="font-bold">Brand:</span> {product.brand}</p>
              <p><span className="font-bold">Category:</span> {product.category}</p>
            </div>
            <div>
              <p><span className="font-bold">Batch No:</span> {product.batchNo}</p>
              <p><span className="font-bold">Compliance Status:</span> <span className="uppercase font-bold">{product.status}</span></p>
              <p><span className="font-bold">Score:</span> {product.complianceScore}/100</p>
            </div>
          </div>
        </div>

        {/* Declarations Checklist */}
        <div className="mb-8">
          <h3 className="text-base font-bold bg-slate-100 p-2 mb-4 border-l-4 border-black">2. Extracted Mandatory Declarations</h3>
          <table className="w-full text-sm border-collapse border border-slate-300">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-slate-300 p-2 text-left w-2/5">Mandatory Field</th>
                <th className="border border-slate-300 p-2 text-left w-3/5">Extracted Value</th>
              </tr>
            </thead>
            <tbody>
              {product.declarations && Object.entries(product.declarations).map(([key, value]) => (
                <tr key={key}>
                  <td className="border border-slate-300 p-2 capitalize font-medium">{key.replace(/([A-Z])/g, ' $1').trim()}</td>
                  <td className="border border-slate-300 p-2 font-mono">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Font Size Analysis */}
        {product.fontAnalysis && product.fontAnalysis.length > 0 && (
          <div className="mb-8">
            <h3 className="text-base font-bold bg-slate-100 p-2 mb-4 border-l-4 border-black">3. Readability & Font Height Analysis (Schedule II)</h3>
            <table className="w-full text-sm border-collapse border border-slate-300">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-300 p-2 text-left">Field</th>
                  <th className="border border-slate-300 p-2 text-left">Required Size (mm)</th>
                  <th className="border border-slate-300 p-2 text-left">Measured Size (mm)</th>
                  <th className="border border-slate-300 p-2 text-left">Result</th>
                </tr>
              </thead>
              <tbody>
                {product.fontAnalysis.map((f, i) => (
                  <tr key={i}>
                    <td className="border border-slate-300 p-2">{f.field}</td>
                    <td className="border border-slate-300 p-2 font-mono">{f.requiredMm.toFixed(1)} mm</td>
                    <td className="border border-slate-300 p-2 font-mono font-bold">{f.measuredMm.toFixed(1)} mm</td>
                    <td className={`border border-slate-300 p-2 font-bold ${f.pass ? 'text-green-700' : 'text-red-700'}`}>
                      {f.pass ? 'PASS' : 'FAIL'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Violations Summary */}
        <div className="mb-8">
          <h3 className="text-base font-bold bg-slate-100 p-2 mb-4 border-l-4 border-black">4. Detected Violations & Statutory Action</h3>
          {product.violations && product.violations.length > 0 ? (
            <div className="space-y-3">
              {product.violations.map((v, i) => (
                <div key={i} className="border border-red-300 bg-red-50/40 p-3.5 rounded text-sm">
                  <div className="flex justify-between items-start font-bold mb-1">
                    <span className="text-red-700">{v.rule} — {v.field}</span>
                    <span className="text-xs font-mono bg-red-100 px-2 py-0.5 rounded text-red-800">Section: {v.lmSection}</span>
                  </div>
                  <p className="text-slate-700 text-xs">{v.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm font-medium text-green-700 italic border border-green-300 bg-green-50 p-4 rounded">
              No statutory violations detected. The product meets all mandatory packaging declarations under the Legal Metrology (Packaged Commodities) Rules, 2011.
            </p>
          )}
        </div>

        {/* Recommendation & Signatures */}
        <div className="mt-12 border-t-2 border-black pt-6 flex justify-between items-end">
          <div>
            <p className="font-bold text-xs mb-1">Statutory Recommendation:</p>
            <div className={`inline-block px-4 py-2 border-2 text-base font-bold uppercase tracking-widest ${
              product.status === 'compliant' ? 'border-green-700 text-green-700' : 
              product.status === 'partial' ? 'border-amber-600 text-amber-600' : 'border-red-700 text-red-700'
            }`}>
              {product.status === 'compliant' ? 'PASS / CERTIFIED' : 
               product.status === 'partial' ? 'CORRECTIVE WARNING ISSUED' : 'SECTION 18 SHOW CAUSE NOTICE'}
            </div>
          </div>
          
          <div className="text-center">
            <div className="w-48 h-12 border-b border-slate-400 mb-2 flex items-center justify-center font-serif italic text-slate-600 text-sm">
              Digitally Signed
            </div>
            <p className="text-sm font-bold">{user?.name || 'Authorized Officer'}</p>
            <p className="text-xs text-slate-500">Legal Metrology Enforcement Officer</p>
          </div>
        </div>

        {/* Watermark */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03]">
          <span className="text-8xl font-black rotate-[-45deg] whitespace-nowrap">LEGAL DRISHTI</span>
        </div>
      </div>
    </div>
  );
};

export default Report;
