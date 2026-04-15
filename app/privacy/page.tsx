import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  robots: { index: false, follow: true },
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 prose prose-invert prose-slate">
      <h1>Privacy Policy</h1>
      <p>Last updated: April 2026</p>
      <h2>Information We Collect</h2>
      <p>Digital Nomad Kenya collects information you provide during the eligibility audit (nationality, income range, passport validity) and contact form submissions (name, email). We do not collect payment information directly — payments are processed through secure third-party providers.</p>
      <h2>How We Use Your Information</h2>
      <p>We use your information to provide eligibility assessments, generate application dossiers, and communicate with you about your permit process. We do not sell your data to third parties.</p>
      <h2>Data Retention</h2>
      <p>Audit data is retained for 12 months. You may request deletion at any time by contacting us.</p>
      <h2>Cookies</h2>
      <p>We use Google Analytics to understand site usage. You can opt out using browser privacy settings.</p>
      <h2>Contact</h2>
      <p>For privacy inquiries: audit@vizabot.ke</p>
    </div>
  );
}
