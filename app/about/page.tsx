import { Metadata } from "next";
import { Globe, Shield, Users, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "About Digital Nomad Kenya",
  description: "Digital Nomad Kenya automates the Class N permit process with AI-powered document audits and nationality-specific application dossiers.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About Digital Nomad Kenya", description: "AI-powered Kenya permit automation.", url: "/about" },
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold mb-6">About <span className="text-emerald-500">Digital Nomad Kenya</span></h1>
      <p className="text-lg text-slate-400 mb-8">We automate the tedious parts of Kenya&apos;s Digital Nomad Permit (Class N) application so you can focus on what matters — working and living in one of Africa&apos;s most exciting destinations.</p>

      <div className="grid grid-cols-2 gap-6 mb-12">
        {[
          { icon: Shield, label: "AI Document Audit", desc: "Passport, bank statements, income proof checked in 60 seconds" },
          { icon: Users, label: "13+ Nationalities", desc: "Country-specific checklists and legal gotchas" },
          { icon: Globe, label: "8 Locations", desc: "Detailed guides for Kenya's best digital nomad spots" },
          { icon: Zap, label: "Instant Dossier", desc: "Pre-built application pack with cover letter" },
        ].map((s) => (
          <div key={s.label} className="p-5 bg-slate-900 rounded-xl border border-slate-800">
            <s.icon className="w-8 h-8 text-emerald-500 mb-3" />
            <h3 className="font-bold mb-1">{s.label}</h3>
            <p className="text-sm text-slate-400">{s.desc}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
      <p className="text-slate-400 mb-6">Kenya launched its Digital Nomad Visa in 2022, but the application process remains opaque and frustrating. We built Digital Nomad Kenya to bridge the gap between intention and action — making it possible for remote workers to relocate to Kenya with confidence.</p>
      <p className="text-slate-400">Whether you&apos;re exploring Diani&apos;s beaches, Nanyuki&apos;s highlands, or Nairobi&apos;s tech scene, we handle the paperwork so you can enjoy the journey.</p>
    </div>
  );
}
