import Providers from "./providers";
import WebsiteSchema from "@/components/seo/WebsiteSchema";
import "./globals.css";

import type { Metadata } from "next";
import Script from "next/script";
import {
  Inter,
  Schibsted_Grotesk,
  Geist,
  Pacifico,
  Corinthia,
} from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Settings } from "@/components/settings";
import { PageTransition } from "@/components/page-transition";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const analyticsDomain = process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN;
const analyticsScriptUrl = process.env.NEXT_PUBLIC_ANALYTICS_SCRIPT_URL;

const siteUrl = "https://hrushabhkale.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Hrushabh Kale",
    template: "%s — Hrushabh Kale",
  },
  description:
    "Tech Lead & Solutions Architect at Nanostuffs Technologies, Pune. " +
    "Building AI-first systems for enterprise — LangGraph, WhatsApp automation, " +
    "React Native. Writing about full-stack development and technical leadership in India.",
  keywords: [
    "Hrushabh Kale",
    "Tech Lead Pune",
    "Solutions Architect Pune",
    "Full Stack Developer Pune",
    "LangGraph developer",
    "React Native developer India",
    "WhatsApp automation developer",
    "Salesforce Heroku architect",
    "AI engineer Pune",
    "Nanostuffs Technologies",
  ],
  authors: [{ name: "Hrushabh Kale", url: siteUrl }],
  creator: "Hrushabh Kale",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Hrushabh Kale",
    title: "Hrushabh Kale — Tech Lead & Solutions Architect",
    description:
      "Building AI-first systems for enterprise at Nanostuffs Technologies, Pune. " +
      "LangGraph, WhatsApp automation, React Native.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hrushabh Kale — Tech Lead & Solutions Architect",
    description:
      "Building AI-first systems for enterprise at Nanostuffs Technologies, Pune.",
    creator: "@hrushabh__k",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  // Add your Google Search Console verification code here when you have it:
  verification: {
    google: 'google-site-verification=I1WiAeHDYlfpyb70yq_s1NXqIxP2slB_CAZc_VfrixI',
  },
};

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

const schibstedGrotesk = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-schibsted-grotesk",
});

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
});

const corinthia = Corinthia({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-corinthia",
});

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={cn(
        inter.variable,
        schibstedGrotesk.variable,
        geist.variable,
        GeistSans.variable,
        pacifico.variable,
        corinthia.variable,
        "font-sans antialiased",
      )}
      suppressHydrationWarning
    >
      <body className={cn("font-display bg-background text-foreground")}>
        <WebsiteSchema />
        <Providers>
          <Settings />
          <div className="blueprint-wrapper">
            <Navbar />
            <main>
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
          </div>
        </Providers>
        {analyticsDomain && analyticsScriptUrl ? (
          <Script
            src={analyticsScriptUrl}
            data-domain={analyticsDomain}
            strategy="afterInteractive"
          />
        ) : null}
      </body>
    </html>
  );
}
