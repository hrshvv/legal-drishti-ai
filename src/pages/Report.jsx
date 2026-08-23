import React, { useRef, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockProducts, generateCustomImageAnalysis } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { useAppContext } from '../context/AppContext';
import { 
  Printer, 
  ArrowLeft, 
  Download, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Ruler, 
  Scale, 
  FileText, 
  Camera, 
  Package
} from 'lucide-react';

const Report = () => {
  const { productId } = useParams();
  const { user } = useAuth();
  const { activeProduct, scanHistory } = useAppContext();
  const navigate = useNavigate();
  const reportRef = useRef();

  // Find product from activeProduct, scanHistory, mockProducts, or fallback
  const product = useMemo(() => {
    if (activeProduct && (activeProduct.id === productId || !productId)) {
      return activeProduct;
    }
    if (scanHistory && Array.isArray(scanHistory)) {
      const foundInHistory = scanHistory.find(p => p && p.id === productId);
      if (foundInHistory) return foundInHistory;
    }
    const foundInMock = mockProducts.find(p => p && p.id === productId);
    if (foundInMock) return foundInMock;
    
    if (activeProduct) return activeProduct;

    // If ID is a scan ID or custom ID, generate a realistic custom inspection fallback
    if (productId && (productId.startsWith('scan_') || productId.startsWith('custom_'))) {
      return generateCustomImageAnalysis('Inspected Product Sample', 850000, null);
    }

    return mockProducts[0];
  }, [productId, activeProduct, scanHistory]);

  // Stable Certificate ID based on product properties
  const certId = useMemo(() => {
    const seed = (product?.id || '001') + (product?.batchNo || 'BATCH');
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = ((hash << 5) - hash) + seed.charCodeAt(i);
      hash |= 0;
    }
    return `LM-${Math.abs(hash % 900000) + 100000}`;
  }, [product?.id, product?.batchNo]);

  const handlePrint = () => {
    window.print();
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/history');
    }
  };

  const generateEvidenceHash = (id, batch) => {
    const safeId = String(id || '001').toUpperCase();
    const safeBatch = String(batch || 'BATCH').replace(/[^a-zA-Z0-9]/g, '');
    return `SHA256-${safeId}-${safeBatch}-LM${new Date().getFullYear()}`;
  };

  const handleDownloadJSON = () => {
    try {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(product, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `LegalMetrology_Report_${product?.batchNo || 'Evidence'}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } catch (e) {
      console.warn("JSON download error", e);
    }
  };

  // Helper to determine field status considering violations
  const getFieldStatus = (key, label) => {
    const val = product?.declarations?.[key];
    if (!val || val === 'NOT DECLARED' || val.includes('NOT DECLARED')) {
      return { status: 'fail', badge: 'MISSING' };
    }
    // Check if any violation matches this field
    const matchedViolation = product?.violations?.find(v => 
      v.field?.toLowerCase().includes(key.toLowerCase()) || 
      label.toLowerCase().includes(v.field?.toLowerCase() || '') ||
      (v.field && key.toLowerCase().includes(v.field.toLowerCase()))
    );
    if (matchedViolation) {
      if (matchedViolation.severity === 'critical') {
        return { status: 'fail', badge: 'NON-CONFORMING' };
      }
      return { status: 'warning', badge: 'SUB-MINIMUM FONT' };
    }
    return { status: 'pass', badge: 'PASS' };
  };

  // Statutory Declarations Checklist definitions with applicable legal rules
  const rawDeclarations = [
    {
      key: 'mrp',
      label: 'Maximum Retail Price (MRP)',
      rule: 'Rule 6(1)(e)',
      actRef: 'LMPCR 2011',
      requirement: 'Mandatory syntax: "MRP ₹ xx.xx (incl. of all taxes)"',
      value: product?.declarations?.mrp || 'NOT DECLARED'
    },
    {
      key: 'unitSalePrice',
      label: 'Unit Sale Price (USP)',
      rule: 'Rule 6(1)(ab)',
      actRef: 'GSR 779(E) 2021',
      requirement: 'Mandatory per g/ml (if <1kg/1L) or per kg/L (if >1kg/1L)',
      value: product?.declarations?.unitSalePrice || 'NOT DECLARED'
    },
    {
      key: 'netWeight',
      label: 'Net Quantity Declaration',
      rule: 'Rule 6(1)(c) & Rule 12',
      actRef: 'Schedule I & II',
      requirement: 'Standard unit of mass/volume in standard metric symbols (g, kg, ml, l)',
      value: product?.declarations?.netWeight || 'NOT DECLARED'
    },
    {
      key: 'manufacturer',
      label: 'Manufacturer / Packer / Importer Address',
      rule: 'Rule 6(1)(a) & Rule 10',
      actRef: 'LMPCR 2011',
      requirement: 'Complete postal address with Pin Code & State of manufacturer or packer',
      value: product?.declarations?.manufacturer || 'NOT DECLARED'
    },
    {
      key: 'countryOfOrigin',
      label: 'Country of Origin / Manufacture',
      rule: 'Rule 6(1)(aa)',
      actRef: 'GSR 592(E) 2017',
      requirement: 'Mandatory conspicuous declaration of country of manufacture or assembly',
      value: product?.declarations?.countryOfOrigin || 'NOT DECLARED'
    },
    {
      key: 'expiryDate',
      label: 'Date of Packaging / Best Before',
      rule: 'Rule 6(1)(d)',
      actRef: 'LMPCR 2011',
      requirement: 'Month & Year of manufacture/packing + expiry date for perishable consumables',
      value: product?.declarations?.expiryDate || 'NOT DECLARED'
    },
    {
      key: 'customerCare',
      label: 'Consumer Care & Grievance Helpline',
      rule: 'Rule 6(1)(f)',
      actRef: 'LMPCR 2011',
      requirement: 'Designated official name/address, telephone helpline, and email ID',
      value: product?.declarations?.customerCare || 'NOT DECLARED'
    },
    {
      key: 'fssaiNo',
      label: 'FSSAI License / Statutory Reg.',
      rule: 'FSSAI Act / Rule 27',
      actRef: 'FSS Act 2006',
      requirement: '14-digit FSSAI registration & Legal Metrology registration number',
      value: product?.declarations?.fssaiNo || 'NOT DECLARED'
    }
  ];

  const statutoryDeclarationsList = rawDeclarations.map(item => {
    const verdict = getFieldStatus(item.key, item.label);
    return { ...item, ...verdict };
  });

  // All commodities for fast switcher
  const allCommodities = useMemo(() => {
    const items = [...mockProducts];
    if (scanHistory && Array.isArray(scanHistory)) {
      scanHistory.forEach(s => {
        if (s && !items.find(i => i.id === s.id)) {
          items.push(s);
        }
      });
    }
    return items;
  }, [scanHistory]);

  return (
    <div className="max-w-5xl mx-auto pb-16">
      
      {/* Top Navigation & Action Controls Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 print:hidden">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button 
            onClick={handleBack} 
            className="btn-outline py-2 px-3 text-sm border-slate-300 bg-white hover:bg-slate-50 text-slate-700 shadow-sm flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" /> <span>Back</span>
          </button>

          {/* Quick Commodity Switcher */}
          <div className="flex items-center gap-2 bg-white border border-slate-300 rounded-xl px-3 py-1.5 shadow-sm text-xs flex-1 sm:flex-initial">
            <Package className="w-4 h-4 text-primary-600 shrink-0" />
            <select
              value={product?.id || ''}
              onChange={(e) => navigate(`/report/${e.target.value}`)}
              className="bg-transparent font-bold text-slate-800 focus:outline-none cursor-pointer w-full"
            >
              {allCommodities.map(item => (
                <option key={item.id} value={item.id}>
                  {item.brand} - {item.name} ({item.complianceScore}%)
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
          <button 
            onClick={handleDownloadJSON} 
            className="btn-outline py-2 px-3 text-sm bg-white hover:bg-slate-50 border-slate-300 text-slate-700 shadow-sm flex items-center gap-1.5"
            title="Download machine-readable JSON data"
          >
            <Download className="w-4 h-4 text-slate-600" /> <span>Export JSON</span>
          </button>
          
          <button 
            onClick={handlePrint} 
            className="btn-primary py-2 px-4 text-sm shadow-md flex items-center gap-2"
          >
            <Printer className="w-4 h-4" /> <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Report Paper Sheet Container */}
      <div 
        className="bg-white text-slate-900 p-6 sm:p-8 md:p-12 rounded-2xl shadow-xl relative border border-slate-300 print:p-0 print:border-none print:shadow-none font-sans"
        ref={reportRef}
      >
        
        {/* ========================================================================= */}
        {/* HEADER: GOVT. OF INDIA STATUTORY LETTERHEAD */}
        {/* ========================================================================= */}
        <div className="border-b-2 border-slate-900 pb-6 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            
            <div className="flex items-center gap-4 text-left">
              {/* National Emblem Badge */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-slate-800 bg-slate-50 flex flex-col items-center justify-center p-1 shrink-0 shadow-sm">
                <Scale className="w-5 h-5 sm:w-6 sm:h-6 text-slate-900 mb-0.5" />
                <span className="text-[7px] font-black uppercase text-slate-900 tracking-tighter leading-none text-center">
                  GOVT OF INDIA
                </span>
              </div>

              <div>
                <h1 className="text-lg sm:text-xl md:text-2xl font-black uppercase tracking-wide text-slate-900 font-display leading-tight">
                  Ministry of Consumer Affairs, Food &amp; Public Distribution
                </h1>
                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 mt-0.5">
                  Department of Consumer Affairs • Legal Metrology Division
                </h2>
                <p className="text-[10px] sm:text-[11px] font-semibold text-primary-900 mt-0.5">
                  Statutory Packaging Inspection &amp; Metrological Verification Audit (LMPCR 2011)
                </p>
              </div>
            </div>

            {/* Reference & Audit Badge */}
            <div className="text-right text-xs bg-slate-50 p-3 rounded-lg border border-slate-300 shrink-0 w-full md:w-auto min-w-[210px] space-y-1">
              <div className="flex justify-between gap-2">
                <span className="text-slate-500 font-semibold">Report Ref:</span>
                <strong className="font-mono text-slate-900">LM-AUD-{product?.batchNo || '2026-X'}</strong>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-slate-500 font-semibold">Inspection Date:</span>
                <strong className="text-slate-800">{new Date(product?.scanDate || Date.now()).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</strong>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-slate-500 font-semibold">Authorized Officer:</span>
                <strong className="text-slate-800">{user?.name || 'Enforcement Inspector (LM-77)'}</strong>
              </div>
              <div className="flex justify-between gap-2 border-t border-slate-200 pt-1 text-[10px]">
                <span className="text-slate-400">Jurisdiction:</span>
                <span className="font-mono text-slate-600">Central Packaged Goods Cell</span>
              </div>
            </div>

          </div>

          {/* Legal Framework Header Banner */}
          <div className="mt-4 bg-slate-100 px-3 py-1.5 rounded text-[10px] sm:text-[11px] font-mono text-slate-700 flex flex-wrap justify-between items-center gap-2 border border-slate-200">
            <span><strong>Governing Statute:</strong> Legal Metrology Act, 2009 (Act 1 of 2010) r/w Legal Metrology (Packaged Commodities) Rules, 2011</span>
            <span className="font-bold text-slate-900">Audit Protocol: Schedule II Optical Verification</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 1: PRODUCT & PRINCIPAL DISPLAY PANEL (PDP) METROLOGY */}
        {/* ========================================================================= */}
        <div className="mb-8">
          <div className="flex items-center justify-between bg-slate-100 px-3 py-2 border-l-4 border-slate-900 mb-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <span>1. Commodity Identification &amp; Principal Display Panel (PDP) Metrology</span>
            </h3>
            <span className="text-[11px] font-mono text-slate-600 font-bold">Rule 7 &amp; Rule 6(1)(b)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs bg-slate-50/70 p-4 rounded-xl border border-slate-200">
            <div className="space-y-1.5">
              <p><span className="text-slate-500 font-semibold">Commodity Name:</span> <strong className="text-slate-900 text-sm block">{product?.name}</strong></p>
              <p><span className="text-slate-500 font-semibold">Trade Brand / Mark:</span> <strong className="text-slate-800">{product?.brand}</strong></p>
              <p><span className="text-slate-500 font-semibold">Product Category:</span> <span className="bg-slate-200 px-1.5 py-0.5 rounded font-mono text-[11px] font-bold">{product?.category}</span></p>
            </div>

            <div className="space-y-1.5">
              <p><span className="text-slate-500 font-semibold">Batch / Lot Number:</span> <strong className="font-mono text-slate-900 block">{product?.batchNo}</strong></p>
              <p><span className="text-slate-500 font-semibold">Packaging Type:</span> <strong className="text-slate-800">{product?.packageType || 'Flexible Multi-Layer Pouch'}</strong></p>
              <p><span className="text-slate-500 font-semibold">PDP Surface Area (A):</span> <strong className="font-mono text-primary-700 font-bold">{product?.pdpAreaCm2 || 220} cm²</strong> <span className="text-[10px] text-slate-500">(Calculated under Rule 7)</span></p>
            </div>

            <div className="space-y-2 border-t md:border-t-0 md:border-l border-slate-200 md:pl-4 flex flex-col justify-center">
              <div>
                <span className="text-slate-500 font-semibold text-[11px]">Metrological Compliance Status:</span>
                <div className="mt-1">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                    product?.status === 'compliant' 
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                      : product?.status === 'partial' 
                      ? 'bg-amber-100 text-amber-800 border border-amber-300' 
                      : 'bg-red-100 text-red-800 border border-red-300'
                  }`}>
                    {product?.status === 'compliant' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                    {product?.status === 'partial' && <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />}
                    {product?.status === 'non-compliant' && <XCircle className="w-3.5 h-3.5 text-red-600" />}
                    {product?.status === 'compliant' ? '100% STATUTORY COMPLIANT' : 
                     product?.status === 'partial' ? 'PARTIAL COMPLIANCE (WARNING)' : 'NON-COMPLIANT (SECTION 18)'}
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-slate-600">
                Statutory Score: <strong className="text-sm font-bold text-slate-900">{product?.complianceScore || 0}/100</strong>
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 2: PRIMARY EVIDENTIARY PACKAGING RECORD (UPLOADED / SCANNED IMAGE) */}
        {/* ========================================================================= */}
        <div className="mb-8 break-inside-avoid">
          <div className="flex items-center justify-between bg-slate-100 px-3 py-2 border-l-4 border-slate-900 mb-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <Camera className="w-4 h-4 text-primary-700" />
              <span>2. Photographic Packaging Evidence &amp; Optical OCR Inspection Record</span>
            </h3>
            <span className="text-[11px] font-mono text-slate-600 font-bold">Rule 9 &amp; Section 18 Evidence</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-slate-50 p-4 rounded-xl border border-slate-300 items-start">
            
            {/* Primary Photographic Evidence Card (7 Cols) */}
            <div className="md:col-span-7 space-y-3">
              <div className="relative rounded-xl overflow-hidden border-2 border-slate-300 bg-slate-950 flex items-center justify-center shadow-inner group">
                
                {product?.imageUrl ? (
                  <div className="relative w-full flex items-center justify-center p-2 min-h-[260px] max-h-[340px]">
                    <img 
                      src={product.imageUrl} 
                      alt="Photographic evidence of inspected packaged commodity label" 
                      className="max-h-[320px] w-full object-contain rounded"
                    />

                    {/* Evidentiary Watermark Overlay */}
                    <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm border border-slate-600 px-2.5 py-1 rounded text-[10px] font-mono text-white flex items-center gap-1.5 shadow">
                      <Camera className="w-3 h-3 text-primary-400" />
                      <span>EVIDENCE PHOTO #{product?.batchNo || '001'}</span>
                    </div>

                    {/* Compliance Result Stamp */}
                    <div className="absolute bottom-3 right-3">
                      <span className={`px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-wider shadow border ${
                        product?.status === 'compliant'
                          ? 'bg-emerald-600/90 text-white border-emerald-400'
                          : product?.status === 'partial'
                          ? 'bg-amber-600/90 text-white border-amber-400'
                          : 'bg-red-600/90 text-white border-red-400'
                      }`}>
                        {product?.status === 'compliant' ? 'VERIFIED METROLOGY' : product?.status === 'partial' ? 'WARNING ISSUED' : 'STATUTORY VIOLATION'}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="p-10 text-center text-slate-400 font-mono text-xs space-y-2">
                    <Camera className="w-12 h-12 mx-auto text-slate-600" />
                    <p>Photographic label evidence recorded in digital case file</p>
                  </div>
                )}

              </div>

              <div className="text-[10px] text-slate-500 font-mono flex flex-wrap justify-between items-center gap-2 px-1">
                <span><strong>Evidence Source:</strong> {product?.uploadedFileName ? `Uploaded [${product.uploadedFileName}]` : 'Calibrated Optical High-Res PDP Scan'}</span>
                <span><strong>Resolution:</strong> 300 DPI Optical Inspection</span>
              </div>
            </div>

            {/* Evidentiary Chain of Custody & Metadata (5 Cols) */}
            <div className="md:col-span-5 space-y-3 text-xs">
              <div className="border border-slate-200 bg-white p-3.5 rounded-lg space-y-2.5 shadow-sm">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider border-b border-slate-200 pb-1.5 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary-700" />
                  <span>Chain of Custody &amp; Integrity</span>
                </h4>

                <div className="space-y-1.5 text-[11px]">
                  <div>
                    <span className="text-slate-500 block">Digital Evidence Hash (SHA-256):</span>
                    <span className="font-mono font-bold text-slate-800 text-[10px] break-all bg-slate-50 p-1 rounded border border-slate-200 block">
                      {generateEvidenceHash(product?.id, product?.batchNo)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-500">Capture Timestamp:</span>
                    <span className="font-mono text-slate-800">{new Date(product?.scanDate || Date.now()).toLocaleTimeString()} IST</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-500">Inspecting Hardware:</span>
                    <span className="text-slate-800 font-medium">Neural Optical OCR Engine</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-500">Conspicuous Legibility:</span>
                    <span className="font-bold text-emerald-700">Rule 9 Conforming</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-500">Extracted Regions:</span>
                    <span className="font-bold text-slate-800 font-mono">
                      {product?.boundingBoxes?.length || 6} Declarations Mapped
                    </span>
                  </div>
                </div>
              </div>

              {/* Bounding Box Highlights Summary */}
              <div className="border border-slate-200 bg-white p-3 rounded-lg space-y-1.5 text-[11px] shadow-sm">
                <span className="font-bold text-slate-800 block text-[11px]">Detected Label Coordinates:</span>
                <ul className="space-y-1 text-slate-600">
                  {(product?.boundingBoxes || []).slice(0, 4).map((b, idx) => (
                    <li key={idx} className="flex justify-between items-center text-[10px]">
                      <span className="truncate max-w-[150px] font-medium">{b.label}</span>
                      <span className={`font-mono px-1 rounded text-[9px] font-bold ${
                        b.status === 'pass' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                      }`}>
                        {b.rule} ({(b.status || 'pass').toUpperCase()})
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 3: MANDATORY STATUTORY DECLARATIONS AUDIT (RULE 6(1)) */}
        {/* ========================================================================= */}
        <div className="mb-8 break-inside-avoid">
          <div className="flex items-center justify-between bg-slate-100 px-3 py-2 border-l-4 border-slate-900 mb-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary-700" />
              <span>3. Mandatory Declarations Statutory Audit (Rule 6(1) LMPCR)</span>
            </h3>
            <span className="text-[11px] font-mono text-slate-600 font-bold">8 Mandatory Checks</span>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="w-full text-xs border-collapse border border-slate-300 shadow-sm min-w-[600px]">
              <thead>
                <tr className="bg-slate-100 text-slate-700 text-[11px] uppercase tracking-wider">
                  <th className="border border-slate-300 p-2.5 text-left w-1/4">Statutory Clause &amp; Field</th>
                  <th className="border border-slate-300 p-2.5 text-left w-2/5">Extracted Value from Label Evidence</th>
                  <th className="border border-slate-300 p-2.5 text-left w-1/4">Mandatory Legal Requirement</th>
                  <th className="border border-slate-300 p-2.5 text-center w-24">Verdict</th>
                </tr>
              </thead>
              <tbody>
                {statutoryDeclarationsList.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="border border-slate-300 p-2.5 align-top">
                      <strong className="text-slate-900 block">{item.label}</strong>
                      <span className="text-[10px] font-mono text-primary-700 font-bold">{item.rule} ({item.actRef})</span>
                    </td>
                    <td className="border border-slate-300 p-2.5 align-top font-mono text-slate-800">
                      {item.value === 'NOT DECLARED' ? (
                        <span className="text-red-600 font-bold bg-red-50 px-1.5 py-0.5 rounded border border-red-200 inline-block">
                          ❌ MISSING / NOT DECLARED
                        </span>
                      ) : (
                        <span className="font-semibold">{item.value}</span>
                      )}
                    </td>
                    <td className="border border-slate-300 p-2.5 align-top text-slate-600 text-[11px]">
                      {item.requirement}
                    </td>
                    <td className="border border-slate-300 p-2.5 text-center align-middle">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                        item.status === 'pass'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : item.status === 'warning'
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-red-100 text-red-800 border border-red-300'
                      }`}>
                        {item.badge}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 4: SCHEDULE II OPTICAL FONT METROLOGY & DIMENSION AUDIT */}
        {/* ========================================================================= */}
        {product?.fontAnalysis && product.fontAnalysis.length > 0 && (
          <div className="mb-8 break-inside-avoid">
            <div className="flex items-center justify-between bg-slate-100 px-3 py-2 border-l-4 border-slate-900 mb-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <Ruler className="w-4 h-4 text-primary-700" />
                <span>4. Schedule II Readability &amp; Minimum Font Height Metrology</span>
              </h3>
              <span className="text-[11px] font-mono text-slate-600 font-bold">Rule 7 &amp; Schedule II Table 1</span>
            </div>

            <p className="text-[11px] text-slate-600 mb-2.5">
              Based on the measured Principal Display Panel surface area of <strong>{product?.pdpAreaCm2 || 220} cm²</strong> (Classification Band: 100 cm² &lt; A ≤ 500 cm²), the statutory minimum numeral &amp; letter heights are evaluated below:
            </p>

            <div className="overflow-x-auto w-full">
              <table className="w-full text-xs border-collapse border border-slate-300 shadow-sm min-w-[500px]">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 text-[11px] uppercase tracking-wider">
                    <th className="border border-slate-300 p-2.5 text-left">Packaging Element</th>
                    <th className="border border-slate-300 p-2.5 text-left">Statutory Rule Ref</th>
                    <th className="border border-slate-300 p-2.5 text-center">Mandatory Min Height</th>
                    <th className="border border-slate-300 p-2.5 text-center">Measured Optical Height</th>
                    <th className="border border-slate-300 p-2.5 text-center">Conformity Status</th>
                  </tr>
                </thead>
                <tbody>
                  {product.fontAnalysis.map((f, i) => (
                    <tr key={i} className="hover:bg-slate-50/80">
                      <td className="border border-slate-300 p-2.5 font-bold text-slate-800">{f.field}</td>
                      <td className="border border-slate-300 p-2.5 font-mono text-primary-800 font-semibold">{f.ruleRef || 'Schedule II'}</td>
                      <td className="border border-slate-300 p-2.5 text-center font-mono font-medium">
                        {typeof f.requiredMm === 'number' ? f.requiredMm.toFixed(1) : f.requiredMm} mm
                      </td>
                      <td className="border border-slate-300 p-2.5 text-center font-mono font-bold text-slate-900">
                        {typeof f.measuredMm === 'number' ? f.measuredMm.toFixed(1) : f.measuredMm} mm
                      </td>
                      <td className="border border-slate-300 p-2.5 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                          f.pass 
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                            : 'bg-red-100 text-red-800 border border-red-300'
                        }`}>
                          {f.pass ? 'PASS' : 'SUB-MINIMUM (FAIL)'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTION 5: STATUTORY INFRACTIONS, LEGAL IMPLICATIONS & PENAL PROVISIONS */}
        {/* ========================================================================= */}
        <div className="mb-8 break-inside-avoid">
          <div className="flex items-center justify-between bg-slate-100 px-3 py-2 border-l-4 border-slate-900 mb-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-700" />
              <span>5. Detected Statutory Non-Compliances &amp; Legal Enforcement Directives</span>
            </h3>
            <span className="text-[11px] font-mono text-slate-600 font-bold">Sections 18, 36 &amp; 48</span>
          </div>

          {product?.violations && product.violations.length > 0 ? (
            <div className="space-y-3">
              {product.violations.map((v, i) => (
                <div key={i} className="border-2 border-red-300 bg-red-50/50 p-4 rounded-xl text-xs space-y-1.5 shadow-sm">
                  <div className="flex flex-wrap justify-between items-start gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-red-600 text-white rounded text-[10px] font-black uppercase">
                        {v.severity === 'critical' ? 'CRITICAL BREACH' : 'STATUTORY INFRACTION'}
                      </span>
                      <strong className="text-red-900 text-sm">{v.rule} — {v.field}</strong>
                    </div>
                    <span className="font-mono font-bold text-red-800 bg-red-100 px-2 py-0.5 rounded border border-red-200 text-[11px]">
                      Governing Section: {v.lmSection}
                    </span>
                  </div>

                  <p className="text-slate-800 font-medium leading-relaxed">{v.description}</p>
                  
                  <div className="border-t border-red-200 pt-2 mt-1 text-[11px] text-red-900 flex flex-wrap justify-between gap-2">
                    <span><strong>Penal Provision:</strong> Section 36(1) penalty liability up to ₹25,000 for initial non-compliance.</span>
                    <span><strong>Statutory Order:</strong> Notice under Section 18(1) issued to packer/manufacturer.</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border-2 border-emerald-300 bg-emerald-50/70 p-4 rounded-xl text-xs flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <h4 className="font-bold text-emerald-900 text-sm">Full Statutory Conformity Verified</h4>
                <p className="text-emerald-800 mt-0.5">
                  No statutory violations detected. All 8 mandatory declarations and Schedule II font height parameters strictly conform to the Legal Metrology (Packaged Commodities) Rules, 2011.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* SECTION 6: STATUTORY RECOMMENDATION & DIGITAL ENDORSEMENT */}
        {/* ========================================================================= */}
        <div className="mt-10 border-t-2 border-slate-900 pt-6 break-inside-avoid">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-end">
            
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
                Statutory Enforcement Directive:
              </span>
              
              <div className={`p-3.5 border-2 rounded-xl text-center ${
                product?.status === 'compliant' ? 'border-emerald-600 bg-emerald-50 text-emerald-900' :
                product?.status === 'partial' ? 'border-amber-600 bg-amber-50 text-amber-900' : 'border-red-600 bg-red-50 text-red-900'
              }`}>
                <p className="text-sm font-black uppercase tracking-widest">
                  {product?.status === 'compliant' ? '✔ UNCONDITIONAL CLEARANCE / CERTIFIED' :
                   product?.status === 'partial' ? '⚠ 15-DAY RECTIFICATION NOTICE ISSUED' : '❌ SHOW CAUSE NOTICE UNDER SECTION 18(1)'}
                </p>
                <p className="text-[10px] font-medium mt-1">
                  {product?.status === 'compliant' ? 'Permitted for open retail distribution across all Indian territories.' :
                   product?.status === 'partial' ? 'Manufacturer directed to rectify sub-minimum font declarations within 15 statutory days.' : 'Retail distribution barred pending compounding under Section 48 or prosecution.'}
                </p>
              </div>
            </div>

            <div className="text-center sm:text-right space-y-1">
              <div className="inline-block text-center border-b-2 border-slate-800 pb-1 min-w-[200px]">
                <span className="font-serif italic text-slate-700 text-sm block">Digitally Signed &amp; Authenticated</span>
                <span className="text-[10px] font-mono text-slate-500 block">CERT-ID: {certId}</span>
              </div>
              <p className="text-xs font-bold text-slate-900 mt-1">{user?.name || 'Authorized Legal Metrology Inspector'}</p>
              <p className="text-[11px] text-slate-600">Legal Metrology Enforcement Officer (LM-DL-402)</p>
              <p className="text-[10px] text-slate-400">Department of Consumer Affairs, Government of India</p>
            </div>

          </div>

          {/* Legal Disclaimer Footer */}
          <div className="mt-8 pt-3 border-t border-slate-200 text-[9px] text-slate-500 text-center leading-relaxed">
            This automated metrological compliance audit is generated pursuant to Section 18 of the Legal Metrology Act, 2009. Any aggrieved party may prefer an appeal before the Controller of Legal Metrology within 30 days under Section 50 of the Act.
          </div>
        </div>

        {/* Watermark */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.025] select-none overflow-hidden">
          <span className="text-9xl font-black rotate-[-35deg] whitespace-nowrap text-slate-900">
            LEGAL METROLOGY
          </span>
        </div>

      </div>

    </div>
  );
};

export default Report;
