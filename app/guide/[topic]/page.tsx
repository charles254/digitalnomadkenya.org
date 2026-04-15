import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import data from "@/lib/data/pseo_data.json";

type Props = { params: Promise<{ topic: string }> };

export async function generateStaticParams() {
  return data.topics.map((t) => ({ topic: t.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topic } = await params;
  const t = data.topics.find((x) => x.id === topic);
  if (!t) return { title: "Not Found" };

  return {
    title: t.title,
    description: t.desc,
    alternates: { canonical: `/guide/${topic}` },
    openGraph: { title: t.title, description: t.desc, url: `/guide/${topic}` },
  };
}

export default async function TopicPage({ params }: Props) {
  const { topic } = await params;
  const t = data.topics.find((x) => x.id === topic);
  if (!t) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
        <Link href="/" className="hover:text-white">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/immigration-guide" className="hover:text-white">Guides</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-white">{t.keyword}</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-extrabold mb-6">{t.title}</h1>
      <p className="text-lg text-slate-400 mb-8">{t.desc}</p>

      {/* Pro Tips */}
      {t.proTips && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Pro Tips</h2>
          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-slate-300 whitespace-pre-line">
            {t.proTips}
          </div>
        </section>
      )}

      {/* FAQs */}
      {t.faqs && t.faqs.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {t.faqs.map((faq: { q: string; a: string }, i: number) => (
              <details key={i} className="group p-4 bg-slate-900 rounded-xl border border-slate-800">
                <summary className="flex justify-between items-center cursor-pointer font-semibold">
                  <span>{faq.q}</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-sm text-slate-400">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      <div className="p-6 bg-gradient-to-r from-emerald-900/30 to-slate-900 rounded-xl text-center">
        <h2 className="text-xl font-bold mb-3">Need Personalized Guidance?</h2>
        <Link href="/audit" className="px-6 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700">Free Eligibility Audit</Link>
      </div>

      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://digitalnomadkenya.org" },
          { "@type": "ListItem", position: 2, name: "Guides", item: "https://digitalnomadkenya.org/immigration-guide" },
          { "@type": "ListItem", position: 3, name: t.keyword },
        ],
      }} />
      {t.faqs && t.faqs.length > 0 && (
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: t.faqs.map((faq: { q: string; a: string }) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: { "@type": "Answer", text: faq.a },
          })),
        }} />
      )}
    </div>
  );
}
