import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  robots: { index: false, follow: true },
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 prose prose-invert prose-slate">
      <h1>Terms of Service</h1>
      <p>Last updated: April 2026</p>
      <h2>Service Description</h2>
      <p>Digital Nomad Kenya provides AI-powered eligibility assessments and document preparation for Kenya&apos;s Class N Digital Nomad Permit. We are not a law firm and do not provide legal advice.</p>
      <h2>Pricing</h2>
      <p>The Eligibility Audit is free. Application Dossier Packs are $20 per dossier. VIP Fixer Services are $250 per engagement. Prices are subject to change.</p>
      <h2>Limitations</h2>
      <p>We do not guarantee permit approval. The Kenyan immigration authority (eFNS/e-Citizen portal) makes all final decisions. Our service assists with document preparation and compliance checking only.</p>
      <h2>Refunds</h2>
      <p>Dossier Packs are non-refundable once generated. VIP Fixer services may be refunded within 48 hours of booking if the service has not commenced.</p>
      <h2>Contact</h2>
      <p>For terms inquiries: info@digitalnomadkenya.org</p>
    </div>
  );
}
