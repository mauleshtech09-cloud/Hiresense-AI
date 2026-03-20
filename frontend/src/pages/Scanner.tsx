import React, { useState } from 'react';
import { 
  Upload, FileText, BarChart3, CheckCircle2, XCircle, 
  AlertCircle, Loader2, Search, Briefcase, 
  GraduationCap, Cpu, DollarSign, MapPin, Target, Zap, MessageSquare 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useAppState } from '../context/AppStateContext';
import { resumeService } from '../services/resumeService';

const Scanner: React.FC = () => {
  const { incrementScan } = useAuth();
  const { setCurrentReport } = useAppState();

  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisReport, setAnalysisReport] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState(0);

  const formula = {
    domain: 35,
    skills: 25,
    experience: 15,
    education: 10,
    certs: 10,
    support: 5
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const performDeepScan = async () => {
    if (!file) {
      setError("Please upload a resume first.");
      return;
    }
    
    if (!incrementScan()) {
      setError("Daily scan limit reached for your plan!");
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setAnalysisReport(null);

    try {
      const report = await resumeService.analyze(file, "Dynamic Zero-Bias Setup", false);
      if (report && report.masterAnalysis) {
        setAnalysisReport(report.masterAnalysis);
        setCurrentReport(report);
      } else {
        throw new Error("Invalid report response constraint. Try scanning again.");
      }
    } catch (err: any) {
      setError(err.message || "Analysis engine timeout. Please retry.");
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const SectionIcon = ({ id }: { id: number }) => {
    const icons: Record<number, React.ReactNode> = {
      1: <FileText className="w-5 h-5" />,
      2: <GraduationCap className="w-5 h-5" />,
      3: <Cpu className="w-5 h-5" />,
      4: <Briefcase className="w-5 h-5" />,
      5: <DollarSign className="w-5 h-5" />,
      6: <MapPin className="w-5 h-5" />,
      7: <Target className="w-5 h-5" />,
      8: <BarChart3 className="w-5 h-5" />,
      9: <CheckCircle2 className="w-5 h-5" />,
      10: <MessageSquare className="w-5 h-5" />
    };
    return icons[id] || <AlertCircle className="w-5 h-5" />;
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#fafafa] font-['Inter',sans-serif] selection:bg-blue-500/30">
      <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT: Upload & Controls */}
        <div className="lg:col-span-4 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-2xl bg-zinc-900/50 border border-white/5 backdrop-blur-sm"
          >
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Upload className="w-5 h-5 text-blue-500" />
              Candidate Ingestion
            </h2>
            
            <label className="group relative block w-full aspect-video border-2 border-dashed border-white/10 rounded-xl hover:border-blue-500/50 transition-all cursor-pointer bg-black/20">
              <input type="file" className="hidden" onChange={handleFileUpload} accept=".pdf,.png,.jpg" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                {file ? (
                  <>
                    <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-2">
                      <FileText className="w-6 h-6 text-blue-400" />
                    </div>
                    <p className="text-sm font-medium text-zinc-200 truncate max-w-full px-4">{file.name}</p>
                    <p className="text-xs text-zinc-500 mt-1">Ready for Deep Scan</p>
                  </>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-zinc-500 group-hover:text-blue-400 transition-colors mb-2" />
                    <p className="text-sm font-medium text-zinc-300">Drop resume here or click</p>
                    <p className="text-xs text-zinc-500 mt-1">Supports PDF uploads</p>
                  </>
                )}
              </div>
            </label>

            <button
              onClick={performDeepScan}
              disabled={!file || isAnalyzing}
              className={`w-full mt-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                isAnalyzing ? 'bg-zinc-800 text-zinc-500' : 'bg-blue-600 hover:bg-blue-500 active:scale-95 text-white shadow-lg shadow-blue-500/20'
              }`}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing Bio-Markers...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 fill-current" />
                  Execute Deep Scan
                </>
              )}
            </button>
          </motion.div>

          {/* Formula Sidebar Card */}
          <div className="p-6 rounded-2xl bg-zinc-900/30 border border-white/5">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Weighting Blueprint</h3>
            <div className="space-y-3">
              {Object.entries(formula).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm text-zinc-400 capitalize">{key}</span>
                  <div className="flex items-center gap-3 flex-1 px-4">
                    <div className="h-1 bg-zinc-800 rounded-full flex-1 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${value}%` }}
                        className="h-full bg-blue-500"
                      />
                    </div>
                    <span className="text-xs font-mono text-zinc-300">{value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Detailed Analysis Report */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            {!analysisReport && !isAnalyzing ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col items-center justify-center border border-white/5 rounded-3xl bg-zinc-900/20 p-12 text-center"
              >
                <div className="w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-zinc-600" />
                </div>
                <h3 className="text-xl font-semibold">Engine Standby</h3>
                <p className="text-zinc-500 mt-2 max-w-sm">
                  Upload a candidate profile and execute a scan to generate a zero-bias 10-section intelligence report.
                </p>
              </motion.div>
            ) : isAnalyzing ? (
              <motion.div 
                key="analyzing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center p-12"
              >
                <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-6" />
                <h3 className="text-2xl font-bold tracking-tight">Dynamic Context Discovery...</h3>
                <div className="mt-8 space-y-4 w-full max-w-md">
                  <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden">
                    <motion.div 
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="h-full w-1/2 bg-blue-600 blur-[2px]"
                    />
                  </div>
                  <div className="flex justify-between text-xs font-mono text-zinc-500 uppercase tracking-tighter">
                    <span>Extracting Metadata</span>
                    <span>Industry Mapping</span>
                    <span>Bias Correction</span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="results"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6 pb-12"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold tracking-tight">Intelligence Report</h2>
                    <p className="text-zinc-400 mt-1 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500" />
                      Dynamic Sector Identified: <span className="text-white font-medium">{analysisReport["1"]?.dynamic_industry || "Calculated Sector"}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-black text-blue-500">{analysisReport["8"]?.total_score || 0}<span className="text-sm text-zinc-600 ml-1">/100</span></div>
                    <div className="text-xs uppercase tracking-widest text-zinc-500 font-bold mt-1">Match Score</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-10 gap-4">
                  <div className="md:col-span-3 space-y-2">
                    {[1,2,3,4,5,6,7,8,9,10].map((num) => (
                      <button
                        key={num}
                        onClick={() => setActiveSection(num - 1)}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all border ${
                          activeSection === num - 1 
                          ? 'bg-blue-600/10 border-blue-500/50 text-blue-400' 
                          : 'bg-zinc-900/50 border-white/5 text-zinc-500 hover:text-zinc-300'
                        }`}
                      >
                        <SectionIcon id={num} />
                        <span className="text-sm font-medium">Section {num}</span>
                      </button>
                    ))}
                  </div>

                  <div className="md:col-span-7 bg-zinc-900/50 border border-white/5 rounded-3xl p-8 min-h-[500px] backdrop-blur-xl">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeSection}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-6"
                      >
                        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/5">
                          <div className="p-3 bg-blue-500/10 rounded-xl">
                            <SectionIcon id={activeSection + 1} />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold">
                              {Object.keys(analysisReport)[activeSection] || `Section ${activeSection + 1}`}
                            </h3>
                            <p className="text-sm text-zinc-500 italic">Extracted from local source file</p>
                          </div>
                        </div>

                        <div className="text-zinc-300 leading-relaxed font-sans prose prose-invert max-w-none">
                          {typeof analysisReport[String(activeSection + 1)] === 'object' ? (
                            <pre className="font-sans whitespace-pre-wrap text-sm text-zinc-300 bg-black/40 p-4 rounded-xl border border-white/5">
                              {JSON.stringify(analysisReport[String(activeSection + 1)], null, 2)}
                            </pre>
                          ) : (
                            <div dangerouslySetInnerHTML={{ __html: String(analysisReport[String(activeSection + 1)]).replace(/\\n/g, '<br/>') }} />
                          )}
                        </div>

                        {activeSection === 8 && (
                          <div className={`mt-8 p-6 rounded-2xl border flex items-center gap-4 ${
                            analysisReport["9"]?.status?.includes("HIRE") || analysisReport["9"]?.status?.includes("SELECTED")
                            ? "bg-green-500/10 border-green-500/30" 
                            : "bg-red-500/10 border-red-500/30"
                          }`}>
                            <div className="p-4 bg-black/20 rounded-full">
                              {(analysisReport["9"]?.status?.includes("HIRE") || analysisReport["9"]?.status?.includes("SELECTED")) ? <CheckCircle2 className="w-8 h-8 text-green-500" /> : <XCircle className="w-8 h-8 text-red-500" />}
                            </div>
                            <div>
                              <div className="text-sm font-bold uppercase tracking-widest text-zinc-400">Final Verdict</div>
                              <div className={`text-2xl font-black ${
                                (analysisReport["9"]?.status?.includes("HIRE") || analysisReport["9"]?.status?.includes("SELECTED")) 
                                ? "text-green-400" : "text-red-400"
                              }`}>
                                {analysisReport["9"]?.status}
                              </div>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {error && (
        <div className="fixed bottom-6 right-6 bg-red-600 text-white p-4 rounded-xl shadow-2xl flex items-center gap-3 border border-red-400/30 animate-in slide-in-from-bottom-5 z-50">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm font-bold">{error}</span>
          <button onClick={() => setError(null)} className="ml-auto text-white/50 hover:text-white"><XCircle className="w-5 h-5" /></button>
        </div>
      )}
    </div>
  );
};

export default Scanner;
