import Link from "next/link";
import { MapPin, Wifi, DollarSign } from "lucide-react";
import { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import data from "@/lib/data/pseo_data.json";

export const metadata: Metadata = {
  title: "Kenya Immigration Guide for Digital Nomads",
  description: "Complete immigration guide for digital nomads in Kenya. 8 top locations with internet speeds, rent costs, and visa requirements for 13+ nationalities.",
  alternates: { canonical: "/immigration-guide" },
  openGraph: {
    title: "Kenya Immigration Guide for Digital Nomads",
    description: "8 top locations with detailed guides for 13+ nationalities.",
    url: "/immigration-guide",
  },
};

export default function ImmigrationGuidePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold mb-4">Kenya Digital Nomad Immigration Guide</h1>
      <p className="text-lg text-slate-400 mb-12 max-w-3xl">
        Explore {data.locations.length} of Kenya&apos;s best locations for digital nomads. Each guide includes internet speeds, rent costs, coworking spaces, and nationality-specific visa requirements.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.locations.map((loc) => (
          <Link key={loc.id} href={`/immigration-guide/${loc.id}`} className="group p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-600/50 transition-all">
            <h2 className="text-xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">{loc.name}</h2>
            <p className="text-sm text-slate-500 mb-4">{loc.region}</p>
            <div className="space-y-2 text-sm text-slate-400">
              <div className="flex items-center gap-2"><Wifi className="w-4 h-4 text-emerald-500" /> {loc.internet}</div>
              <div className="flex items-center gap-2"><DollarSign className="w-4 h-4 text-emerald-500" /> {loc.rent}</div>
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-emerald-500" /> {loc.vibe}</div>
            </div>
          </Link>
        ))}
      </div>

      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Kenya Digital Nomad Immigration Guide",
        url: "https://digitalnomadkenya.org/immigration-guide",
        description: "Complete immigration guide for digital nomads in Kenya.",
        numberOfItems: data.locations.length,
      }} />
    </div>
  );
}
