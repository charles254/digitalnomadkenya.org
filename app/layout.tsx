import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const BASE_URL = "https://digitalnomadkenya.org";

export const metadata: Metadata = {
  title: {
    default: "Digital Nomad Kenya | Kenya Digital Nomad Permit Automation",
    template: "%s | Digital Nomad Kenya",
  },
  description:
    "Automate your Kenya Digital Nomad Permit (Class N) with AI-powered document audits, relocation guides, and lifestyle ratings for 8 top locations.",
  metadataBase: new URL(BASE_URL),
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Digital Nomad Kenya",
    url: BASE_URL,
    title: "Digital Nomad Kenya | Kenya Digital Nomad Permit Automation",
    description:
      "Automate your Kenya Digital Nomad Permit with AI-powered audits. 8 top locations, 13+ nationalities, from $20.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Digital Nomad Kenya" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Nomad Kenya | Permit Automation",
    description: "Automate your Kenya Digital Nomad Permit with AI.",
  },
  verification: {
    google: "JPNe0xFvKkZan6QHESSVax3kk9Tf6I4FTmYjZyUBPAY",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-950 text-white">
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />

        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Digital Nomad Kenya",
            url: BASE_URL,
            description: "AI-powered Kenya Digital Nomad Permit automation service.",
            contactPoint: { "@type": "ContactPoint", contactType: "customer service", availableLanguage: ["English"] },
            sameAs: ["https://twitter.com/digitalnomadke", "https://linkedin.com/company/digitalnomadkenya"],
          }}
        />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Digital Nomad Kenya",
            alternateName: ["DNK", "VizaBot Kenya"],
            url: BASE_URL,
          }}
        />

        <Script src="https://www.googletagmanager.com/gtag/js?id=G-ZPYRLFBHEP" strategy="afterInteractive" />
        <Script id="ga" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-ZPYRLFBHEP');
        `}</Script>
      </body>
    </html>
  );
}
