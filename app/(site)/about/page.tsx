import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutHero from "@/components/AboutHero";
import AboutStory from "@/components/AboutStory";
import AboutQRCode from "@/components/AboutQRCode";
import AboutCTA from "@/components/AboutCTA";
import { getSiteSettings } from "@/services/settingsService";

export const metadata: Metadata = {
  title: "About Us | Ayodhya Anubhav",
  description:
    "We are storytellers, experience curators and your local hosts in Ayodhya — meet the team behind Guide Guru Global.",
};

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <Header />
      <main className="pb-8">
        <AboutHero />
        <AboutStory />
        <AboutQRCode />
        <AboutCTA />
      </main>
      <Footer settings={settings} />
    </>
  );
}
