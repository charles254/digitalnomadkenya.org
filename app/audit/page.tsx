"use client";
import { useState } from "react";
import { Shield, CheckCircle, XCircle, ArrowRight } from "lucide-react";

export default function AuditPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ nationality: "", income: "", passport: "" });
  const [result, setResult] = useState<null | "eligible" | "ineligible">(null);

  const handleSubmit = () => {
    const incomeNum = parseInt(answers.income);
    setResult(incomeNum >= 2000 && answers.passport === "yes" ? "eligible" : "ineligible");
    setStep(3);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <Shield className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
        <h1 className="text-3xl md:text-4xl font-extrabold mb-3">Free Eligibility Audit</h1>
        <p className="text-slate-400">Check if you qualify for Kenya&apos;s Digital Nomad Permit (Class N) in 60 seconds.</p>
      </div>

      <div className="p-8 bg-slate-900 rounded-2xl border border-slate-800">
        {step === 0 && (
          <div className="space-y-4">
            <label className="block text-sm font-semibold mb-2">What is your nationality?</label>
            <input type="text" placeholder="e.g., American, British, German" value={answers.nationality} onChange={(e) => setAnswers({ ...answers, nationality: e.target.value })} className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none" />
            <button onClick={() => setStep(1)} disabled={!answers.nationality} className="w-full py-3 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
              Next <ArrowRight className="inline w-4 h-4 ml-1" />
            </button>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <label className="block text-sm font-semibold mb-2">Monthly remote income (USD)?</label>
            <input type="number" placeholder="e.g., 3000" value={answers.income} onChange={(e) => setAnswers({ ...answers, income: e.target.value })} className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:ring-2 focus:ring-emerald-500 outline-none" />
            <button onClick={() => setStep(2)} disabled={!answers.income} className="w-full py-3 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 disabled:opacity-50 transition-all">
              Next <ArrowRight className="inline w-4 h-4 ml-1" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <label className="block text-sm font-semibold mb-2">Is your passport valid for 12+ months?</label>
            <div className="flex gap-4">
              <button onClick={() => { setAnswers({ ...answers, passport: "yes" }); }} className={`flex-1 py-3 rounded-lg font-bold border transition-all ${answers.passport === "yes" ? "bg-emerald-600 border-emerald-600 text-white" : "bg-slate-800 border-slate-700 text-slate-300 hover:border-emerald-600"}`}>Yes</button>
              <button onClick={() => { setAnswers({ ...answers, passport: "no" }); }} className={`flex-1 py-3 rounded-lg font-bold border transition-all ${answers.passport === "no" ? "bg-red-600 border-red-600 text-white" : "bg-slate-800 border-slate-700 text-slate-300 hover:border-red-600"}`}>No</button>
            </div>
            {answers.passport && (
              <button onClick={handleSubmit} className="w-full py-3 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition-all">
                Check Eligibility
              </button>
            )}
          </div>
        )}

        {step === 3 && result === "eligible" && (
          <div className="text-center space-y-4">
            <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto" />
            <h2 className="text-2xl font-bold text-emerald-400">You&apos;re Likely Eligible!</h2>
            <p className="text-slate-400">Based on your answers, you meet the basic requirements for Kenya&apos;s Class N Digital Nomad Permit.</p>
            <p className="text-sm text-slate-500">Next step: Get your full Application Dossier for $20.</p>
            <button onClick={() => { setStep(0); setResult(null); setAnswers({ nationality: "", income: "", passport: "" }); }} className="px-6 py-2 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-800 text-sm">Start Over</button>
          </div>
        )}

        {step === 3 && result === "ineligible" && (
          <div className="text-center space-y-4">
            <XCircle className="w-16 h-16 text-red-500 mx-auto" />
            <h2 className="text-2xl font-bold text-red-400">Not Quite Eligible</h2>
            <p className="text-slate-400">You may not meet the minimum requirements. The Class N permit requires $2,000+/month income and 12+ months passport validity.</p>
            <button onClick={() => { setStep(0); setResult(null); setAnswers({ nationality: "", income: "", passport: "" }); }} className="px-6 py-2 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-800 text-sm">Try Again</button>
          </div>
        )}
      </div>
    </div>
  );
}
