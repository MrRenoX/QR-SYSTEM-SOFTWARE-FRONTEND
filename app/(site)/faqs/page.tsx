import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQHero from "@/components/FAQHero";
import FAQAccordion from "@/components/FAQAccordion";
import FAQContactCTA from "@/components/FAQContactCTA";
import { getFAQGroups } from "@/services/faqService";
import { getSiteSettings } from "@/services/settingsService";

export const metadata: Metadata = {
  title: "FAQs | Ayodhya Anubhav",
  description:
    "Answers to common questions about booking, experiences, payments and what to expect on the day, from Guide Guru Global.",
};

export default async function FAQsPage() {
  const [faqGroups, settings] = await Promise.all([
    getFAQGroups(),
    getSiteSettings(),
  ]);

  return (
    <>
      <Header />
      <main className="pb-8">
        <FAQHero />
        <FAQAccordion faqGroups={faqGroups} />
        <FAQContactCTA />
      </main>
      <Footer settings={settings} />
    </>
  );
}
