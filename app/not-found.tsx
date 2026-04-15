import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <span className="text-8xl font-extrabold text-slate-800">404</span>
      <h1 className="mt-4 text-3xl font-bold">Page Not Found</h1>
      <p className="mt-3 text-lg text-slate-400 max-w-md">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
      <div className="mt-8 flex gap-4">
        <Link href="/" className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors">Go Home</Link>
        <Link href="/immigration-guide" className="px-6 py-3 border border-slate-600 text-slate-300 rounded-xl hover:bg-slate-800 transition-colors">Browse Guides</Link>
      </div>
    </div>
  );
}
