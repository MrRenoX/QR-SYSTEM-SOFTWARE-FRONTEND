import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RefundPolicy from "@/components/RefundPolicy";
import { getSiteSettings } from "@/services/settingsService";

export const metadata: Metadata = {
  title: "Cancellation & Refund Policy | Ayodhya Anubhav",
  description:
    "Cancellation, no-show, rescheduling and refund terms for experiences booked through Ayodhya Anubhav by Guide Guru Global.",
};

export default async function RefundPolicyPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <Header />
      <main className="pb-8">
        <RefundPolicy />
      </main>
      <Footer settings={settings} />
    </>
  );
}
