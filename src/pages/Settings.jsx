import React, { useState } from 'react';
import { 
  Sliders, ShieldCheck, Cpu, Bell, Database, Save, CheckCircle2, 
  RotateCcw, Scale, FileText, AlertCircle, Building, Key, Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Settings = () => {
  const { user, role } = useAuth();
  const [activeTab, setActiveTab] = useState('rules');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Settings State with LocalStorage persistence
  const [rulesConfig, setRulesConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('ld_rules_config');
      return saved ? JSON.parse(saved) : {
        enforceMrp: true,
        enforceAddress: true,
        enforceOrigin: true,
        enforceNetQty: true,
        enforceConsumerCare: true,
        enforceDateMfg: true,
        minFontHeightMm: '1.5',
        dualMrpStrictness: 'strict',
        netQtyTolerancePercent: '1.5',
      };
    } catch {
      return {
        enforceMrp: true,
        enforceAddress: true,
        enforceOrigin: true,
        enforceNetQty: true,
        enforceConsumerCare: true,
        enforceDateMfg: true,
        minFontHeightMm: '1.5',
        dualMrpStrictness: 'strict',
        netQtyTolerancePercent: '1.5',
      };
    }
  });

  const [aiConfig, setAiConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('ld_ai_config');
      return saved ? JSON.parse(saved) : {
        modelEngine: 'gemini-1.5-vision',
        confidenceThreshold: 85,
        multiLanguageOcr: true,
        autoDeskew: true,
        gs1BarcodeLookup: true,
        enhancedContrast: true,
      };
    } catch {
      return {
        modelEngine: 'gemini-1.5-vision',
        confidenceThreshold: 85,
        multiLanguageOcr: true,
        autoDeskew: true,
        gs1BarcodeLookup: true,
        enhancedContrast: true,
      };
    }
  });

  const [jurisdictionConfig, setJurisdictionConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('ld_jurisdiction_config');
      return saved ? JSON.parse(saved) : {
        zone: 'Central Enforcement Zone (New Delhi)',
        officerDesignation: 'Legal Metrology Officer (Class-I)',
        signatoryName: 'Dr. V. K. Sharma',
        noticeResponseDays: '15',
        autoDigitalSignature: true,
        qrNoticeVerification: true,
      };
    } catch {
      return {
        zone: 'Central Enforcement Zone (New Delhi)',
        officerDesignation: 'Legal Metrology Officer (Class-I)',
        signatoryName: 'Dr. V. K. Sharma',
        noticeResponseDays: '15',
        autoDigitalSignature: true,
        qrNoticeVerification: true,
      };
    }
  });

  const handleSave = () => {
    try {
      localStorage.setItem('ld_rules_config', JSON.stringify(rulesConfig));
      localStorage.setItem('ld_ai_config', JSON.stringify(aiConfig));
      localStorage.setItem('ld_jurisdiction_config', JSON.stringify(jurisdictionConfig));
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (e) {
      console.error("Failed to save settings", e);
    }
  };

  const handleReset = () => {
    if (window.confirm("Reset all settings to national legal compliance defaults?")) {
      const defaultRules = {
        enforceMrp: true,
        enforceAddress: true,
        enforceOrigin: true,
        enforceNetQty: true,
        enforceConsumerCare: true,
        enforceDateMfg: true,
        minFontHeightMm: '1.5',
        dualMrpStrictness: 'strict',
        netQtyTolerancePercent: '1.5',
      };
      const defaultAi = {
        modelEngine: 'gemini-1.5-vision',
        confidenceThreshold: 85,
        multiLanguageOcr: true,
        autoDeskew: true,
        gs1BarcodeLookup: true,
        enhancedContrast: true,
      };
      const defaultJurisdiction = {
        zone: 'Central Enforcement Zone (New Delhi)',
        officerDesignation: 'Legal Metrology Officer (Class-I)',
        signatoryName: 'Dr. V. K. Sharma',
        noticeResponseDays: '15',
        autoDigitalSignature: true,
        qrNoticeVerification: true,
      };
      setRulesConfig(defaultRules);
      setAiConfig(defaultAi);
      setJurisdictionConfig(defaultJurisdiction);
      localStorage.setItem('ld_rules_config', JSON.stringify(defaultRules));
      localStorage.setItem('ld_ai_config', JSON.stringify(defaultAi));
      localStorage.setItem('ld_jurisdiction_config', JSON.stringify(defaultJurisdiction));
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <h2 className="text-2xl font-display font-bold text-slate-900">System & Compliance Settings</h2>
            <span className="badge bg-primary-50 text-primary-700 border border-primary-200">
              Admin Console
            </span>
          </div>
          <p className="text-slate-500 font-medium text-sm">
            Configure Legal Metrology (Packaged Commodities) Rules 2011 parameters, AI thresholds, and jurisdiction notice forms.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className="btn-outline py-2 px-4 text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            <RotateCcw className="w-4 h-4" />
            Reset Defaults
          </button>

          <button
            onClick={handleSave}
            className="btn-primary py-2 px-5 text-sm shadow-md"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-emerald-800 text-sm font-semibold animate-fade-up">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Settings successfully saved and applied to inspection engine!</span>
          </div>
          <span className="text-xs text-emerald-600 bg-emerald-100/70 px-2.5 py-0.5 rounded-full">Updated</span>
        </div>
      )}

      {/* Tabs Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Navigation Sidebar */}
        <div className="space-y-2 lg:col-span-1">
          <button
            onClick={() => setActiveTab('rules')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-sm transition-all text-left ${
              activeTab === 'rules'
                ? 'bg-primary-600 text-white shadow-md shadow-primary-500/20'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Scale className="w-5 h-5 shrink-0" />
            <div>
              <p>Legal Rules (PCR 2011)</p>
              <p className={`text-[11px] font-normal ${activeTab === 'rules' ? 'text-primary-100' : 'text-slate-400'}`}>
                Mandatory Declarations
              </p>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('ai')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-sm transition-all text-left ${
              activeTab === 'ai'
                ? 'bg-primary-600 text-white shadow-md shadow-primary-500/20'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Cpu className="w-5 h-5 shrink-0" />
            <div>
              <p>AI Vision & OCR Engine</p>
              <p className={`text-[11px] font-normal ${activeTab === 'ai' ? 'text-primary-100' : 'text-slate-400'}`}>
                Confidence & Processing
              </p>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('jurisdiction')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-sm transition-all text-left ${
              activeTab === 'jurisdiction'
                ? 'bg-primary-600 text-white shadow-md shadow-primary-500/20'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Building className="w-5 h-5 shrink-0" />
            <div>
              <p>Jurisdiction & Notice Form</p>
              <p className={`text-[11px] font-normal ${activeTab === 'jurisdiction' ? 'text-primary-100' : 'text-slate-400'}`}>
                Signatory & SLA Windows
              </p>
            </div>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="lg:col-span-3">
          {activeTab === 'rules' && (
            <div className="glass-card p-6 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Legal Metrology Declarations (PCR 2011)</h3>
                <p className="text-slate-500 text-xs mt-1 font-medium">
                  Enforce strict compliance checks against Rule 6 of the Legal Metrology (Packaged Commodities) Rules, 2011.
                </p>
              </div>

              {/* Declarations Matrix */}
              <div className="space-y-3 border-t border-slate-100 pt-4">
                <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100/60 transition-colors cursor-pointer">
                  <div className="pr-4">
                    <p className="font-bold text-slate-900 text-sm">MRP Declaration (Incl. of All Taxes)</p>
                    <p className="text-xs text-slate-500 font-medium">Rule 6(1)(e): Must clearly state "Maximum Retail Price" or "MRP incl. of all taxes" without dual pricing.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={rulesConfig.enforceMrp}
                    onChange={(e) => setRulesConfig({ ...rulesConfig, enforceMrp: e.target.checked })}
                    className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                  />
                </label>

                <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100/60 transition-colors cursor-pointer">
                  <div className="pr-4">
                    <p className="font-bold text-slate-900 text-sm">Manufacturer / Packer / Importer Full Address</p>
                    <p className="text-xs text-slate-500 font-medium">Rule 6(1)(a): Complete registered postal address, state, and pin code.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={rulesConfig.enforceAddress}
                    onChange={(e) => setRulesConfig({ ...rulesConfig, enforceAddress: e.target.checked })}
                    className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                  />
                </label>

                <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100/60 transition-colors cursor-pointer">
                  <div className="pr-4">
                    <p className="font-bold text-slate-900 text-sm">Country of Origin (Imported Commodities)</p>
                    <p className="text-xs text-slate-500 font-medium">Rule 6(1)(ab): Mandatory declaration of country of manufacture/origin for all imported products.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={rulesConfig.enforceOrigin}
                    onChange={(e) => setRulesConfig({ ...rulesConfig, enforceOrigin: e.target.checked })}
                    className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                  />
                </label>

                <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100/60 transition-colors cursor-pointer">
                  <div className="pr-4">
                    <p className="font-bold text-slate-900 text-sm">Net Quantity in Standard SI Units</p>
                    <p className="text-xs text-slate-500 font-medium">Rule 11 & 12: Weight, measure, or number in standard metric units (g, kg, ml, l, units).</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={rulesConfig.enforceNetQty}
                    onChange={(e) => setRulesConfig({ ...rulesConfig, enforceNetQty: e.target.checked })}
                    className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                  />
                </label>

                <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100/60 transition-colors cursor-pointer">
                  <div className="pr-4">
                    <p className="font-bold text-slate-900 text-sm">Consumer Care / Grievance Redressal Cell</p>
                    <p className="text-xs text-slate-500 font-medium">Rule 6(1)(n): Valid customer care telephone number, email, and designated officer address.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={rulesConfig.enforceConsumerCare}
                    onChange={(e) => setRulesConfig({ ...rulesConfig, enforceConsumerCare: e.target.checked })}
                    className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                  />
                </label>

                <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100/60 transition-colors cursor-pointer">
                  <div className="pr-4">
                    <p className="font-bold text-slate-900 text-sm">Month & Year of Manufacture / Pre-packing</p>
                    <p className="text-xs text-slate-500 font-medium">Rule 6(1)(d): Month and year in MM/YYYY or format clear to consumer.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={rulesConfig.enforceDateMfg}
                    onChange={(e) => setRulesConfig({ ...rulesConfig, enforceDateMfg: e.target.checked })}
                    className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                  />
                </label>
              </div>

              {/* Threshold Parameters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Minimum Font Height (Table-I PCR 2011)
                  </label>
                  <select
                    value={rulesConfig.minFontHeightMm}
                    onChange={(e) => setRulesConfig({ ...rulesConfig, minFontHeightMm: e.target.value })}
                    className="input-field"
                  >
                    <option value="1.0">1.0 mm (Small packaging &lt; 50g/ml)</option>
                    <option value="1.5">1.5 mm (Standard packaging 50g - 200g)</option>
                    <option value="2.0">2.0 mm (Medium packaging 200g - 1kg)</option>
                    <option value="4.0">4.0 mm (Large bulk packaging &gt; 1kg)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Dual MRP Detection Strictness
                  </label>
                  <select
                    value={rulesConfig.dualMrpStrictness}
                    onChange={(e) => setRulesConfig({ ...rulesConfig, dualMrpStrictness: e.target.value })}
                    className="input-field"
                  >
                    <option value="strict">Strict (Flag any overwrite or multiple sticker MRPs)</option>
                    <option value="moderate">Moderate (Allow authorized discount stickers)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="glass-card p-6 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">AI Vision & OCR Engine Configuration</h3>
                <p className="text-slate-500 text-xs mt-1 font-medium">
                  Optimize model multimodal inference, confidence thresholds, and multi-language OCR parser.
                </p>
              </div>

              <div className="space-y-4 border-t border-slate-100 pt-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Primary Vision Model Engine
                  </label>
                  <select
                    value={aiConfig.modelEngine}
                    onChange={(e) => setAiConfig({ ...aiConfig, modelEngine: e.target.value })}
                    className="input-field"
                  >
                    <option value="gemini-1.5-vision">Legal-Drishti Gemini 1.5 Pro (Multimodal Neural Vision)</option>
                    <option value="edge-ocr-ultra">Legal-Drishti Edge OCR Ultra (Fast Local Fallback)</option>
                  </select>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Automated Violation Confidence Threshold
                    </label>
                    <span className="text-sm font-bold font-mono text-primary-600 bg-primary-50 px-2.5 py-0.5 rounded-lg border border-primary-200">
                      {aiConfig.confidenceThreshold}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="98"
                    value={aiConfig.confidenceThreshold}
                    onChange={(e) => setAiConfig({ ...aiConfig, confidenceThreshold: Number(e.target.value) })}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                  />
                  <p className="text-[11px] text-slate-400 mt-1 font-medium">
                    AI flags violations automatically if model confidence meets or exceeds this threshold.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={aiConfig.multiLanguageOcr}
                      onChange={(e) => setAiConfig({ ...aiConfig, multiLanguageOcr: e.target.checked })}
                      className="w-4 h-4 text-primary-600 rounded"
                    />
                    <div>
                      <p className="text-xs font-bold text-slate-900">Multi-Language Packaging OCR</p>
                      <p className="text-[10px] text-slate-500">English, Hindi & State Regional Scripts</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={aiConfig.gs1BarcodeLookup}
                      onChange={(e) => setAiConfig({ ...aiConfig, gs1BarcodeLookup: e.target.checked })}
                      className="w-4 h-4 text-primary-600 rounded"
                    />
                    <div>
                      <p className="text-xs font-bold text-slate-900">GS1 Registry Cross-Verification</p>
                      <p className="text-[10px] text-slate-500">Cross-verify barcode GTIN with brand data</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={aiConfig.autoDeskew}
                      onChange={(e) => setAiConfig({ ...aiConfig, autoDeskew: e.target.checked })}
                      className="w-4 h-4 text-primary-600 rounded"
                    />
                    <div>
                      <p className="text-xs font-bold text-slate-900">Auto-Deskew & Perspective Fix</p>
                      <p className="text-[10px] text-slate-500">Rectifies curved cylinder & pouch labels</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={aiConfig.enhancedContrast}
                      onChange={(e) => setAiConfig({ ...aiConfig, enhancedContrast: e.target.checked })}
                      className="w-4 h-4 text-primary-600 rounded"
                    />
                    <div>
                      <p className="text-xs font-bold text-slate-900">Adaptive Contrast & Glare Removal</p>
                      <p className="text-[10px] text-slate-500">Improves shiny foil / plastic packet scans</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'jurisdiction' && (
            <div className="glass-card p-6 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Jurisdiction & Legal Notice Form 1</h3>
                <p className="text-slate-500 text-xs mt-1 font-medium">
                  Configure enforcement jurisdiction headers, authorized signatory credentials, and legal response windows.
                </p>
              </div>

              <div className="space-y-4 border-t border-slate-100 pt-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Enforcement Jurisdiction Zone
                  </label>
                  <input
                    type="text"
                    value={jurisdictionConfig.zone}
                    onChange={(e) => setJurisdictionConfig({ ...jurisdictionConfig, zone: e.target.value })}
                    className="input-field"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Authorized Signatory Officer
                    </label>
                    <input
                      type="text"
                      value={jurisdictionConfig.signatoryName}
                      onChange={(e) => setJurisdictionConfig({ ...jurisdictionConfig, signatoryName: e.target.value })}
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Officer Designation
                    </label>
                    <input
                      type="text"
                      value={jurisdictionConfig.officerDesignation}
                      onChange={(e) => setJurisdictionConfig({ ...jurisdictionConfig, officerDesignation: e.target.value })}
                      className="input-field"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Statutory Notice Response Window (Days)
                  </label>
                  <select
                    value={jurisdictionConfig.noticeResponseDays}
                    onChange={(e) => setJurisdictionConfig({ ...jurisdictionConfig, noticeResponseDays: e.target.value })}
                    className="input-field"
                  >
                    <option value="7">7 Days (Fast-Track / Urgent)</option>
                    <option value="15">15 Days (Standard Legal Metrology Notice)</option>
                    <option value="30">30 Days (Extended Review Window)</option>
                  </select>
                </div>

                <div className="space-y-3 pt-2">
                  <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                    <div>
                      <p className="font-bold text-slate-900 text-xs">Automated Cryptographic Digital Signature</p>
                      <p className="text-[11px] text-slate-500">Embed verified SHA-256 digital signature stamp on PDF exports</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={jurisdictionConfig.autoDigitalSignature}
                      onChange={(e) => setJurisdictionConfig({ ...jurisdictionConfig, autoDigitalSignature: e.target.checked })}
                      className="w-4 h-4 text-primary-600 rounded"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                    <div>
                      <p className="font-bold text-slate-900 text-xs">Verification QR Code on Notice Form 1</p>
                      <p className="text-[11px] text-slate-500">Generates scannable QR code on notice for manufacturer authentication</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={jurisdictionConfig.qrNoticeVerification}
                      onChange={(e) => setJurisdictionConfig({ ...jurisdictionConfig, qrNoticeVerification: e.target.checked })}
                      className="w-4 h-4 text-primary-600 rounded"
                    />
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
