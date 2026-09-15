import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";
import { getExperienceBySlug } from "@/services/experienceService";
import { getSiteSettings } from "@/services/settingsService";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Same no-store/generateStaticParams conflict as experiences/[slug] — see the comment there. */
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const experience = await getExperienceBySlug(slug);
  return {
    title: experience ? `Book ${experience.title} | Ayodhya Anubhav` : "Book",
  };
}

export default async function BookPage({ params }: PageProps) {
  const { slug } = await params;
  const [experience, settings] = await Promise.all([
    getExperienceBySlug(slug),
    getSiteSettings(),
  ]);

  if (!experience) notFound();

  return (
    <>
      <main className="px-4 pb-6 tab:px-8 tab:pb-10 tabLg:px-10 tabLg:pb-14">
        <BookingForm experience={experience} brandName={settings.general.websiteName} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
