import Providers from "./providers";
import "./globals.css";

import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Schibsted_Grotesk, Geist, Corinthia } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Settings } from "@/components/settings";

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
    "Tech Lead & Solutions Architect at Nanostuffs Technologies, Pune. Building AI-first systems for enterprise. Writing about full-stack development and technical leadership in India.",
  openGraph: {
    title: "Hrushabh Kale",
    description:
      "Tech Lead & Solutions Architect at Nanostuffs Technologies, Pune. Building AI-first systems for enterprise.",
    url: siteUrl,
    siteName: "Hrushabh Kale",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hrushabh Kale",
    description:
      "Tech Lead & Solutions Architect at Nanostuffs Technologies, Pune. Building AI-first systems for enterprise.",
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
        corinthia.variable,
        "font-sans antialiased",
      )}
      suppressHydrationWarning
    >
      <body className={cn("font-display bg-background text-foreground")}>
        <Providers>
          <Settings />
          <Navbar />
          <main>{children}</main>
          <Footer />
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
