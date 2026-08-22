import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

/**
 * Independent root layout for the Super Admin panel. This is a genuinely
 * separate Next.js root layout (its own <html>/<body>) from the public
 * site's app/(site)/layout.tsx — the admin panel deliberately does NOT go
 * through MobileShell/VerificationGate, since those are QR-guest-website
 * concerns. This is what makes the dashboard full desktop width instead of
 * the public site's centered 390px phone shell.
 */
const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Super Admin | Anubhav Experience Ayodhya",
  description: "Super Admin panel for Anubhav Experience Ayodhya.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={body.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
