import Link from "next/link";
import { Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-3">
            <Globe className="w-5 h-5 text-emerald-500" />
            <span className="text-white font-bold">Digital Nomad Kenya</span>
          </div>
          <p className="text-sm">Automating Kenya&apos;s Digital Nomad Permit process with AI-powered document audits.</p>
        </div>
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">Guides</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/immigration-guide" className="hover:text-white transition-colors">Immigration Guide</Link></li>
            <li><Link href="/guide/cost-of-living" className="hover:text-white transition-colors">Cost of Living</Link></li>
            <li><Link href="/guide/internet-speed" className="hover:text-white transition-colors">Internet & Fiber</Link></li>
            <li><Link href="/guide/permit-requirements" className="hover:text-white transition-colors">Permit Requirements</Link></li>
            <li><Link href="/guide/safety-for-expats" className="hover:text-white transition-colors">Safety Guide</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">Locations</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/immigration-guide/diani" className="hover:text-white transition-colors">Diani Beach</Link></li>
            <li><Link href="/immigration-guide/kilimani" className="hover:text-white transition-colors">Kilimani, Nairobi</Link></li>
            <li><Link href="/immigration-guide/lamu" className="hover:text-white transition-colors">Lamu Island</Link></li>
            <li><Link href="/immigration-guide/nanyuki" className="hover:text-white transition-colors">Nanyuki</Link></li>
            <li><Link href="/immigration-guide/watamu" className="hover:text-white transition-colors">Watamu</Link></li>
            <li><Link href="/immigration-guide/kisumu" className="hover:text-white transition-colors">Kisumu</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        &copy; {new Date().getFullYear()} Digital Nomad Kenya. All rights reserved.
      </div>
    </footer>
  );
}
