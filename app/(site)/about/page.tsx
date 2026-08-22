import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutHero from "@/components/AboutHero";
import AboutStory from "@/components/AboutStory";
import AboutCTA from "@/components/AboutCTA";
import { getSiteSettings } from "@/services/settingsService";

export const metadata: Metadata = {
  title: "About Ayodhya Anubhav | Ayodhya Anubhav",
  description: "Sixteen journeys into the many layers of Ayodhya, powered by Guide Guru Global.",
};

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <Header />
      <main className="pb-8">
        <AboutHero />
        <AboutStory />
        <AboutCTA />
      </main>
      <Footer settings={settings} />
    </>
  );
}
