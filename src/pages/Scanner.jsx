import React, { useState, useRef, useEffect } from 'react';
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
  Scale, 
  Camera, 
  Image as ImageIcon, 
  Eye, 
  EyeOff, 
  Maximize2, 
  X, 
  Layers, 
  Info,
  RefreshCw
} from 'lucide-react';
import { mockProducts, generateCustomImageAnalysis } from '../data/mockData';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Scanner = () => {
  const [stage, setStage] = useState('upload'); // 'upload' | 'scanning' | 'results'
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [uploadedImageSrc, setUploadedImageSrc] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState(null);
  const [uploadedFileSize, setUploadedFileSize] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanLogs, setScanLogs] = useState([]);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [isFullscreenPreview, setIsFullscreenPreview] = useState(false);

  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const mediaStreamRef = useRef(null);
  
  const navigate = useNavigate();
  const { setActiveProduct, addScanToHistory } = useAppContext();

  // Clean up camera stream on unmount
  useEffect(() => {
    return () => {
      stopCameraStream();
    };
  }, []);

  const stopCameraStream = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    setIsCameraActive(false);
  };

  // Start webcam for desktop/browser
  const startWebcam = async () => {
    setCameraError(null);
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } } 
        });
        mediaStreamRef.current = stream;
        setIsCameraActive(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } else {
        // Fallback to native camera input
        cameraInputRef.current?.click();
      }
    } catch (err) {
      console.warn("Webcam access error, falling back to camera file input:", err);
      setCameraError("Camera permission not granted or device unavailable. Please use file upload.");
      cameraInputRef.current?.click();
    }
  };

  // Capture frame from webcam
  const captureWebcamSnapshot = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current || document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    const imageUrl = canvas.toDataURL('image/jpeg', 0.95);
    stopCameraStream();

    const fileName = `Camera_Capture_${new Date().toISOString().slice(0, 10)}.jpg`;
    setUploadedImageSrc(imageUrl);
    setUploadedFileName(fileName);
    setUploadedFileSize("~850 KB");

    const customAnalysis = generateCustomImageAnalysis(fileName, 850000, imageUrl);
    setSelectedProduct(customAnalysis);
  };

  // Process any File object (from input or drop)
  const processImageFile = (file) => {
    if (!file || !file.type.startsWith('image/')) {
      alert("Please upload a valid image file (JPEG, PNG, WebP).");
      return;
    }

    const sizeStr = file.size > 1024 * 1024 
      ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` 
      : `${(file.size / 1024).toFixed(1)} KB`;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result;
      setUploadedImageSrc(dataUrl);
      setUploadedFileName(file.name);
      setUploadedFileSize(sizeStr);

      const customAnalysis = generateCustomImageAnalysis(file.name.replace(/\.[^/.]+$/, ""), file.size, dataUrl);
      setSelectedProduct(customAnalysis);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) processImageFile(file);
  };

  // Drag & Drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processImageFile(file);
  };

  // Handle selecting one of the 6 pre-loaded mock commodities
  const handleSelectMockItem = (prod) => {
    setSelectedProduct(prod);
    setUploadedImageSrc(prod.imageUrl || null);
    setUploadedFileName(`${prod.brand} - ${prod.name}`);
    setUploadedFileSize("Pre-calibrated PDP Sample");
  };

  // Start the live AI scanning sequence
  const startScan = () => {
    if (!selectedProduct) return;
    setStage('scanning');
    setScanProgress(0);
    setScanLogs([]);

    const steps = [
      "Principal Display Panel (PDP) localized & contrast balanced",
      "OCR Neural Pipeline: 14 mandatory declaration regions isolated",
      `PDP Surface Area estimated: ${selectedProduct.pdpAreaCm2 || 220} cm² (Schedule II calibrated)`,
      "Schedule II Engine: Measuring letter & numeral height in millimeters",
      "Cross-verifying declarations against Legal Metrology Rules, 2011",
      "Statutory compliance analysis finalized • Case file compiled"
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
    }, 55);
  };

  const resetScanner = () => {
    stopCameraStream();
    setStage('upload');
    setScanProgress(0);
    setSelectedProduct(null);
    setUploadedImageSrc(null);
    setUploadedFileName(null);
    setUploadedFileSize(null);
  };

  return (
    <div className="max-w-6xl mx-auto h-full flex flex-col">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
        <div>
          <h2 className="text-2xl font-display font-bold text-slate-900 flex items-center gap-2.5">
            <ScanLine className="w-7 h-7 text-primary-600" />
            <span>AI Compliance Scanner</span>
          </h2>
          <p className="text-slate-500 text-sm font-medium">
            Upload label photographs, capture live via camera, or select statutory mock commodities
          </p>
        </div>

        {stage !== 'upload' && (
          <button 
            onClick={resetScanner} 
            className="btn-outline text-xs py-2 px-4 bg-white shadow-sm hover:border-primary-400"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Scan Another Image</span>
          </button>
        )}
      </div>

      {/* Main Container Card */}
      <div className="flex-1 bg-white border border-slate-200 rounded-3xl overflow-hidden relative shadow-xl flex flex-col min-h-[580px]">
        
        {/* ========================================================================= */}
        {/* STAGE 1: COMPREHENSIVE IMAGE UPLOAD / CAMERA / PRESET PICKER */}
        {/* ========================================================================= */}
        {stage === 'upload' && (
          <div className="flex-1 p-6 md:p-8 flex flex-col justify-between space-y-6 overflow-y-auto bg-slate-50/40">
            
            {/* Hidden Input Elements */}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileInputChange} 
              accept="image/png,image/jpeg,image/jpg,image/webp,image/bmp" 
              className="hidden" 
            />
            <input 
              type="file" 
              ref={cameraInputRef} 
              onChange={handleFileInputChange} 
              accept="image/*" 
              capture="environment" 
              className="hidden" 
            />

            {/* Webcam Stream Modal Overlay */}
            {isCameraActive && (
              <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
                <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-700 flex flex-col">
                  <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-bold">
                      <Camera className="w-4 h-4 text-primary-400" />
                      <span>Live Camera Feed • Legal Metrology OCR</span>
                    </div>
                    <button 
                      onClick={stopCameraStream}
                      className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="relative bg-black aspect-video flex items-center justify-center overflow-hidden">
                    <video ref={videoRef} className="w-full h-full object-cover" playsInline autoPlay muted />
                    <div className="absolute inset-8 border-2 border-dashed border-primary-400/70 rounded-xl pointer-events-none flex items-center justify-center">
                      <span className="bg-slate-950/70 text-white text-[11px] font-mono px-2.5 py-1 rounded-md">
                        Align Principal Display Panel (PDP)
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
                    <button 
                      onClick={stopCameraStream}
                      className="btn-outline text-xs py-2 px-4 bg-white"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={captureWebcamSnapshot}
                      className="btn-primary text-xs py-2 px-6 shadow-md shadow-primary-500/25"
                    >
                      <Camera className="w-4 h-4" />
                      <span>Capture & Analyze</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Upload Top Grid: Drag/Drop Area & Camera / File Action Buttons */}
            <div className="grid lg:grid-cols-12 gap-6">
              
              {/* Left Column (7 cols): Interactive Drag & Drop Box */}
              <div className="lg:col-span-7 flex flex-col">
                <div 
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`flex-1 border-2 border-dashed rounded-3xl p-6 md:p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all min-h-[280px] relative ${
                    isDragOver 
                      ? 'border-primary-500 bg-primary-50/70 scale-[0.99] shadow-inner' 
                      : uploadedImageSrc
                        ? 'border-primary-300 bg-white hover:border-primary-400 shadow-sm'
                        : 'border-slate-300 bg-white hover:border-primary-400 hover:bg-primary-50/30 shadow-sm'
                  }`}
                >
                  {uploadedImageSrc ? (
                    <div className="flex flex-col sm:flex-row items-center gap-6 w-full max-w-md p-2">
                      <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-primary-400 shadow-md shrink-0 bg-slate-900 flex items-center justify-center group">
                        <img 
                          src={uploadedImageSrc} 
                          alt="Uploaded label preview" 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.style.display = 'none';
                            e.target.parentNode.innerHTML = `<div class="p-3 text-center text-[10px] font-bold text-white uppercase">${uploadedFileName || 'Label Image'}</div>`;
                          }}
                        />
                        <div className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-bold">
                          Change
                        </div>
                      </div>

                      <div className="text-left flex-1 min-w-0 space-y-1">
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-success-light text-success font-bold text-[10px] uppercase">
                          <CheckCircle2 className="w-3 h-3" /> Image Ready
                        </div>
                        <h4 className="text-base font-bold text-slate-900 truncate">
                          {uploadedFileName || selectedProduct?.name}
                        </h4>
                        <p className="text-xs text-slate-500">
                          {uploadedFileSize || "High-Resolution Image"}
                        </p>
                        <p className="text-[11px] text-primary-600 font-semibold pt-1">
                          Click below to initiate automated Legal Metrology audit →
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="w-16 h-16 rounded-2xl bg-primary-100 text-primary-600 flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                        <UploadCloud className="w-8 h-8" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-1">
                        Drag & Drop Product Label Image
                      </h3>
                      <p className="text-xs text-slate-500 max-w-sm mb-4">
                        Supports PNG, JPG, JPEG, WebP. High-contrast images yield optimal Schedule II millimeter font precision.
                      </p>
                      <button 
                        type="button" 
                        onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                        className="btn-outline text-xs py-2 px-4 bg-white border-slate-300 hover:border-primary-400 hover:text-primary-600 shadow-sm"
                      >
                        Browse Files on Device
                      </button>
                    </>
                  )}
                </div>

                {/* Direct Action Trigger Buttons */}
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <button 
                    type="button" 
                    onClick={startWebcam}
                    className="flex items-center justify-center gap-2 p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:text-primary-600 shadow-sm transition-all"
                  >
                    <Camera className="w-4 h-4 text-primary-600" />
                    <span>Live Camera Capture</span>
                  </button>

                  <button 
                    type="button" 
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center justify-center gap-2 p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:text-primary-600 shadow-sm transition-all"
                  >
                    <ImageIcon className="w-4 h-4 text-primary-600" />
                    <span>Upload from Gallery</span>
                  </button>
                </div>
              </div>

              {/* Right Column (5 cols): Quick Select Preset Cards */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                        <Package className="w-4 h-4 text-primary-600" />
                        Quick Test Preset Commodities
                      </span>
                      <span className="text-[10px] font-mono font-bold bg-primary-50 text-primary-700 px-2 py-0.5 rounded">
                        6 Mock Items
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      {mockProducts.map((p) => {
                        const isSelected = selectedProduct?.id === p.id && !uploadedImageSrc?.startsWith('blob:');
                        return (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => handleSelectMockItem(p)}
                            className={`p-3 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                              isSelected
                                ? 'bg-primary-50/90 border-primary-500 shadow-md ring-2 ring-primary-500/20'
                                : 'bg-slate-50/70 border-slate-200 hover:bg-white hover:border-primary-300'
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-[9px] font-mono font-bold text-slate-500 uppercase">
                                  {p.category}
                                </span>
                                <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                                  p.status === 'compliant' ? 'bg-success-light text-success' :
                                  p.status === 'partial' ? 'bg-warn-light text-warn' : 'bg-danger-light text-danger'
                                }`}>
                                  {p.complianceScore}%
                                </span>
                              </div>
                              <h5 className="text-xs font-bold text-slate-900 leading-snug">
                                {p.brand}
                              </h5>
                              <p className="text-[11px] text-slate-500 truncate">
                                {p.name}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Initiate Button */}
                  {selectedProduct && (
                    <button 
                      type="button"
                      onClick={startScan}
                      className="btn-primary w-full py-3 text-sm shadow-lg shadow-primary-500/25 animate-fade-up mt-4"
                    >
                      <ScanLine className="w-4 h-4" />
                      <span>Initiate AI Verification ({selectedProduct.brand})</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  )}
                </div>
              </div>

            </div>

            {/* Bottom Regulatory Trust Strip */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
              <div className="flex items-center gap-2 font-medium">
                <ShieldCheck className="w-4 h-4 text-primary-600" />
                <span>Enforcing Legal Metrology (Packaged Commodities) Rules, 2011 & Schedule II</span>
              </div>
              <div className="text-[11px] font-mono text-slate-400">
                OCR Pipeline: Neural Text Detection + mm Reference Scale Engine
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* STAGE 2: HIGH-TECH AI SCANNING VISUALIZER WITH PROGRESS */}
        {/* ========================================================================= */}
        {stage === 'scanning' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/95 p-8 backdrop-blur-md z-20">
            
            {/* Animated Scanner Radar / Image View */}
            <div className="relative w-44 h-44 mb-8 flex items-center justify-center">
              <div className="absolute inset-0 rounded-3xl border-4 border-primary-100 animate-ping opacity-40"></div>
              <div className="absolute inset-2 rounded-3xl border-2 border-dashed border-primary-400 animate-spin" style={{ animationDuration: '8s' }}></div>
              
              <div className="w-32 h-32 rounded-2xl bg-primary-50 border border-primary-200 flex flex-col items-center justify-center text-primary-600 shadow-lg overflow-hidden relative">
                {uploadedImageSrc ? (
                  <img src={uploadedImageSrc} alt="Scanning preview" className="w-full h-full object-cover opacity-60 filter blur-[0.5px]" />
                ) : (
                  <ScanLine className="w-10 h-10 animate-pulse text-primary-600 mb-1" />
                )}
                
                {/* Laser Scan Line Overlay */}
                <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent shadow-[0_0_12px_#3b82f6] animate-scan-line pointer-events-none"></div>

                <div className="absolute bottom-2 bg-slate-900/80 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded backdrop-blur-sm">
                  {scanProgress}%
                </div>
              </div>
            </div>

            <div className="w-full max-w-md text-center space-y-4">
              <div>
                <span className="text-primary-600 font-display text-xl font-black tracking-wider animate-pulse block">
                  ANALYZING STATUTORY COMPLIANCE...
                </span>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Inspecting {selectedProduct?.brand} {selectedProduct?.name} declarations
                </p>
              </div>

              {/* Progress Bar */}
              <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200 shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-primary-400 via-primary-500 to-blue-600 transition-all duration-100"
                  style={{ width: `${scanProgress}%` }}
                ></div>
              </div>

              {/* Live Step Logs */}
              <div className="h-32 overflow-hidden font-mono text-xs space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left shadow-inner">
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
        {/* STAGE 3: INTERACTIVE RESULTS DASHBOARD WITH IMAGE BOUNDING BOXES */}
        {/* ========================================================================= */}
        {stage === 'results' && selectedProduct && (
          <div className="flex-1 p-6 md:p-8 overflow-y-auto flex flex-col justify-between space-y-6">
            
            {/* Fullscreen Image Preview Modal */}
            {isFullscreenPreview && uploadedImageSrc && (
              <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in" onClick={() => setIsFullscreenPreview(false)}>
                <div className="relative max-w-4xl max-h-[90vh] bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 p-2 flex flex-col items-center">
                  <button 
                    onClick={() => setIsFullscreenPreview(false)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-white hover:bg-slate-700 z-10"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <img src={uploadedImageSrc} alt="High resolution inspection label" className="max-w-full max-h-[85vh] object-contain rounded-lg" />
                  <p className="text-xs text-slate-300 font-mono mt-2">{selectedProduct.brand} {selectedProduct.name} - Principal Display Panel</p>
                </div>
              </div>
            )}

            {/* Top Product Banner & Scorecard */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-4">
                {uploadedImageSrc && (
                  <div 
                    onClick={() => setIsFullscreenPreview(true)}
                    className="w-16 h-16 rounded-2xl border-2 border-primary-300 overflow-hidden bg-slate-900 shadow-md shrink-0 cursor-pointer group relative"
                    title="Click to view full image"
                  >
                    <img src={uploadedImageSrc} alt="Product label" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>
                )}
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
                    Principal Display Panel (PDP) Surface Area: <strong>{selectedProduct.pdpAreaCm2 || 240} cm²</strong> • Schedule II Verified
                  </p>
                </div>
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
                    Statutory Score: <strong className={`text-lg ${
                      selectedProduct.complianceScore >= 80 ? 'text-success' : 
                      selectedProduct.complianceScore >= 60 ? 'text-warn' : 'text-danger'
                    }`}>{selectedProduct.complianceScore}/100</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Split Inspection View: Image OCR Bounding Box Visualizer + Compliance Data */}
            <div className="grid lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Column (5 cols): Visual OCR Bounding Box Canvas */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-3">
                  
                  {/* Clean Label Image Display */}
                  <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 min-h-[260px] flex items-center justify-center select-none shadow-inner">
                    {uploadedImageSrc ? (
                      <img 
                        src={uploadedImageSrc} 
                        alt="Scanned product label" 
                        className="w-full h-full object-contain max-h-[380px] bg-slate-950" 
                      />
                    ) : (
                      <div className="p-8 text-center text-slate-400 font-mono text-xs space-y-2">
                        <ImageIcon className="w-12 h-12 mx-auto text-slate-600 opacity-60" />
                        <p>{selectedProduct.brand} {selectedProduct.name}</p>
                      </div>
                    )}
                  </div>

                  {/* Violations Warning Block */}
                  {selectedProduct.violations?.length > 0 ? (
                    <div className="space-y-2 pt-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-danger flex items-center gap-1.5">
                          <AlertTriangle className="w-4 h-4" />
                          Detected Non-Compliances ({selectedProduct.violations.length})
                        </h4>
                        <span className="text-[10px] text-danger font-mono font-bold bg-danger-light px-2 py-0.5 rounded">
                          Action Required
                        </span>
                      </div>

                      <div className="space-y-2">
                        {selectedProduct.violations.map((v, i) => (
                          <div 
                            key={i} 
                            className={`p-3 rounded-2xl border ${
                              v.severity === 'critical' ? 'bg-danger-light/40 border-danger/30' : 'bg-warn-light/40 border-warn/30'
                            }`}
                          >
                            <div className="flex justify-between items-start mb-1">
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
                    <div className="bg-success-light/30 border border-success/30 p-4 rounded-2xl flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-success text-white flex items-center justify-center shrink-0 shadow-sm">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-success">Statutory Compliance Verified</h4>
                        <p className="text-[11px] text-slate-600 font-medium mt-0.5">
                          All mandatory declarations & font rules comply with PCR 2011.
                        </p>
                      </div>
                    </div>
                  )}

                </div>
              </div>

              {/* Right Column (7 cols): Extracted Declarations & Font Measurement Table */}
              <div className="lg:col-span-7 space-y-4">
                
                {/* Mandatory Declarations Table */}
                <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                      <FileCheck2 className="w-4 h-4 text-primary-600" />
                      Extracted Mandatory Declarations (Rule 6)
                    </h4>
                    <span className="text-[11px] text-slate-400 font-semibold">9 Declarations Audit</span>
                  </div>

                  <div className="border border-slate-200 rounded-2xl overflow-x-auto bg-slate-50 text-xs">
                    <table className="w-full text-left min-w-[300px]">
                      <tbody>
                        {selectedProduct.declarations && Object.entries(selectedProduct.declarations).map(([key, val]) => (
                          <tr key={key} className="border-b border-slate-200 last:border-0 hover:bg-white transition-colors">
                            <td className="py-2.5 px-4 font-semibold text-slate-500 capitalize w-1/3">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </td>
                            <td className="py-2.5 px-4 font-bold text-slate-800 w-2/3">
                              {val}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Schedule II Font Height Table */}
                {selectedProduct.fontAnalysis && selectedProduct.fontAnalysis.length > 0 && (
                  <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                      <Ruler className="w-4 h-4 text-primary-600" />
                      Schedule II Font Height in Millimeters
                    </h4>

                    <div className="border border-slate-200 rounded-2xl overflow-x-auto bg-slate-50 text-xs">
                      <table className="w-full text-left min-w-[400px]">
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

            </div>

            {/* Bottom Actions Bar */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button 
                onClick={resetScanner}
                className="btn-outline text-xs py-2.5 px-5 bg-white w-full sm:w-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Upload Another Label Image</span>
              </button>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button 
                  onClick={() => navigate('/history')}
                  className="btn-outline text-xs py-2.5 px-5 bg-white flex-1 sm:flex-initial"
                >
                  View Inspection Archive
                </button>
                <button 
                  onClick={() => {
                    if (selectedProduct) {
                      setActiveProduct(selectedProduct);
                      addScanToHistory(selectedProduct);
                      navigate(`/report/${selectedProduct.id}`);
                    }
                  }}
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
