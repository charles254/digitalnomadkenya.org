"use client";
import Link from "next/link";
import { useState } from "react";
import { Globe, Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "/", label: "Home" },
    { href: "/immigration-guide", label: "Immigration Guide" },
    { href: "/audit", label: "Free Audit" },
    { href: "/about", label: "About" },
  ];

  return (
    <header className="fixed top-0 z-50 w-full bg-slate-950/80 backdrop-blur-lg border-b border-slate-800">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 h-16">
        <Link href="/" className="flex items-center gap-2 text-white font-bold text-xl">
          <Globe className="w-6 h-6 text-emerald-500" />
          <span>Digital Nomad <span className="text-emerald-500">Kenya</span></span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-slate-300 hover:text-white transition-colors">
              {l.label}
            </Link>
          ))}
          <Link href="/audit" className="px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-colors">
            Check Eligibility
          </Link>
        </div>
        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>
      {open && (
        <div className="md:hidden bg-slate-950 border-t border-slate-800 px-4 py-4 space-y-3">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block text-slate-300 hover:text-white">
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
