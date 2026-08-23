import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  UserCheck, 
  LayoutDashboard, 
  ArrowRight, 
  ScanLine, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Sparkles, 
  Cpu, 
  Scale, 
  Camera, 
  FileCheck, 
  TrendingUp, 
  BarChart3, 
  Database, 
  ChevronDown, 
  ChevronUp, 
  Lock, 
  Search,
  Check
} from 'lucide-react';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState(null);
  const [selectedDemoTab, setSelectedDemoTab] = useState('chips');

  const handleRoleSelect = (role, targetPath = '/dashboard') => {
    login(role);
    navigate(targetPath);
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const mandatoryRules = [
    { rule: "Rule 6(1)(a)", title: "Manufacturer & Packer Address", desc: "Complete name, physical facility address, and manufacturing unit location." },
    { rule: "Rule 6(1)(b)", title: "Generic Name of Commodity", desc: "Common or generic name of the packaged commodity clearly stated." },
    { rule: "Rule 6(1)(c)", title: "Net Quantity & Standard Unit", desc: "Net weight, volume, or count in prescribed standard SI metric units (g, kg, ml, l)." },
    { rule: "Rule 6(1)(d)", title: "Date of Mfg / Packaging", desc: "Month and year of manufacture, packing, or import formatted correctly." },
    { rule: "Rule 6(1)(e)", title: "Maximum Retail Price (MRP)", desc: "Inclusive of all taxes in Indian Rupees (₹) on principal display panel." },
    { rule: "Rule 6(1)(f)", title: "Consumer Care & Helpline", desc: "Name, address, telephone number, and email ID for consumer grievances." },
    { rule: "Rule 6(1)(aa)", title: "Country of Origin", desc: "Mandatory country of manufacture declaration for domestic & imported goods." },
    { rule: "Rule 6(1)(ab)", title: "Unit Sale Price (USP)", desc: "Per gram/milliliter/unit pricing for consumer price transparency." },
    { rule: "Schedule II", title: "Font Size & Readability", desc: "Minimum numeral & letter height in millimeters based on package display area." },
  ];

  const faqs = [
    {
      q: "How does Legal Drishti measure physical font height from 2D images?",
      a: "Legal Drishti uses computer vision reference scaling algorithms that estimate package physical area and calibrate font pixel dimensions against Principal Display Panel (PDP) standards defined under Schedule II of the Legal Metrology Rules."
    },
    {
      q: "Which specific Legal Metrology regulations are validated automatically?",
      a: "The engine cross-checks declarations against the Legal Metrology (Packaged Commodities) Rules, 2011, including Rule 6 (Mandatory Declarations), Rule 7 & Schedule II (Font Size & Placement), Rule 12 (Net Quantity Verification), and Section 18/32 of the Legal Metrology Act, 2009."
    },
    {
      q: "Can enforcement officers generate legally admissible reports on-site?",
      a: "Yes. The system automatically compiles high-resolution image evidence, detected violations, rule citations, and timestamps into tamper-proof PDF inspection reports and Section 18 Show-Cause notices ready for digital signature and official submission."
    },
    {
      q: "How does the platform handle multi-angle or wrinkled packaged commodities?",
      a: "The OCR preprocessing pipeline applies adaptive contrast normalization, text region unwarping, and multi-region text detection to extract declarations even from curved bottles, metallic foils, and flexible pouches."
    }
  ];

  return (
    <div className="min-h-screen bg-surface-50 text-slate-800 flex flex-col selection:bg-primary-500 selection:text-white">
      {/* Decorative Background Elements */}
      <div className="fixed top-0 left-0 w-full h-[650px] bg-gradient-to-b from-primary-100/60 via-blue-50/40 to-transparent pointer-events-none -z-10"></div>
      <div className="fixed -top-40 -right-40 w-[500px] h-[500px] bg-primary-200/40 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse"></div>
      <div className="fixed top-96 -left-32 w-96 h-96 bg-blue-300/30 rounded-full blur-[90px] pointer-events-none -z-10"></div>

      {/* TOP NAVIGATION BAR WITH DUAL LOGIN ACTIONS AT TOP RIGHT */}
      <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo & Government Branding */}
          <div className="flex items-center gap-3.5">
            <div className="bg-gradient-to-br from-primary-600 to-primary-700 p-2.5 rounded-xl shadow-md shadow-primary-500/25 flex items-center justify-center">
              <ShieldCheck className="text-white w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-display font-black text-slate-900 tracking-wide">LEGAL DRISHTI</span>
                <span className="bg-primary-100 text-primary-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-primary-200 uppercase tracking-wider">
                  AI v2.4
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                Dept. of Consumer Affairs • Govt. of India
              </p>
            </div>
          </div>

          {/* Center Navigation Links (Hidden on small screens) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-600">
            <a href="#features" className="hover:text-primary-600 transition-colors">Key Features</a>
            <a href="#rules" className="hover:text-primary-600 transition-colors">LM Rules Checklist</a>
            <a href="#pipeline" className="hover:text-primary-600 transition-colors">Inspection Pipeline</a>
            <a href="#roles" className="hover:text-primary-600 transition-colors">Role Portals</a>
            <a href="#faq" className="hover:text-primary-600 transition-colors">FAQ</a>
          </nav>

          {/* TOP RIGHT CORNER LOGIN ACTIONS */}
          <div className="flex items-center gap-3">
            {/* Inspector Login Button */}
            <button 
              onClick={() => handleRoleSelect('inspector', '/scanner')}
              className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white text-xs sm:text-sm font-bold px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl shadow-md shadow-primary-500/20 hover:shadow-lg hover:shadow-primary-500/30 hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
              title="Launch Field Inspector AI Scanner"
            >
              <UserCheck className="w-4 h-4 text-primary-200 group-hover:text-white transition-colors" />
              <span>Inspector Login</span>
            </button>

            {/* Admin Login Button */}
            <button 
              onClick={() => handleRoleSelect('admin', '/dashboard')}
              className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 hover:text-primary-700 text-xs sm:text-sm font-bold px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-slate-200 hover:border-primary-300 shadow-sm hover:shadow active:scale-95 transition-all duration-200"
              title="Access Central Admin & Enforcement Oversight"
            >
              <LayoutDashboard className="w-4 h-4 text-slate-500 group-hover:text-primary-600 transition-colors" />
              <span className="hidden sm:inline">Admin Login</span>
              <span className="sm:hidden">Admin</span>
            </button>
          </div>

        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Headline & Call To Actions */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-6">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-100/90 text-primary-800 font-bold text-xs sm:text-sm border border-primary-200/80 shadow-sm">
                <Sparkles className="w-4 h-4 text-primary-600 animate-pulse" />
                <span>Smart India Hackathon • Legal Metrology Automation</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-slate-900 tracking-tight leading-[1.1]">
                Automated AI Compliance for <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-primary-500 to-blue-600">Packaged Commodities</span>
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg lg:text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Empowering enforcement officials to instantly scan labels, extract mandatory declarations, measure physical font sizes, and detect violations under the <strong className="text-slate-800 font-semibold">Legal Metrology (Packaged Commodities) Rules, 2011</strong>.
              </p>

              {/* Quick Feature Pills */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2.5 pt-2">
                {[
                  "OCR Declaration Extraction", 
                  "Schedule II Font Height in mm", 
                  "Instant Section 18 Notice", 
                  "Tamper-Proof Evidence"
                ].map((item, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1.5 bg-white px-3 py-1 rounded-lg text-xs font-semibold text-slate-700 border border-slate-200 shadow-sm">
                    <Check className="w-3.5 h-3.5 text-success" />
                    {item}
                  </span>
                ))}
              </div>

              {/* Dual Launch Actions */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button 
                  onClick={() => handleRoleSelect('inspector', '/scanner')}
                  className="w-full sm:w-auto btn-primary text-base py-3.5 px-8 shadow-xl shadow-primary-500/25 hover:shadow-2xl hover:shadow-primary-500/35"
                >
                  <ScanLine className="w-5 h-5" />
                  <span>Start Live AI Scan Demo</span>
                  <ArrowRight className="w-5 h-5 ml-1" />
                </button>

                <button 
                  onClick={() => handleRoleSelect('admin', '/dashboard')}
                  className="w-full sm:w-auto btn-outline text-base py-3.5 px-7 bg-white hover:bg-slate-50"
                >
                  <BarChart3 className="w-5 h-5 text-primary-600" />
                  <span>Open Admin Analytics</span>
                </button>
              </div>

              {/* Government Trust Line */}
              <div className="pt-2 flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-primary-600" />
                  <span>Legal Metrology Act, 2009</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                <div className="flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-primary-600" />
                  <span>PCR 2011 Standards</span>
                </div>
              </div>

            </div>

            {/* Right Column: Interactive Live Simulation Showcase */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Floating Glow behind card */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-blue-400 rounded-3xl blur-xl opacity-30 animate-pulse"></div>

                {/* Main Interactive Scanner Mock Card */}
                <div className="relative bg-white rounded-2xl border border-slate-200/90 shadow-2xl overflow-hidden">
                  
                  {/* Top Header of Simulator */}
                  <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-danger animate-pulse"></div>
                      <span className="text-xs font-mono font-bold tracking-wider text-slate-200">LIVE SCAN SIMULATOR</span>
                    </div>
                    <span className="text-[11px] font-mono bg-slate-800 text-primary-300 px-2 py-0.5 rounded border border-slate-700">
                      SEC-18 ENGINE
                    </span>
                  </div>

                  {/* Demo Item Selector Tabs */}
                  <div className="bg-slate-50 p-2 border-b border-slate-200 flex gap-1">
                    <button 
                      onClick={() => setSelectedDemoTab('chips')}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                        selectedDemoTab === 'chips' 
                          ? 'bg-white text-danger shadow-sm border border-slate-200' 
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      ⚠️ Lay's Chips (Violation)
                    </button>
                    <button 
                      onClick={() => setSelectedDemoTab('paneer')}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                        selectedDemoTab === 'paneer' 
                          ? 'bg-white text-success shadow-sm border border-slate-200' 
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      ✅ Amul Paneer (Compliant)
                    </button>
                  </div>

                  {/* Simulated Label Canvas with AI Overlays */}
                  <div className="p-6 bg-slate-100 relative">
                    <div className="bg-white rounded-xl border border-slate-300 p-5 relative shadow-inner overflow-hidden min-h-[220px] flex flex-col justify-between">
                      
                      {/* Product simulated label details */}
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-[10px] font-mono text-slate-400 font-bold uppercase">Commodity Sample</p>
                          <h4 className="text-base font-bold text-slate-900">
                            {selectedDemoTab === 'chips' ? "Classic Salted Chips 50g" : "Fresh Paneer 200g"}
                          </h4>
                          <p className="text-xs font-medium text-slate-500">
                            {selectedDemoTab === 'chips' ? "PepsiCo India Holdings" : "GCMMF Ltd. (Amul), Anand"}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                            selectedDemoTab === 'chips' ? 'bg-danger-light text-danger border border-danger/30' : 'bg-success-light text-success border border-success/30'
                          }`}>
                            {selectedDemoTab === 'chips' ? '55% Non-Compliant' : '100% Compliant'}
                          </span>
                        </div>
                      </div>

                      {/* AI Bounding Boxes Overlays */}
                      <div className="my-3 space-y-2">
                        {/* MRP Tag */}
                        <div className="p-1.5 bg-success/10 border border-success rounded flex items-center justify-between text-xs">
                          <span className="font-mono text-[11px] font-bold text-success">MRP: {selectedDemoTab === 'chips' ? "₹20.00 (Incl. Taxes)" : "₹95.00 (USP ₹0.48/g)"}</span>
                          <span className="text-[9px] bg-success text-white px-1.5 rounded font-bold">Rule 6(1)(e) PASS</span>
                        </div>

                        {/* Net Quantity Tag */}
                        <div className="p-1.5 bg-success/10 border border-success rounded flex items-center justify-between text-xs">
                          <span className="font-mono text-[11px] font-bold text-success">Net Wt: {selectedDemoTab === 'chips' ? "50g" : "200 g"}</span>
                          <span className="text-[9px] bg-success text-white px-1.5 rounded font-bold">Rule 12 PASS</span>
                        </div>

                        {/* Violation Box (for chips) */}
                        {selectedDemoTab === 'chips' ? (
                          <div className="p-1.5 bg-danger/10 border border-danger rounded flex items-center justify-between text-xs animate-pulse">
                            <span className="font-mono text-[11px] font-bold text-danger">Country of Origin: ABSENT</span>
                            <span className="text-[9px] bg-danger text-white px-1.5 rounded font-bold">Rule 6(1)(aa) FAIL</span>
                          </div>
                        ) : (
                          <div className="p-1.5 bg-success/10 border border-success rounded flex items-center justify-between text-xs">
                            <span className="font-mono text-[11px] font-bold text-success">Country of Origin: India</span>
                            <span className="text-[9px] bg-success text-white px-1.5 rounded font-bold">Rule 6(1)(aa) PASS</span>
                          </div>
                        )}
                      </div>

                      {/* Font Measurement Badge */}
                      <div className="flex justify-between items-center text-[10px] text-slate-500 border-t border-slate-100 pt-2 font-mono">
                        <span>Font Height Measured: <strong>2.1mm</strong> (Min Req: 1.0mm)</span>
                        <span className="text-success font-bold">Schedule II OK</span>
                      </div>

                      {/* Simulated Scanning laser line */}
                      <div className="absolute left-0 right-0 h-0.5 bg-primary-500 shadow-[0_0_10px_#3b82f6] animate-scan-line pointer-events-none"></div>
                    </div>
                  </div>

                  {/* Simulator Bottom Action */}
                  <div className="p-4 bg-white flex items-center justify-between border-t border-slate-200">
                    <div className="text-xs text-slate-500">
                      <span>Inspection ID: <strong>LD-2026-904</strong></span>
                    </div>
                    <button 
                      onClick={() => handleRoleSelect('inspector', '/scanner')}
                      className="text-xs font-bold text-primary-600 hover:text-primary-800 flex items-center gap-1 group"
                    >
                      <span>Launch Full Scanner</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>



      {/* CORE CAPABILITIES & FEATURES GRID */}
      <section id="features" className="py-20 bg-surface-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-primary-600">Enterprise AI Capabilities</h2>
            <p className="text-3xl sm:text-4xl font-display font-black text-slate-900">
              Complete End-to-End Compliance Technology
            </p>
            <p className="text-slate-600 font-medium text-base">
              Engineered specifically for enforcement officers to eliminate manual measuring tapes, tedious declaration checklists, and subjective violations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Feature 1 */}
            <div className="glass-card p-7 flex flex-col justify-between hover:border-primary-300 hover:shadow-xl transition-all">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center shadow-sm">
                  <ScanLine className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Automated Declaration OCR</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Deep-learning optical character recognition detects and classifies all 9 mandatory packaging declarations defined under Rule 6 of the 2011 Rules.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-bold text-primary-600">
                <span>Rule 6(1) Auto-Extraction</span>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="glass-card p-7 flex flex-col justify-between hover:border-primary-300 hover:shadow-xl transition-all">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shadow-sm">
                  <Scale className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Font Height in Millimeters</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Calculates absolute numeral and font dimensions to verify strict conformity with Schedule II minimum millimeter height standards.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-bold text-blue-600">
                <span>Schedule II Height Validation</span>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="glass-card p-7 flex flex-col justify-between hover:border-primary-300 hover:shadow-xl transition-all">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-danger-light text-danger flex items-center justify-center shadow-sm">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Violation Classifier</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Identifies missing fields, misleading claims, non-standard unit symbols (e.g. gms vs g), and improper declaration placements in real time.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-bold text-danger">
                <span>Section 18 & 32 Compliance</span>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="glass-card p-7 flex flex-col justify-between hover:border-primary-300 hover:shadow-xl transition-all">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-sm">
                  <Camera className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Evidence Locker & Photo Vault</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Attaches unedited high-resolution inspection photographs, geo-coordinates, batch codes, and inspector timestamps for legal audit readiness.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-bold text-emerald-600">
                <span>Tamper-Proof Audit Trail</span>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="glass-card p-7 flex flex-col justify-between hover:border-primary-300 hover:shadow-xl transition-all">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shadow-sm">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Instant PDF Legal Reports</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Produces official Ministry-formatted compliance certificates or Section 18 Show-Cause Notices with digital signature support in one click.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-bold text-amber-600">
                <span>One-Click Export & Print</span>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="glass-card p-7 flex flex-col justify-between hover:border-primary-300 hover:shadow-xl transition-all">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shadow-sm">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Enforcement Dashboard</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Centralized supervisory dashboard tracking regional inspection velocity, repeat offender manufacturers, and commodity compliance trends.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-bold text-purple-600">
                <span>State & District Analytics</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* MANDATORY LEGAL METROLOGY RULES CHECKLIST SECTION */}
      <section id="rules" className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-primary-600">Statutory Framework</span>
              <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 mt-1">
                Legal Metrology (Packaged Commodities) Rules, 2011
              </h2>
            </div>
            <p className="text-slate-500 text-sm max-w-md font-medium">
              Every packaged commodity sold in India must satisfy these mandatory declarations under the Legal Metrology Act.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mandatoryRules.map((r, i) => (
              <div key={i} className="p-6 rounded-2xl bg-surface-50 border border-slate-200/90 hover:border-primary-300 hover:bg-primary-50/30 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold bg-primary-100 text-primary-700 px-2.5 py-1 rounded-md border border-primary-200">
                    {r.rule}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-primary-600" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1.5">{r.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3-STEP INSPECTION PIPELINE WORKFLOW */}
      <section id="pipeline" className="py-20 bg-surface-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-primary-600">Streamlined Workflow</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900">
              How Legal Drishti Works in the Field
            </h2>
            <p className="text-slate-600 text-sm font-medium">
              From on-site camera snap to an enforceable legal notice in under 30 seconds.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            
            {/* Step 1 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative">
              <div className="w-12 h-12 rounded-2xl bg-primary-600 text-white font-display text-xl font-bold flex items-center justify-center mb-6 shadow-md shadow-primary-500/20">
                01
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Capture or Upload</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Field inspector takes a photograph of the packaged product label or selects an item from the pre-loaded commodity catalog.
              </p>
              <div className="text-xs font-bold text-primary-600 bg-primary-50 px-3 py-1.5 rounded-lg w-max">
                Mobile Camera & Batch Upload
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative">
              <div className="w-12 h-12 rounded-2xl bg-primary-600 text-white font-display text-xl font-bold flex items-center justify-center mb-6 shadow-md shadow-primary-500/20">
                02
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">AI Extraction & Font Analysis</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Computer vision models extract text regions, calculate millimeter letter heights, and cross-reference statutory Legal Metrology rules.
              </p>
              <div className="text-xs font-bold text-primary-600 bg-primary-50 px-3 py-1.5 rounded-lg w-max">
                Sub-Second Rule Validation
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative">
              <div className="w-12 h-12 rounded-2xl bg-primary-600 text-white font-display text-xl font-bold flex items-center justify-center mb-6 shadow-md shadow-primary-500/20">
                03
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Verdict & Legal Notice</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                A compliance score is generated immediately. Compliant products get logged; violations generate Section 18 notices for prompt action.
              </p>
              <div className="text-xs font-bold text-primary-600 bg-primary-50 px-3 py-1.5 rounded-lg w-max">
                Printable PDF & Digital Sign
              </div>
            </div>

          </div>

          {/* Quick CTA to try scanner */}
          <div className="mt-12 text-center">
            <button 
              onClick={() => handleRoleSelect('inspector', '/scanner')}
              className="btn-primary py-3 px-8 mx-auto text-sm"
            >
              <ScanLine className="w-4 h-4" />
              <span>Test the 3-Step Scanner Now</span>
            </button>
          </div>

        </div>
      </section>

      {/* ROLE PORTALS ACCESS CARDS SECTION */}
      <section id="roles" className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-primary-600">Role-Based Access</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900">
              Select Your Authorized Portal
            </h2>
            <p className="text-slate-600 text-sm font-medium">
              Choose an access tier to experience the dedicated user interface for field operations or central supervision.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* Field Inspector Portal Card */}
            <div className="group relative bg-white p-8 sm:p-10 rounded-3xl shadow-xl shadow-slate-200/60 border-2 border-slate-200/90 hover:border-primary-500 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-16 h-16 rounded-2xl bg-primary-50 border border-primary-200 flex items-center justify-center mb-6 group-hover:bg-primary-600 transition-all text-primary-600 group-hover:text-white shadow-sm">
                  <UserCheck className="w-8 h-8" />
                </div>
                
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-2xl font-bold text-slate-900">Field Inspector Portal</h3>
                  <span className="badge badge-success text-[10px]">Field Ready</span>
                </div>

                <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                  Tailored for on-ground enforcement officers conducting retail and warehouse raids. Scan packaged goods, verify declarations in seconds, and create case files.
                </p>

                <ul className="space-y-2.5 mb-8 text-xs font-semibold text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary-600" />
                    <span>Real-time AI Camera & Image Scanner</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary-600" />
                    <span>Instant Violation Citations & Penalty Codes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary-600" />
                    <span>One-Click PDF Inspection Notice Generation</span>
                  </li>
                </ul>
              </div>

              <button 
                onClick={() => handleRoleSelect('inspector', '/scanner')}
                className="btn-primary w-full py-3 text-sm shadow-md"
              >
                <span>Login as Field Inspector</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Central Admin Portal Card */}
            <div className="group relative bg-white p-8 sm:p-10 rounded-3xl shadow-xl shadow-slate-200/60 border-2 border-slate-200/90 hover:border-blue-600 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center mb-6 group-hover:bg-slate-900 transition-all text-slate-700 group-hover:text-white shadow-sm">
                  <LayoutDashboard className="w-8 h-8" />
                </div>
                
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-2xl font-bold text-slate-900">Central Admin Dashboard</h3>
                  <span className="badge badge-warning text-[10px]">Executive Tier</span>
                </div>

                <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                  Designed for Controllers, Joint Directors, and State Enforcement Supervisors. Monitor multi-district inspection quotas, violation trends, and repeat offenders.
                </p>

                <ul className="space-y-2.5 mb-8 text-xs font-semibold text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    <span>Statewide Compliance Analytics & Heatmaps</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    <span>Historical Scans Repository & Search Engine</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    <span>Inspector Activity Logs & Audit Trails</span>
                  </li>
                </ul>
              </div>

              <button 
                onClick={() => handleRoleSelect('admin', '/dashboard')}
                className="btn-outline w-full py-3 text-sm border-2 border-slate-300 hover:border-slate-800 hover:bg-slate-900 hover:text-white"
              >
                <span>Login as Central Supervisor</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS SECTION */}
      <section id="faq" className="py-20 bg-surface-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-14 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-primary-600">Technical & Legal FAQ</span>
            <h2 className="text-3xl font-display font-black text-slate-900">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 text-sm font-medium">
              Key operational insights about Legal Drishti's computer vision and rule verification engine.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div 
                  key={index}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden transition-all"
                >
                  <button 
                    onClick={() => toggleFaq(index)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-primary-600 transition-colors"
                  >
                    <span className="text-base">{faq.q}</span>
                    <span className="p-1 rounded-lg bg-slate-100 text-slate-600">
                      {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </span>
                  </button>
                  
                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-sm text-slate-600 font-medium leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* RICH GOVERNMENT FOOTER */}
      <footer className="bg-slate-900 text-white pt-16 pb-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
            
            {/* Col 1: System Info */}
            <div className="space-y-4 md:col-span-2">
              <div className="flex items-center gap-3">
                <div className="bg-primary-500 p-2 rounded-xl">
                  <ShieldCheck className="text-white w-6 h-6" />
                </div>
                <span className="text-xl font-display font-black tracking-wide text-white">LEGAL DRISHTI</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                Automated compliance inspection and enforcement platform under the Legal Metrology (Packaged Commodities) Rules, 2011. Built for the Smart India Hackathon.
              </p>
              <div className="text-[11px] text-slate-500">
                Department of Consumer Affairs • Ministry of Consumer Affairs, Food & Public Distribution
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Quick Navigation</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><a href="#features" className="hover:text-white transition-colors">Core Capabilities</a></li>
                <li><a href="#rules" className="hover:text-white transition-colors">LM Rules 2011 Checklist</a></li>
                <li><a href="#pipeline" className="hover:text-white transition-colors">Inspection Pipeline</a></li>
                <li><a href="#roles" className="hover:text-white transition-colors">Role Portals</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">Technical FAQ</a></li>
              </ul>
            </div>

            {/* Col 3: Direct Portal Access */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Demo Access</h4>
              <div className="space-y-2">
                <button 
                  onClick={() => handleRoleSelect('inspector', '/scanner')}
                  className="w-full text-left px-3 py-2 rounded-lg bg-slate-800 hover:bg-primary-600 text-xs font-semibold text-slate-200 hover:text-white transition-all flex items-center justify-between"
                >
                  <span>Field Inspector Portal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={() => handleRoleSelect('admin', '/dashboard')}
                  className="w-full text-left px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 hover:text-white transition-all flex items-center justify-between"
                >
                  <span>Admin Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© 2026 Legal Drishti • Smart India Hackathon Prototype</p>
            <div className="flex items-center gap-6">
              <span>Legal Metrology Act, 2009</span>
              <span>PCR 2011</span>
              <span>Privacy & Security</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
};

export default Login;
