import React, { useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { mockProducts } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { Printer, ArrowLeft, Download, FileSignature } from 'lucide-react';

const Report = () => {
  const { productId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const reportRef = useRef();

  const product = mockProducts.find(p => p.id === productId) || mockProducts[0];

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
          <button onClick={handlePrint} className="btn-primary py-2 text-sm">
            <Printer className="w-4 h-4" /> Print / PDF
          </button>
          <button className="btn-outline py-2 text-sm">
            <FileSignature className="w-4 h-4" /> Sign & Submit
          </button>
        </div>
      </div>

      {/* Printable Report Container */}
      <div className="bg-white text-black p-10 rounded-lg shadow-2xl relative" ref={reportRef}>
        
        {/* Header */}
        <div className="border-b-2 border-black pb-6 mb-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center border border-gray-400">
               <span className="text-gray-500 font-bold text-xs text-center">GOVT LOGO</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold uppercase font-display">Ministry of Consumer Affairs</h1>
              <h2 className="text-lg font-semibold text-gray-700">Legal Metrology Compliance Report</h2>
            </div>
          </div>
          <div className="text-right text-sm">
            <p><strong>Report ID:</strong> LM-{Math.floor(Math.random() * 10000)}</p>
            <p><strong>Date:</strong> {new Date(product.scanDate).toLocaleDateString()}</p>
            <p><strong>Inspector:</strong> {user?.name}</p>
          </div>
        </div>

        {/* Product Details */}
        <div className="mb-8">
          <h3 className="text-lg font-bold bg-gray-100 p-2 mb-4 border-l-4 border-black">1. Product Details</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p><span className="font-bold">Product Name:</span> {product.name}</p>
              <p><span className="font-bold">Brand:</span> {product.brand}</p>
              <p><span className="font-bold">Category:</span> {product.category}</p>
            </div>
            <div>
              <p><span className="font-bold">Batch No:</span> {product.batchNo}</p>
              <p><span className="font-bold">Compliance Status:</span> <span className="uppercase">{product.status}</span></p>
              <p><span className="font-bold">Score:</span> {product.complianceScore}/100</p>
            </div>
          </div>
        </div>

        {/* Declarations Checklist */}
        <div className="mb-8">
          <h3 className="text-lg font-bold bg-gray-100 p-2 mb-4 border-l-4 border-black">2. Extracted Declarations</h3>
          <table className="w-full text-sm border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2 text-left">Mandatory Field</th>
                <th className="border border-gray-300 p-2 text-left">Extracted Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(product.declarations).map(([key, value]) => (
                <tr key={key}>
                  <td className="border border-gray-300 p-2 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</td>
                  <td className="border border-gray-300 p-2 font-mono">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Font Size Analysis */}
        {product.fontAnalysis && product.fontAnalysis.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-bold bg-gray-100 p-2 mb-4 border-l-4 border-black">3. Readability & Font Analysis</h3>
            <table className="w-full text-sm border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2 text-left">Field</th>
                  <th className="border border-gray-300 p-2 text-left">Required Size (mm)</th>
                  <th className="border border-gray-300 p-2 text-left">Measured Size (mm)</th>
                  <th className="border border-gray-300 p-2 text-left">Result</th>
                </tr>
              </thead>
              <tbody>
                {product.fontAnalysis.map((f, i) => (
                  <tr key={i}>
                    <td className="border border-gray-300 p-2">{f.field}</td>
                    <td className="border border-gray-300 p-2">{f.requiredMm.toFixed(1)}</td>
                    <td className="border border-gray-300 p-2">{f.measuredMm.toFixed(1)}</td>
                    <td className={`border border-gray-300 p-2 font-bold ${f.pass ? 'text-green-600' : 'text-red-600'}`}>
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
          <h3 className="text-lg font-bold bg-gray-100 p-2 mb-4 border-l-4 border-black">4. Detected Violations</h3>
          {product.violations.length > 0 ? (
            <div className="space-y-4">
              {product.violations.map((v, i) => (
                <div key={i} className="border border-gray-300 p-4 rounded text-sm">
                  <div className="flex justify-between items-start font-bold mb-2">
                    <span className="text-red-600">{v.rule} — {v.field}</span>
                    <span>Section: {v.lmSection}</span>
                  </div>
                  <p>{v.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm font-medium text-green-700 italic border border-green-300 bg-green-50 p-4 rounded">
              No violations detected. The product meets all mandatory packaging rules.
            </p>
          )}
        </div>

        {/* Recommendation */}
        <div className="mt-12 border-t-2 border-black pt-6 flex justify-between items-end">
          <div>
            <p className="font-bold text-sm mb-1">Recommendation:</p>
            <div className={`inline-block px-4 py-2 border-2 text-lg font-bold uppercase tracking-widest ${
              product.status === 'compliant' ? 'border-green-600 text-green-600' : 
              product.status === 'partial' ? 'border-orange-500 text-orange-500' : 'border-red-600 text-red-600'
            }`}>
              {product.status === 'compliant' ? 'PASS' : 
               product.status === 'partial' ? 'WARNING ISSUED' : 'SHOW CAUSE NOTICE'}
            </div>
          </div>
          
          <div className="text-center">
            <div className="w-48 h-16 border-b border-gray-400 mb-2 flex items-center justify-center">
              {/* Fake signature area */}
            </div>
            <p className="text-sm font-bold">{user?.name}</p>
            <p className="text-xs text-gray-500">Legal Metrology Officer</p>
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
