import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TermsConditions from "@/components/TermsConditions";
import { getSiteSettings } from "@/services/settingsService";

export const metadata: Metadata = {
  title: "Terms & Conditions | Ayodhya Anubhav",
  description:
    "The terms that govern booking and using Ayodhya Anubhav's guided experiences through Guide Guru Global.",
};

export default async function TermsPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <Header />
      <main className="pb-8">
        <TermsConditions />
      </main>
      <Footer settings={settings} />
    </>
  );
}
