import Link from "next/link";
import { Shield, FileCheck, UserCheck, ArrowRight, Star, Globe, Zap } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import data from "@/lib/data/pseo_data.json";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 md:py-32 px-4 text-center bg-gradient-to-b from-slate-950 via-emerald-950/20 to-slate-950">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block px-3 py-1 text-xs font-semibold bg-emerald-600/20 text-emerald-400 border border-emerald-600/30 rounded-full mb-6">
            AI-Powered Permit Automation
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Automate Your Kenya<br />
            <span className="text-emerald-500">Digital Nomad Permit</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-8">
            Get your Class N permit faster with AI document audits, pre-built dossiers, and nationality-specific checklists for {data.nationalities.length}+ countries.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/audit" className="px-8 py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 text-lg">
              Free Eligibility Check <ArrowRight className="inline w-5 h-5 ml-1" />
            </Link>
            <Link href="/immigration-guide" className="px-8 py-4 border border-slate-600 text-slate-300 font-semibold rounded-xl hover:bg-slate-800 transition-all text-lg">
              Browse Guides
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-slate-900/50">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "13+", label: "Nationalities" },
            { value: "8", label: "Top Locations" },
            { value: "60s", label: "Free Audit" },
            { value: "$20", label: "Application Pack" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-bold text-emerald-500">{s.value}</div>
              <div className="text-sm text-slate-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How We Help You Get Your Permit</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: "AI Document Audit", desc: "Our AI checks your passport validity, bank statement stamps, and income proof in 60 seconds.", price: "Free" },
              { icon: FileCheck, title: "Application Dossier", desc: "Pre-built dossier with cover letter, checklist, and e-Citizen walkthrough tailored to your nationality.", price: "$20" },
              { icon: UserCheck, title: "VIP Fixer Service", desc: "On-ground concierge at JKIA. Airport pickup, Nyayo House escort, SIM card, and apartment viewing.", price: "$250" },
            ].map((f) => (
              <div key={f.title} className="p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-600/50 transition-all">
                <f.icon className="w-10 h-10 text-emerald-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm mb-4">{f.desc}</p>
                <span className="text-emerald-500 font-bold">{f.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-20 px-4 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Top Locations for Digital Nomads</h2>
          <p className="text-center text-slate-400 mb-12">Curated guides for {data.locations.length} of Kenya&apos;s best spots</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.locations.map((loc) => (
              <Link key={loc.id} href={`/immigration-guide/${loc.id}`} className="group p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-600/50 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <Globe className="w-5 h-5 text-emerald-500" />
                  <h3 className="font-bold group-hover:text-emerald-400 transition-colors">{loc.name}</h3>
                </div>
                <p className="text-xs text-slate-500 mb-2">{loc.region}</p>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>{loc.internet}</span>
                  <span>{loc.rent}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What Nomads Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {data.nationalities.slice(0, 3).map((nat) => (
              <div key={nat.id} className="p-6 rounded-xl bg-slate-900 border border-slate-800">
                <div className="flex gap-1 mb-3">{[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}</div>
                <p className="text-sm text-slate-300 mb-4">&quot;{nat.testimonial.quote}&quot;</p>
                <div className="text-xs text-slate-500">
                  <span className="text-white font-semibold">{nat.testimonial.name}</span> &middot; {nat.testimonial.location}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 text-center bg-gradient-to-b from-slate-950 to-emerald-950/20">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Kenya Journey?</h2>
        <p className="text-slate-400 mb-8 max-w-xl mx-auto">Check your eligibility in 60 seconds. Free, no signup required.</p>
        <Link href="/audit" className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all text-lg">
          <Zap className="w-5 h-5" /> Free Eligibility Audit
        </Link>
      </section>

      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Kenya Digital Nomad Permit Automation",
        provider: { "@type": "Organization", name: "Digital Nomad Kenya" },
        serviceType: "Immigration Automation",
        areaServed: { "@type": "Country", name: "Kenya" },
        offers: [
          { "@type": "Offer", name: "Free Eligibility Audit", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" },
          { "@type": "Offer", name: "Application Dossier Pack", price: "20", priceCurrency: "USD", availability: "https://schema.org/InStock" },
          { "@type": "Offer", name: "VIP Fixer Service", price: "250", priceCurrency: "USD", availability: "https://schema.org/InStock" },
        ],
        aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "127", bestRating: "5" },
        review: data.nationalities.slice(0, 3).map((nat) => ({
          "@type": "Review",
          author: { "@type": "Person", name: nat.testimonial.name },
          reviewBody: nat.testimonial.quote,
          reviewRating: { "@type": "Rating", ratingValue: 5, bestRating: "5" },
        })),
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "How much does a Kenya Digital Nomad Permit cost?", acceptedAnswer: { "@type": "Answer", text: "The government fee is $250 for a 12-month Class N permit. Our automation starts at $20 for a complete dossier." } },
          { "@type": "Question", name: "How long does the permit process take?", acceptedAnswer: { "@type": "Answer", text: "Processing typically takes 3-6 weeks after e-Citizen submission. Our AI audit takes 60 seconds." } },
          { "@type": "Question", name: "What income do I need?", acceptedAnswer: { "@type": "Answer", text: "Kenya requires proof of $24,000/year ($2,000/month) in remote income." } },
        ],
      }} />
    </>
  );
}
