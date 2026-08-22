import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactHero from "@/components/ContactHero";
import ContactChannels from "@/components/ContactChannels";
import ContactForm from "@/components/ContactForm";
import { getSiteSettings } from "@/services/settingsService";

export const metadata: Metadata = {
  title: "Get in Touch | Ayodhya Anubhav",
  description:
    "Talk to the Guide Guru Global Experience Desk directly — WhatsApp, call, email, or send a message and we'll get back to you.",
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <Header />
      <main className="pb-8">
        <ContactHero />
        <ContactChannels />
        <ContactForm />
      </main>
      <Footer settings={settings} />
    </>
  );
}
