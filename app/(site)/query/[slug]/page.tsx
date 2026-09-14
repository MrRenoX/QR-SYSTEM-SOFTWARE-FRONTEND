import type { Metadata } from "next";
import { notFound } from "next/navigation";
import QueryPageForm from "@/components/QueryPageForm";
import Footer from "@/components/Footer";
import { getExperienceBySlug } from "@/services/experienceService";
import { getSiteSettings } from "@/services/settingsService";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Same no-store/generateStaticParams conflict as experiences/[slug] and book/[slug] — see the comment there. */
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const experience = await getExperienceBySlug(slug);
  return {
    title: experience ? `Raise a query — ${experience.title} | Ayodhya Anubhav` : "Raise a query",
  };
}

export default async function QueryPage({ params }: PageProps) {
  const { slug } = await params;
  const [experience, settings] = await Promise.all([
    getExperienceBySlug(slug),
    getSiteSettings(),
  ]);

  if (!experience) notFound();

  return (
    <>
      <main className="px-4 pb-6 tab:px-8 tab:pb-10 tabLg:px-10 tabLg:pb-14">
        <QueryPageForm experience={experience} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
