import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PrivacyPolicy from "@/components/PrivacyPolicy";
import { getSiteSettings } from "@/services/settingsService";

export const metadata: Metadata = {
  title: "Privacy Policy | Ayodhya Anubhav",
  description:
    "What information Guide Guru Global collects when you browse, book, or message us through Ayodhya Anubhav, and how we use it.",
};

export default async function PrivacyPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <Header />
      <main className="pb-8">
        <PrivacyPolicy />
      </main>
      <Footer settings={settings} />
    </>
  );
}
