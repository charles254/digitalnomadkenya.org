import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Wifi, DollarSign, Users, ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import data from "@/lib/data/pseo_data.json";

type Props = { params: Promise<{ location: string }> };

export async function generateStaticParams() {
  return data.locations.map((loc) => ({ location: loc.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { location } = await params;
  const loc = data.locations.find((l) => l.id === location);
  if (!loc) return { title: "Not Found" };

  return {
    title: `Digital Nomad Guide to ${loc.name}, Kenya`,
    description: `Everything you need to know about living in ${loc.name} as a digital nomad. Internet: ${loc.internet}, Rent: ${loc.rent}, Vibe: ${loc.vibe}.`,
    alternates: { canonical: `/immigration-guide/${location}` },
    openGraph: {
      title: `Digital Nomad Guide to ${loc.name}`,
      description: `${loc.name} guide: ${loc.internet}, ${loc.rent}, ${loc.vibe}.`,
      url: `/immigration-guide/${location}`,
    },
  };
}

export default async function LocationPage({ params }: Props) {
  const { location } = await params;
  const loc = data.locations.find((l) => l.id === location);
  if (!loc) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
        <Link href="/" className="hover:text-white">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/immigration-guide" className="hover:text-white">Immigration Guide</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-white">{loc.name}</span>
      </nav>

      <h1 className="text-4xl font-extrabold mb-4">{loc.name} — Digital Nomad Guide</h1>
      <p className="text-lg text-slate-400 mb-8">{loc.description_long}</p>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="p-4 bg-slate-900 rounded-xl text-center">
          <Wifi className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
          <div className="text-sm font-bold">{loc.internet}</div>
          <div className="text-xs text-slate-500">Internet</div>
        </div>
        <div className="p-4 bg-slate-900 rounded-xl text-center">
          <DollarSign className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
          <div className="text-sm font-bold">{loc.rent}</div>
          <div className="text-xs text-slate-500">Monthly Rent</div>
        </div>
        <div className="p-4 bg-slate-900 rounded-xl text-center">
          <MapPin className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
          <div className="text-sm font-bold">{loc.vibe}</div>
          <div className="text-xs text-slate-500">Vibe</div>
        </div>
        <div className="p-4 bg-slate-900 rounded-xl text-center">
          <Users className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
          <div className="text-sm font-bold">{loc.region}</div>
          <div className="text-xs text-slate-500">Region</div>
        </div>
      </div>

      {/* Highlights */}
      {loc.highlights && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Why {loc.name}?</h2>
          <p className="text-slate-300">{loc.highlights}</p>
        </section>
      )}

      {/* Nationality Guides */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Nationality-Specific Guides</h2>
        <div className="space-y-4">
          {data.nationalities.slice(0, 6).map((nat) => (
            <details key={nat.id} className="group p-4 bg-slate-900 rounded-xl border border-slate-800">
              <summary className="flex justify-between items-center cursor-pointer font-semibold">
                <span>{nat.name} Nationals</span>
                <ChevronRight className="w-4 h-4 transition-transform group-open:rotate-90" />
              </summary>
              <div className="mt-4 space-y-3 text-sm text-slate-400">
                <p><strong className="text-white">Legal Note:</strong> {nat.legal_gotcha}</p>
                <p><strong className="text-white">Embassy:</strong> {nat.embassy}</p>
                <p><strong className="text-white">Processing:</strong> ~{nat.avg_processing_weeks} weeks</p>
                <p><strong className="text-white">Community:</strong> {nat.community_estimate}</p>
                {nat.direct_flights.length > 0 && (
                  <p><strong className="text-white">Direct Flights:</strong> {nat.direct_flights.join(", ")}</p>
                )}
              </div>
            </details>
          ))}
        </div>
        <p className="text-sm text-slate-500 mt-4">{data.nationalities.length - 6}+ more nationalities covered. <Link href="/audit" className="text-emerald-500 hover:underline">Check your eligibility</Link>.</p>
      </section>

      {/* CTA */}
      <div className="p-8 bg-gradient-to-r from-emerald-900/30 to-slate-900 rounded-xl text-center">
        <h2 className="text-2xl font-bold mb-3">Ready to Move to {loc.name}?</h2>
        <p className="text-slate-400 mb-6">Check your eligibility for a Kenya Digital Nomad Permit in 60 seconds.</p>
        <Link href="/audit" className="px-8 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700">Free Eligibility Audit</Link>
      </div>

      {/* JSON-LD */}
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://digitalnomadkenya.org" },
          { "@type": "ListItem", position: 2, name: "Immigration Guide", item: "https://digitalnomadkenya.org/immigration-guide" },
          { "@type": "ListItem", position: 3, name: loc.name },
        ],
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Place",
        name: loc.name,
        address: { "@type": "PostalAddress", addressRegion: loc.region, addressCountry: "KE" },
        description: loc.description_long,
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: data.nationalities.slice(0, 3).map((nat) => ({
          "@type": "Question",
          name: `What do ${nat.plural} need for a Kenya Digital Nomad Permit in ${loc.name}?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `${nat.legal_gotcha} Processing takes approximately ${nat.avg_processing_weeks} weeks. ${nat.community_estimate}.`,
          },
        })),
      }} />
    </div>
  );
}
