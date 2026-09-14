import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import MobileShell from "@/components/MobileShell";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import "../globals.css";

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ayodhya Anubhav | Guide Guru Global",
  description:
    "Fourteen journeys into the many layers of Ayodhya. Curated experiences with certified storyteller guides, beginning and ending at Evoke Rambagh.",
  openGraph: {
    title: "Ayodhya Anubhav | Guide Guru Global",
    description: "Fourteen journeys into the many layers of Ayodhya.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#4A2E1D",
};

export default function SiteRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="font-sans antialiased">
        <LanguageProvider>
          <MobileShell>{children}</MobileShell>
        </LanguageProvider>
      </body>
    </html>
  );
}
